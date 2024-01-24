---
# 当前页面内容标题
title: FirewallD is not running 原因与解决方法
# 分类
category:
  - linux
# 标签
tag: 
  - linux
  - 防火墙
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## FirewallD is not running 原因与解决方法

### 解决方法

关于linux系统防火墙：

- centos5、centos6、redhat6系统自带的是iptables防火墙。
- centos7、redhat7自带firewall防火墙。
- ubuntu系统使用的是ufw防火墙。

防火墙导致服务不正常的问题：

在服务器安装某些服务之后，服务无法连接、无法正常启动等情况。查看下系统防火墙有没开放相关的服务端口。（linux系统防火墙开放相关端口后还要重启防火墙，重启防火墙后防火墙规则才会生效）。



以我的 centos7 为例，具体解决方法如下：

**1、启动FirewallD服务**命令：

```sh
systemctl start firewalld.service #开启服务
systemctl enable firewalld.service #设置开机启动
```

**2、查看FirewallD防火墙状态**：

```sh
systemctl status firewalld
```

3、现在防火墙 FirewallD 就已经正常运行了。

### FirewallD 常用的命令：

> [firewall-cmd](https://so.csdn.net/so/search?q=firewall-cmd&spm=1001.2101.3001.7020) --state ##查看防火墙状态，是否是running
>
> systemctl status firewalld.service ##[查看防火墙状态](https://so.csdn.net/so/search?q=查看防火墙状态&spm=1001.2101.3001.7020)
>
> systemctl start firewalld.service ##启动防火墙
>
> systemctl stop firewalld.service ##临时关闭防火墙
>
> systemctl enable firewalld.service ##设置开机启动防火墙
>
> systemctl disable firewalld.service ##设置禁止开机启动防火墙
>
> firewall-cmd --permanent --query-port=80/tcp ##查看80端口有没开放
>
> firewall-cmd --reload ##重新载入配置，比如添加规则之后，需要执行此命令
>
> firewall-cmd --get-zones ##列出支持的zone
>
> firewall-cmd --get-services ##列出预定义的服务
>
> firewall-cmd --query-service ftp ##查看ftp服务是否放行，返回yes或者no
>
> firewall-cmd --add-service=ftp ##临时开放ftp服务
>
> firewall-cmd --add-service=ftp --permanent ##永久开放ftp服务
>
> firewall-cmd --remove-service=ftp --permanent ##永久移除ftp服务
>
> firewall-cmd --add-port=80/tcp --permanent ##永久添加80端口
>
> firewall-cmd --zone=public --remove-port=80/tcp --permanent ##移除80端口
>
> iptables -L -n ##查看规则，这个命令是和iptables的相同的
>
> man firewall-cmd ##查看帮助
>
> 参数含义：
>
> --zone #作用域
>
> --permanent #永久生效，没有此参数重启后失效

想知道更多FirewallD知识请参考：https://www.fujieace.com/firewalld/