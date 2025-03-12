![image](https://github.com/user-attachments/assets/64380423-f40a-48fb-bb53-d13da2a18de3)


这个是公司当前 oauth2 的鉴权交互，sp 指业务后端  
![image](https://user-images.githubusercontent.com/43411944/136917698-36d8be57-b495-49d2-a9ce-5a4274181655.png)

为什么要引入授权码？和直接发令牌有何区别？  
<img width="1408" alt="image" src="https://user-images.githubusercontent.com/43411944/172197735-f027c8c5-a85e-43aa-be00-e1b35f2c85c3.png">

授权码的有效期很短，而且令牌必须以 客户端 id + 客户端秘钥 + 授权码，一起获取，而且这一过程是在服务端发生，最大限度保证了安全性


基于 oauth2 实现鉴权过后，如果实现单点登录（一个业务登录后，其他业务免登陆）呢？  
   
用户第一次输入密码登录成功后，会在公司统一登录页的网址的 cookie 里写入一个 token ，当用户访问另一个业务时，虽然还是会跳到登录页，但是此时登录页根据之前的 token 判断用户登录过且 token 仍在有效期内，就会直接通过，这个过程很快，浏览器只会闪一下，用户感知不明显，这样就实现了单点登录


还有一种方式，是把 token 写入二级域名（当前应用的父级域名）的 cookie 中，所以在这个二级域名下的应用都能读到这个 accessToken，这样就实现了登录态的共享~，不过这种方式要求所有的公司内网应用使用同一个二级域名，这会造成 cookie 污染，导致 cookie 过大，甚至导致请求报 400


