---
# 当前页面内容标题
title: 四、Nginx服务器基础配置实例
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

前面我们已经对Nginx服务器默认配置文件的结构和涉及的基本指令做了详细的阐述。通过这些指令的合理配置，我们就可以让一台Nginx服务器正常工作，并且提供基本的web服务器功能。

接下来我们将通过一个比较完整和最简单的基础配置实例，来巩固下前面所学习的指令及其配置。

需求如下:

```
（1）有如下访问：
    http://192.168.200.133:8081/server1/location1
        访问的是：index_sr1_location1.html
    http://192.168.200.133:8081/server1/location2
        访问的是：index_sr1_location2.html
    http://192.168.200.133:8082/server2/location1
        访问的是：index_sr2_location1.html
    http://192.168.200.133:8082/server2/location2
        访问的是：index_sr2_location2.html
（2）如果访问的资源不存在，
    返回自定义的404页面
（3）将/server1和/server2的配置使用不同的配置文件分割
    将文件放到/home/www/conf.d目录下，然后使用include进行合并
（4）为/server1和/server2各自创建一个访问日志文件
```

准备相关文件，目录如下：

![1587129309340](./assets/1587129309340.png)

配置的内容如下:

```
##全局块 begin##
#配置允许运行Nginx工作进程的用户和用户组
user www;
#配置运行Nginx进程生成的worker进程数
worker_processes 2;
#配置Nginx服务器运行对错误日志存放的路径
error_log logs/error.log;
#配置Nginx服务器允许时记录Nginx的master进程的PID文件路径和名称
pid logs/nginx.pid;
#配置Nginx服务是否以守护进程方法启动
#daemon on;
##全局块 end##

##events块 begin##
events{
    #设置Nginx网络连接序列化
    accept_mutex on;
    #设置Nginx的worker进程是否可以同时接收多个请求
    multi_accept on;
    #设置Nginx的worker进程最大的连接数
    worker_connections 1024;
    #设置Nginx使用的事件驱动模型
    use epoll;
}
##events块 end##
##http块 start##
http{
    #定义MIME-Type
    include mime.types;
    default_type application/octet-stream;
    #配置允许使用sendfile方式运输
    sendfile on;
    #配置连接超时时间
    keepalive_timeout 65;
    #配置请求处理日志格式
    log_format server1 '===>server1 access log';
    log_format server2 '===>server2 access log';
    ##server块 开始##
    include /home/www/conf.d/*.conf;
    ##server块 结束##
}
##http块 end##
```

server1.conf

```
server{
        #配置监听端口和主机名称
        listen 8081;
        server_name localhost;
        #配置请求处理日志存放路径
        access_log /home/www/myweb/server1/logs/access.log server1;
        #配置错误页面
        error_page 404 /404.html;
        #配置处理/server1/location1请求的location
        location /server1/location1{
            root /home/www/myweb;
            index index_sr1_location1.html;
        }
        #配置处理/server1/location2请求的location
        location /server1/location2{
            root /home/www/myweb;
            index index_sr1_location2.html;
        }
        #配置错误页面转向
        location = /404.html {
            root /home/www/myweb;
            index 404.html;
        }
}
```

server2.conf

```
server{
        #配置监听端口和主机名称
        listen 8082;
        server_name localhost;
        #配置请求处理日志存放路径
        access_log /home/www/myweb/server2/logs/access.log server2;
        #配置错误页面,对404.html做了定向配置
        error_page 404 /404.html;
        #配置处理/server1/location1请求的location
        location /server2/location1{
            root /home/www/myweb;
            index index_sr2_location1.html;
        }
        #配置处理/server2/location2请求的location
        location /server2/location2{
            root /home/www/myweb;
            index index_sr2_location2.html;
        }
        #配置错误页面转向
        location = /404.html {
            root /home/www/myweb;
            index 404.html;
        }
    }
```

访问测试：

![1587129766585](./assets/1587129766585.png)

![1587129777898](./assets/1587129777898.png)

![1587290246228](./assets/1587290246228.png)

![1587129805309](./assets/1587129805309.png)

![1587129817226](./assets/1587129817226.png)
