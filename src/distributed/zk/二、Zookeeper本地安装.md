---
# 当前页面内容标题
title: 二、Zookeeper本地安装
# 分类
category:
  - Java
# 标签
tag:
  - Java
  - zookeeper
  - 分布式
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 01、本地模式安装

### **1）** ***\*安装前准备\****

（1） 安装 JDK

（2） 拷贝 apache-zookeeper-3.5.7-bin.tar.gz 安装包到 Linux 系统下

（3）解压到指定目录

```sh
tar -zxvf apache-zookeeper-3.5.7- bin.tar.gz -C /opt/module/
```

（4）修改名称

```sh
mv	apache-zookeeper-3.5.7 zookeeper-3.5.7
```

### **2）** ***\*配置修改\****

（1）将/opt/module/zookeeper-3.5.7/conf 这个路径下的 zoo_sample.cfg 修改为 zoo.cfg

```sh
mv zoo_sample.cfg zoo.cfg
```

（2） 打开zoo.cfg 文件，修改 dataDir 路径：

```sh
vim zoo.cfg
```

修改如下内容：

```properties
dataDir=/opt/module/zookeeper-3.5.7/zkData
```

（3） 在/opt/module/zookeeper-3.5.7/这个目录上创建 zkData 文件夹

```sh
mkdir zkData
```

### **3）** ***\*操作\**** ***\*Zookeeper\****

（1）启动zookeeper

```sh
[root@localhost zookeeper-3.5.7]# ./bin/zkServer.sh start
```

（2）查看进程是否启动

```sh
[root@localhost zookeeper-3.5.7]# jps
8395 Jps
8364 QuorumPeerMain
```

（3）查看状态

```sh
[root@localhost zookeeper-3.5.7]# ./bin/zkServer.sh status
ZooKeeper JMX enabled by default
Using config: /opt/zookeeper/zookeeper-3.5.7/bin/../conf/zoo.cfg
Client port found: 2181. Client address: localhost.
Mode: standalone
```

（4）启动客户端

```sh
[root@localhost zookeeper-3.5.7]# ./bin/zkCli.sh
```

（5）退出客户端

```sh
[zk: localhost:2181(CONNECTED) 0] quit
```

（6）停止Zookeeper

```sh
[root@localhost zookeeper-3.5.7]# ./bin/zkServer.sh stop
```

## 02、配置参数解读

Zookeeper中的配置文件zoo.cfg中参数含义解读如下：

**1）tickTime = 2000：通信心跳时间，Zookeeper服务器与客户端心跳时间，单位毫秒**

![image-20230416204906112](./images/image-20230416204906112.png)

**2）initLimit = 10：LF初始通信时限**

![image-20230416204955771](./images/image-20230416204955771.png)

Leader和Follower`初始连接`时能容忍的最多心跳数（tickTime的数量）

**3）syncLimit = 5：LF同步通信时限**

![image-20230416205038933](./images/image-20230416205038933.png)

Leader和Follower之间通信时间如果超过syncLimit * tickTime，Leader认为Follwer死掉，从服务器列表中删除Follwer。

**4） dataDir：保存Zookeeper中的数据**

注意：默认的tmp目录，容易被Linux系统定期删除，所以一般不用默认的tmp目录。

**5）clientPort = 2181：客户端连接端口，通常不做修改。**