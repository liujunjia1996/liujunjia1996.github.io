平时工作中，对 git 的使用很频繁，但是还从来没有具体了解过 git，所以今天站在一个使用者的角度，来总结一下 git。
# 三个分区
工作区 workSpace 存放项目代码的地方

暂存区 index 临时存放改动的地方

版本库 repository 存放本地已经提交的代码的地方

# 三种状态
已修改（modified）文件已被修改，但还没有提交保存

已暂存（staged）文件已被修改，并且已经暂存

已提交（committed）文件已经被保存在本地仓库中

# 两种指针
git 有一个 HEAD 指针，指向当前所在的提交

git 还有一种 branch 指针，指向某个分支

# 四种对象
## Blob 对象

新文件纳入到 Git 后，它的内容存到一个 blob 对象中，它的对象名是基于内容运算生成的一个 40 个字符的 SHA1值。

SHA1 是一种 hash 算法，类似的还有 MD5，SHA256 等。他们之间的区别是长度不同，比如 SHA1 是 160 bit 的，用 16 进制表示就是 40 个字符了。

## Tree 对象

可以把 tree 对象理解为一个文件夹，里面包含

1. 子级 tree （子文件夹）
2. blob （子文件）

## Commit 对象

由以下几部分组成

1. 作者
2. 提交者
3. 注释
4. 指向一个 big tree 的指针

![image](https://user-images.githubusercontent.com/43411944/131253067-df7b6cae-6193-48bd-81c9-c415f10a242e.png)


## Tag 对象

这个比较用的比较少，用来标记某个 commit 对象，主要是为了解决 commit 的 id 太长不好记的问题

# 五种分支模型

## 基础模型

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211200.png)

所有修改直接在 master 上进行，仅适合个人项目或 demo。

## feature 模型

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211225.png)

开发新功能就从 master 切分支出来，开发测试完再合入 master。

## git flow

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829220201.png)

这个是一个很有名的[博客](https://nvie.com/posts/a-successful-git-branching-model/)提出的，比较适合大版本迭代的场景，不适合经常迭代。

>Git flow的优点是清晰可控，缺点是相对复杂，需要同时维护两个长期分支。大多数工具都将`master`当作默认分支，可是开发是在`develop`分支进行的，这导致经常要切换分支，非常烦人。更大问题在于，这个模式是基于"版本发布"的，目标是一段时间以后产出一个新版本。但是，很多网站项目是"持续发布"，代码一有变动，就部署一次。这时，`master`分支和`develop`分支的差别不大，没必要维护两个长期分支。

## github flow

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211459.png)

github 的 pr 模型，最大的特点就是简单，没什么好说的

## gitlab flow

持续发布

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211700.png)

基于版本

![](https://cdn.jsdelivr.net/gh/qaqLjj/pic/20210829211710.png)

目前，我所在的团队的分支模型属于第二种的变种：
![image](https://user-images.githubusercontent.com/43411944/131253007-6a0fddbf-cd1d-4f3f-b2d3-4b3642fb1457.png)



# 若干个 git 实用命令

## gitignore 失效
```
git rm -r --cached .
git add .
git commit -m "update .gitignore"
```

## 添加远程仓库
```
1. 添加远程仓库
git remote add origin https://github.com/liujunjia1996/blog
2. 将远程分支和本地分支关联
git branch --set-upstream-to=origin/main master
```

