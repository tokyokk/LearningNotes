---
# 当前页面内容标题
title: SpringCloud Alibaba Nacos开启鉴权
# 分类
category:
- springcloud
# 标签
tag:
- springcloud
- java
- nacos
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

### 1.打开终端或命令提示符，并输入以下命令下载最新版本的 [Nacos](https://so.csdn.net/so/search?q=Nacos&spm=1001.2101.3001.7020) 镜像

```
docker pull nacos/nacos-server
```

___

### 2.创建容器存放地址/data/docker/nacos，并在该目录下启动Nacos容器

```
sudo mkdir -p /data/docker/nacoscd /data/docker/nacos
```

___

### 3.运行命令，启动 Nacos 容器

```
docker run --name nacos -e MODE=standalone -p 8848:8848 -d nacos/nacos-server
```

___

### 4.运行以下命令，检查 Nacos 容器是否正在运行

```
docker ps
```

___

### 5.访问 [http://更换你的服务器IP:8848/nacos/](http://xn--ip-0p3cl7jf7forx1wf1fk48k:8848/nacos/ "http://更换你的服务器IP:8848/nacos/") 页面检查是否正常打开网页

___

### 6.开启鉴权

1.使用 **docker ps** 命令查看正在运行的 Nacos 容器的 ID 或名称。

2.然后使用 **docker exec -it 容器ID /bin/bash** 命令进入容器的命令行界面。

3.进入容器后，可以使用 **cd /home/nacos/conf** 命令进入 Nacos 安装目录下的 conf 目录。

4.在 conf 目录下 **ls** 可以查看到 Nacos 运行的配置文件，包括 application.properties。

5.打开application.[properties配置文件](https://so.csdn.net/so/search?q=properties%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6&spm=1001.2101.3001.7020) **vim application.properties 。**

6.将下列配置信息输入文末

```properties
### Open the authentication system::
 
nacos.core.auth.system.type=nacos
 
nacos.core.auth.enabled=true
 
### JWT令牌的密钥建议自行生成更换
 
nacos.core.auth.plugin.nacos.token.secret.key=SecretKey012345678901234567890123456789012345678901234567890123456789
 
### Base64编码的字符串
 
nacos.core.auth.plugin.nacos.token.secret.key=VGhpc0lzTXlDdXN0b21TZWNyZXRLZXkwMTIzNDU2Nzg=
 
nacos.core.auth.server.identity.key=example
 
nacos.core.auth.server.identity.value=example
```

___

### 7.重新打开<http://更换你的服务器IP:8848/nacos/页面进行登入这时就可以输入默认账号**nacos**密码**nacos**登入>

```sh
http://IP:8848/nacos
账号：nacos
密码：nacos
```
