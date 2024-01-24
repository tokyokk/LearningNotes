---
# 当前页面内容标题
title: 七、Nginx命令配置到系统环境
# 分类
category:
  - nginx
# 标签
tag: 
  - NGINX
  - 分布式架构
  - 服务器
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

前面我们介绍过Nginx安装目录下的二级制可执行文件`nginx`的很多命令，要想使用这些命令前提是需要进入sbin目录下才能使用，很不方便，如何去优化，我们可以将该二进制可执行文件加入到系统的环境变量，这样的话在任何目录都可以使用nginx对应的相关命令。具体实现步骤如下:

演示可删除

```
/usr/local/nginx/sbin/nginx -V
cd /usr/local/nginx/sbin  nginx -V
如何优化？？？
```

(1)修改`/etc/profile`文件

```
vim /etc/profile
在最后一行添加
export PATH=$PATH:/usr/local/nginx/sbin
```

(2)使之立即生效

```
source /etc/profile
```

(3)执行nginx命令

```
nginx -V
```
