---
# 当前页面内容标题
title: Git技术要点篇
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

## git提交或克隆报错fatal: unable to access ‘https://github.com/xxx/xxx.git/‘: Failed to connect: SSL_ERROR_SYSCALL in connection to github.com:443

### 1.问题原因

报错信息：

```shell
fatal: unable to access 'https://github.com/nakanomay/git-demo.git/': LibreSSL SSL_connect: SSL_ERROR_SYSCALL in connection to github.com:443
```

又或者

```
fatal: unable to access 'https://github.com/xxx/autowrite.git/': 
OpenSSL SSL_read: Connection was reset, errno 10054
```

因为git在拉取或者提交项目时，中间会有git的http和https代理，但是我们本地环境本身就有SSL协议了，所以取消git的https代理即可，不行再取消http的代理。

后续
原因还有一个，当前代理网速过慢，所以偶尔会成功，偶尔失败。

### 2.解决方案

1.在项目文件夹的命令行窗口执行下面代码，然后再git [commit](https://so.csdn.net/so/search?q=commit&spm=1001.2101.3001.7020) 或git clone
取消git本身的https代理，使用自己本机的代理，如果没有的话，其实默认还是用git的

```shell
//取消http代理
git config --global --unset http.proxy
//取消https代理 
git config --global --unset https.proxy
```

2.科学上网（vpn）
这样就能提高服务器连接速度，能从根本解决 time out 443问题

---

# git push时报错error: failed to push some refs to ‘https://gitee.com/**.git‘的解决方案

解决方案：[(70条消息) git push时报错error: failed to push some refs to ‘https://gitee.com/**.git‘的解决方案_姜栀的博客-CSDN博客](https://blog.csdn.net/qq_51788416/article/details/125777175)


