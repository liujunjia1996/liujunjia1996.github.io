import{_ as o,o as c,c as s,b as e,e as t}from"./app.5300a710.js";const n={},a=e("p",null,[t("这个是公司当前 oauth2 的鉴权交互，sp 指业务后端"),e("br"),e("img",{src:"https://user-images.githubusercontent.com/43411944/136917698-36d8be57-b495-49d2-a9ce-5a4274181655.png",alt:"image"})],-1),_=e("p",null,[t("为什么要引入授权码？和直接发令牌有何区别？"),e("br"),e("img",{width:"1408",alt:"image",src:"https://user-images.githubusercontent.com/43411944/172197735-f027c8c5-a85e-43aa-be00-e1b35f2c85c3.png"})],-1),i=e("p",null,"授权码的有效期很短，而且令牌必须以 客户端 id + 客户端秘钥 + 授权码，一起获取，而且这一过程是在服务端发生，最大限度保证了安全性",-1),l=e("p",null,"基于 oauth2 实现鉴权过后，如果实现单点登录（一个业务登录后，其他业务免登陆）呢？",-1),r=e("p",null,"用户第一次输入密码登录成功后，会在公司统一登录页的网址的 cookie 里写入一个 token ，当用户访问另一个业务时，虽然还是会跳到登录页，但是此时登录页根据之前的 token 判断用户登录过且 token 仍在有效期内，就会直接通过，这个过程很快，浏览器只会闪一下，用户感知不到，这样就实现了单点登录",-1),u=e("p",null,"还有一种方式，是把 token 写入二级域名（当前应用的父级域名）的 cookie 中，所以在这个二级域名下的应用都能读到这个 accessToken，这样就实现了登录态的共享~，不过这种方式要求所有的公司内网应用使用同一个二级域名，这会造成 cookie 污染，导致 cookie 过大，设置导致请求报 400",-1),h=e("p",null,"还有一种方式是通过 JWT, 公司内网的应用可以把 JWT 放入 localStorage, 每次请求都带上，所有的后端服务都去读取这个 JWT, 从而实现登录态共享",-1),d=[a,_,i,l,r,u,h];function p(m,g){return c(),s("div",null,d)}const b=o(n,[["render",p],["__file","oauth 2.0 .html.vue"]]);export{b as default};