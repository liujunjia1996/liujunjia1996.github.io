业务上用的 ssh 主机老是自动就退出了，在 ssh 工具开启自动发空包维持会话也不行。
```log
# timed out waiting for input: auto-logout
```
后面发现，/etc/profile 里有个环境变量，把这个变量调大就可以了

```sh
export TMOUT=36000
```

改完之后 `. /etc/profile` 即可