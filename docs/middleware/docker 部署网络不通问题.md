最近负责的项目要上生产了，是一个 spring cloud 的项目，大概有十个微服务，服务之间有通过 http 调用，也有通过 dubbo 的调用。  
我一个节点一个节点的发，可是等发好后，大量报出了 unknown host 的错误，而且看日志里面打印的 host 全都是容器的 ip；  
一开始没想到是网络不通的问题，一直觉得公司的 paas 平台部署的实例之间网络不通的概率极低，不然公司那么多 rpc 调用怎么玩？  
所以一直纠结是不是启动顺序的原因，以为是启动 A 服务时，A 所依赖的 B 还没启动好导致的，但是试了几次都不行；  
后面为了定位问题，降低了每一次部署的实例个数，每个节点先都单点部署，先跑起来试试；  
这个方式确实有效，十个服务都顺利的注册到 nacos 上了，而且它们之间的调用也没有问题；接着，就准备扩容每个节点，扩了两个服务之后，问题就来了，依然报 unknow host 。。。。  
静下心来，仔细想了想平台的两个实例部署和一个实例部署有什么区别，最后发现两个实例部署时会强制双 az ，这个就是问题的根因！跨可用区之间的 pod 网络是不通的。  
![image](https://user-images.githubusercontent.com/43411944/162680976-57a5324e-4b23-4f1a-8bf1-8716f07e0fd2.png)

后面就这个问题，和 pass 平台的人进行了一波沟通，他们确认了有这个问题，也提供了解决方案。  

![image](https://user-images.githubusercontent.com/43411944/162653511-e474e6c2-fb61-4480-a601-0d02613d9d90.png)

具体的情况是这样的：pod 是运行在 vm 宿主机上的，跨可用区的 pod 网络不通，但是 vm 之间网络是没问题的，所以想解决这个问题，需要把 pod 之间的通信转换为 vm 之间的通信；  
显然，平台也预见到了这个问题，所以平台的人在启动 docker pod 时，会向 pod 注入两个环境变量：
1. VMIP
2. VMPORT  

其中，1 就是 VM 宿主机的 ip；2 就很关键了，它是一个 json，里面存储了 vm 和 pod 之间端口的映射关系，如：  
```json
[
    {
        "originport": "8003",
        "portname": "public",
        "ports": [
            {
                "HostIP": "",
                "HostPort": "56164"
            }
        ]
    },
    {
        "originport": "8005",
        "portname": "management",
        "ports": [
            {
                "HostIP": "",
                "HostPort": "57897"
            }
        ]
    },
    {
        "originport": "6900",
        "portname": "rpc",
        "ports": [
            {
                "HostIP": "",
                "HostPort": "53727"
            }
        ]
    }
]
```
podPort 每个 pod 都是相同的，而 vmPort 就是随机分配了的（因为一个 vm 要启动多个 pod，如果不随机分配而固定的话就会产生端口冲突）所以要解决这个问题，首先要将 dubbo 和 http 服务绑定到指定的 podPort，接下来，重点来了，上报注册中心时也要用 `vmip` 和 `vmport 中分配的那个端口`。  

那具体怎么做呢？  

搜索大量资料后发现，dubbo 和 nacos 都可以通过启动参数指定要上报到注册中心的端口和 ip；所以最后在启动脚本中，通过一些 awk 命令解析出 http 和 rpc 对应的端口解决了这个问题。

```sh
#/bin/bash
dubboPort=$(echo $VMPORT | awk -F ',{"' -v OFS='\n' '{var=$1;$1=var;print $0}' | awk -F '"' '/rpc/{print $(NF-1)}')
nacosPort=$(echo $VMPORT | awk -F ',{"' -v OFS='\n' '{var=$1;$1=var;print $0}' | awk -F '"' '/public/{print $(NF-1)}')

Push_Home=$( cd ../;pwd)

jarName=$(ls $Push_Home/libs | grep jar | awk 'NR==1')


javaOpt="-Xms${jvm_memory:-1024}m -Xmx${jvm_memory:-1024}m -Dfile.encoding=UTF-8 \
            -Dserver.port=8003 -DDUBBO_PORT_TO_BIND=6900 \
            -Denv.nacos.server.ip=${nacos_ip:-"test.nacos.com"}"

if test -n "$VMIP"; then
    javaOpt="$javaOpt -Dspring.cloud.nacos.discovery.ip=${VMIP} -Dspring.cloud.nacos.discovery.port=${nacosPort} \
    -DDUBBO_IP_TO_REGISTRY=${VMIP} -DDUBBO_PORT_TO_REGISTRY=${dubboPort}"
fi

echo about to start $Push_Home/libs/${jarName}, use opt: $javaOpt

java $javaOpt -jar $Push_Home/libs/$jarName

echo start over ~~~
```
