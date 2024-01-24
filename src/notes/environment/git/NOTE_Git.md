---
# 当前页面内容标题
title: NOTE_Git
# 分类
category:
  - git
# 标签
tag: 
  - git
  - 开发工具
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

#  NOTE_Git

##  官网及下载地址

> - Git官网：[http://git-scm.com/](https://gitee.com/link?target=http%3A%2F%2Fgit-scm.com%2F)
> - GitHub官网：[https://github.com/](https://gitee.com/link?target=https%3A%2F%2Fgithub.com%2F)
> - Gitee官网：https://gitee.com/
> - GitLab官网：[https://gitlab.com/](https://gitee.com/link?target=https%3A%2F%2Fgitlab.com%2F)
> - GitLab首页：[https://about.gitlab.com/](https://gitee.com/link?target=https%3A%2F%2Fabout.gitlab.com%2F)
> - Git 快速下载地址：[https://npm.taobao.org/mirrors/git-for-windows/](https://gitee.com/link?target=https%3A%2F%2Fnpm.taobao.org%2Fmirrors%2Fgit-for-windows%2F)
> - GitLab安装说明：[https://about.gitlab.com/installation/](https://gitee.com/link?target=https%3A%2F%2Fabout.gitlab.com%2Finstallation%2F)
> - GitLab安装包：[https://packages.gitlab.com/gitlab](https://gitee.com/link?target=https%3A%2F%2Fpackages.gitlab.com%2Fgitlab)
> - GitLab源码地址：[https://gitlab.com/gitlab-org/gitlab](https://gitee.com/link?target=https%3A%2F%2Fgitlab.com%2Fgitlab-org%2Fgitlab)

## Git 基本语法

### 1、Git 初始化配置

```shell
git --version  					      #Git版本
git update-git-for-windows		       #升级版本
git config --system [--unset] user.name 用户名    #设置/删除用户签名（全局）
git config --system [--unset] user.email 邮箱     #设置/删除用户签名（全局） 
git config --global [--unset] user.name 用户名    #设置/删除用户签名（用户）
git config --global [--unset] user.email 邮箱     #设置/删除用户签名（用户）
git config [--unset] user.name 用户名             #设置/删除用户签名（项目）
git config [--unset] user.email 邮箱              #设置/删除用户签名（项目）   
git config --unset credential.helper              #重置凭证
git config --system gui.encoding utf-8             #编码设置（全局）
git config --system i18n.commitEncoding utf-8      #编码设置（全局）
git config --system i18n.logoutputencoding utf-8   #编码设置（全局）
git config --global gui.encoding utf-8             #编码设置（用户）
git config --global i18n.commitEncoding utf-8      #编码设置（用户）
git config --global i18n.logoutputencoding utf-8   #编码设置（用户）
git config gui.encoding utf-8                      #编码设置（项目）
git config i18n.commitEncoding utf-8               #编码设置（项目）
git config i18n.logoutputencoding utf-8            #编码设置（项目）
git config --system alias.别名 命令参数  #设置命令别名（全局）
git config --global alias.别名 命令参数  #设置命令别名（用户）
git config alias.别名 命令参数           #设置命令别名（项目） 
git config --system --list              #查看所有配置（全局）
git config --global --list              #查看所有配置（用户）
git config --list                       #查看所有配置（项目）
git init                                #初始化本地库
```

### 2、Git 状态

```shell
git status         #查看本地库状态
git diff           #查看那些更新还没有暂存
git diff --cached  #查看哪些暂存还没有提交
git diff --staged  #查看哪些暂存还没有提交
```

### 3、Git 基本命令

```shell
git add 文件名                    #添加至暂存区
git commit [文件名]               #提交至本地库
git commit -m "日志信息" [文件名]
git commit -a
git commit -a -m "日志信息"
git reset --soft commithash      #HEAD
git reset [--mixed] commithash   #HEAD、暂存区
git reset --hard commithash      #HEAD、暂存区、工作区（版本穿梭）
```

### 4、Git 历史记录

```shell
git reflog                                 #引用日志
git log -g                                 #引用日志（详细）
git log                                    #详细日志
git log --pretty=oneline                   #一行化
git log --oneline                          #一行化并精简hash
git log --oneline --decorate               #查看当前分支所指对象
git log --oneline --decorate --graph --all #查看所有分支历史
```

### 5、Git 分支操作

```shell
git branch 分支名 [commithash]  #创建分支
git branch [-v]                 #查看分支
git checkout [-b] 分支名        #[创建并]切换分支
git merge 分支名                #合并分支
git branch -D/-d name          #(强制)删除分支
```

### 6、Git 撤回与重置

```shell
git checkout -- file           #撤回修改
git reset [--mixed HEAD] file  #撤回暂存
git commit --amend             #撤回提交
git reset --soft commithash     #重置HEAD
git reset [--mixed] commithash  #重置HEAD、暂存区
git reset --hard commithash     #重置HEAD、暂存区、工作区
```

### 7、Git 远程操作

```shell
git remote add 别名 远程地址             #定义别名
git remote set-url --add 别名 远程地址   #同一别名添加多个远程地址
git remote -v                           #查看所有别名
git clone 远程地址                       #克隆仓库
git pull 别名 分支名                     #拉取分支
git push 别名 分支名                     #推送分支
git branch -vv                          #查看所有远程跟踪分支
git branch -u 远程跟踪分支名              #本地分支跟踪远程分支
git checkout -b 本地分支名 远程跟踪分支名  #创建本地分支并跟踪远程分支
git checkout --track 远程跟踪分支名       #创建本地分支并跟踪远程分支
```

### 8、其他命令

```shell
git rm 文件名               #移除文件并暂存
git mv 原文件名 新文件名     #重命名文件并暂存
git stash  				  #命令会将未完成的修改保存到一个栈上，而你可以在任何时候重新应用这些改动(git stash apply) 
git stash list             #查看存储
git stash apply stash@{2}  #如果不指定一个储藏，Git认为指定的是最近的储藏
git stash drop             #加上将要移除的储藏的名字来移除它
git stash pop              #来应用储藏然后立即从栈上扔掉它
ssh-keygen -t rsa [-C 描述]   #SSH免密登录生成密钥
ssh -T git@github.com         #测试配置是否成功
```

