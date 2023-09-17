删除文件时，想保留某个特定文件:
```sh
ls
a  autoCurl.sh  b  c
```
如果要删除 a、 b、c 这三个文件，但是保留 autoCurl，那么就可以用下面两个命令之一解决：  

方法 1：
```sh
rm -f `ls | grep -v auto`
```

方法 2：
```sh
# 查看是否打开 模式扩展
shopt extglob
# 如果是 off，则需执行下面命令打开
shopt -s extglob
# 名称要写全
rm -f !(autoCurl.sh)
```