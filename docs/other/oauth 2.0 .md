这个是公司当前 oauth2 的鉴权交互，sp 指业务后端  
![image](https://user-images.githubusercontent.com/43411944/136917698-36d8be57-b495-49d2-a9ce-5a4274181655.png)

基于 oauth2 实现鉴权过后，如果实现单点登录（一个业务登录后，其他业务免登陆）呢？  
   
~用户第一次输入密码登录成功后，会在统一登录页的网址的 cookie 里写入 accessToken ，当用户访问另一个业务时，虽然还是会跳到登录页，但是此时登录页根据之前的 accessToken  判断用户登录过且 accessToken  仍在有效期内，就会直接通过，这个过程很快，用户基本感知不到，这样就实现了单点登录~

上面说的不对，应该是把 accessToken 写入二级域名的 cookie 中了，所以在这个二级域名下的应用都能读到这个 accessToken，这样就实现了登录态的共享~

