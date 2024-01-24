---
# 当前页面内容标题
title: yum安装wget失败，替换yum源为阿里yum源并重新安装
# 分类
category:
  - linux
# 标签
tag: 
  - linux
  - yum
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

### 现象

通过yum install [wget安装](https://so.csdn.net/so/search?q=wget安装&spm=1001.2101.3001.7020)wget失败，报没有可用软件包。

```shell
[root@cachecloud-web yum.repos.d]# yum install -y wget
已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * epel: mirrors.bfsu.edu.cn
没有可用软件包 wget。
错误：无须任何处理
```

### 解决：

备份源文件

```sh
mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.bak
```

替换阿里yum源

```shell
curl -o /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-7.repo
```

而后再执行

```shell
 yum -y install wget
```