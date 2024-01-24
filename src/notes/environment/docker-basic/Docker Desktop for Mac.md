---
# 当前页面内容标题
title: Docker Desktop for MAC
# 分类
category:
  - docker
# 标签
tag: 
  - docker
  - 云原生开发
  - Devops
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## mac 本地 执行docker 出现 command not found 问题

问题：
mac本地安装完docker，执行docker出现command not found，因为没有将docker 命令所在的路径添加到系统变量中；

解决办法：
1.找到docker命令所在的路径，这个路径在你安装成功的时候会直接提示给你，我的路径是：/Applications/Docker.app/Contents/Resources/bin

2.编辑/etc/paths，在文件的末尾加上docker的安装路径：

```shell
vim /etc/paths
```

```path
/Applications/Docker.app/Contents/Resources/bin
```

```shell
MacBook-Pro:~ mac$ cat /etc/paths
/usr/local/bin
/usr/bin
/bin
/usr/sbin
/sbin
/Applications/Docker.app/Contents/Resources/bin
```

添加完之后的文件内容  
3.执行docker，就可以看到相关的命令了
