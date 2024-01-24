---
# 当前页面内容标题
title: 八、Redis复制（replica）
# 分类
category:
  - redis
# 标签
tag: 
  - redis
  - NOSQL
  - K,V缓存数据库
  - 非关系型数据库
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 01、是什么？

官网地址：https://redis.io/docs/management/replication/

一句话

- 就是主从复制，master以写为主，Slave以读为主

- 当master数据变化的时候，自动将新的数据异步同步到其他Slave数据库

![](./images/2023-03-31-23-16-44-image.png)

![](./images/2023-03-31-23-16-56-image.png)

## 02、能干嘛？

- 读写分离

- 容灾恢复

- 数据备份

- 水平扩容支撑高并发

## 03、怎么玩？

### 配从（库）不配主（库）

### 权限细节，重要

- master如果配置了requirepass参数，需要密码登录

- 那么slave就要配置masterauth来设置校验密码，否则的话master就会拒绝slave的访问请求

![](./images/2023-03-30-23-11-18-image.png)

### 基本命令操作

#### info replication

可以查看复制节点的主从关系和配置信息

#### replicaof 主库IP 主库端口

一般写入进redis.conf配置文件内

#### slaveof 主库IP 主库端口

- 每次与master断开之后，都需要重新连接，除非你配置进redis.conf文件

- 在运行期间修改slave节点的信息，如果改数据库已经是某个主数据库的从数据库，那么会停止和原主数据库的同步关系`转而和新的主数据库同步，重新拜码头`

#### slaveof no one

使用当前数据库停止与其他数据库的同步，`转成主数据库，自立为王`

## 04、案例说明

### 架构说明

1. 一个Master两个Slave

![](./images/2023-03-30-23-18-08-image.png)

3台虚拟机，每台都安装redis

2. 拷贝多个redis.conf文件
- redis6379.conf

- redis6380.conf

- redis6381.conf

### 小口诀

1. 三边网络互相ping通且注意防火墙配置

2. 三大命令
- 主从复制

> replicaof 主库IP 主库端口
> 
> `配从(库)不配主(库)`

- 改换门庭

> slaveof 新主库IP 新主库端口

- 自立为王

> slaveof no one

### 修改配置文件细节操作

> redis6379.conf为例，步骤：

1. 开启daemonize yes

![](./images/2023-03-30-23-23-34-image.png)

2. 注释掉bind 127.0.0.1

![](./images/2023-03-30-23-24-07-image.png)

3. protected-mode no

![](./images/2023-03-30-23-24-33-image.png)

4. 指定端口

![](./images/2023-03-30-23-24-54-image.png)

5. 指定当前工作目录，dir

![](./images/2023-03-30-23-25-18-image.png)

6. pid文件名字，pidfile

![](./images/2023-03-30-23-25-42-image.png)

7. log文件名字，logfile

![](./images/2023-03-30-23-26-06-image.png)

8. requirepass

![](./images/2023-03-30-23-26-28-image.png)

9. dump.rdb名字

![](./images/2023-03-30-23-26-50-image.png)

10. aof文件，appendfilename

![](./images/2023-03-30-23-27-16-image.png)

本步骤可选，非必须

![](./images/2023-03-30-23-27-29-image.png)

11. `从机访问主机的同行密码masterauth，必须`

![](./images/2023-03-30-23-28-05-image.png)

从机必须配置，主机不用

### 常用3招

#### 一主二仆

##### 方案1：配置文件固定写死

1. 配置文件执行

replicaof 主库IP 主库端口

2. `配从(库)不配主(库)`
- 配置从机6380

![](./images/2023-03-30-23-31-48-image.png)

- 配置从机6381

![](./images/2023-03-30-23-32-05-image.png)

3. 先master后两台slave依次启动

![](./images/2023-03-30-23-32-40-image.png)

![](./images/2023-03-30-23-32-49-image.png)

![](./images/2023-03-30-23-32-57-image.png)

4. 主从关系查看
- 日志
  
  - 主机日志
    
    vim 6379.log
    
    ![](./images/2023-03-30-23-33-52-image.png)
  
  - 备机日志
    
    ![](./images/2023-03-30-23-34-38-image.png)

- 命令
  
  - info replication命令查看
    
    ![](./images/2023-03-30-23-36-05-image.png)
    
    ![](./images/2023-03-30-23-36-17-image.png)
    
    ![](./images/2023-03-30-23-36-28-image.png)

##### 主从问题演示

1. 从机可以执行写命令吗？

![](./images/2023-03-30-23-38-10-image.png)

2. 从机切入点问题

`slave是从头开始复制还是从切入点开始复制?`

master启动，写到k3

slave1跟着master同时启动，跟着写到k3

slave2写到k3后才启动，那之前的是否也可以复制？

`Y，首次一锅端，后续跟随，master写，slave跟`

3. 主机shutdown后，从机会上位吗？

主机shutdown后情况如何？从机是上位还是原地待命   

`从机不动，原地待命，从机数据可以正常使用；等待主机重启动归来`

![](./images/2023-03-30-23-40-33-image.png)

![](./images/2023-03-30-23-40-43-image.png)

![](./images/2023-03-30-23-40-52-image.png)

4. 主机shutdown后，重启后主从关系还在吗？从机还能否顺利复制？

`青山依旧在`

![](./images/2023-03-30-23-41-55-image.png)

![](./images/2023-03-30-23-42-11-image.png)

![](./images/2023-03-30-23-42-19-image.png)

5. 某台从机down后，master继续，从机重启后它能跟上大部队吗？

##### 方案2：命令操作手动指定

- 从机停机去掉配置文件中的配置项，3台目前都是主机状态，各不从属

![](./images/2023-03-31-15-22-35-image.png)

- 3台master

![](./images/2023-03-31-15-23-04-image.png)

![](./images/2023-03-31-15-23-15-image.png)

![](./images/2023-03-31-15-23-27-image.png)

- 预设的从机上执行命令

> slaveof 主库IP 主库端口
> 
> 效果

![](./images/2023-03-31-15-24-27-image.png)

![](./images/2023-03-31-15-24-36-image.png)

- 用命令使用的话，2台从机重启后，关系还在吗？

![](./images/2023-03-31-15-25-22-image.png)

##### 配置 VS 命令的区别，当堂实验讲解

- 配置，持久稳定

- 命令，档次生效

#### 薪火相传

- 上一个slave可以是下一个slave的master，slave同样可以接收其他slaves的连接和同步请求，那么该slave作为了链条中下一个master，可以减轻主master的写压力

- 中途变更转向：会清除之前的数据，重新建立拷贝最新的

- slaveof 新主库IP 新主库端口

![](./images/2023-04-01-00-46-32-image.png)

#### 反客为主

`SLAVEOF no one `

是当前数据库停止与其他数据库同步，转为主数据库master

![](./images/2023-04-01-00-47-53-image.png)

## 05、复制原理和工作流程

### slave启动，同步初请

slave启动成功连接到master后发送一个sync命令

slave首次全新连接master，一次完全同步（全量复制将被自动执行，slave自身原有的会被master数据覆盖清除）

### 首次连接，全量复制

master节点收到sync命令后会开始在后台保存快照（即RDB持久化，主从复制时会触发RDB），同时收集所有接收到的用于修改数据集命令缓存起来，master节点执行RDB持久化完后，master将RDB快照文件和所有缓存的命令发送到所有slave，以完成一次性完全同步

而slave服务在接收到数据库文件数据后，将其存盘并加载到内存中，从而完成复制初始化

### 心跳持续，保持通信

> repl-ping-replica-period 10

`master发出PING包的周期，默认是10秒`

![](./images/2023-03-31-23-24-30-image.png)

### 进入平稳，增量复制

Master继续将新的所有收集到的修改命令自动依次传给slave，完成同步

### 从机下线，重连续传

master会检查backlog里面的offset，master和slave都会保存一个复制的offset还有一个masterId，offset是保存在backlog中的。`Master只会把已经复制的offset后面的数据复制给Slave，类似断电续传`

## 06、复制的缺点

### 复制延时，信号衰减

由于所有的写操作都是先在Master上操作，然后同步更新到Slave上，所以从Master同步到Slave机器有一定的延迟，当系统很繁忙的时候，延迟问题会更加严重，Slave机器数量的增加也会使这个问题更加严重。

![](./images/2023-03-31-23-30-02-image.png)

### master挂了如何办？

- 默认情况下，不会再slave节点中自动重选一个master

- 那每次都要人工干预？

- > 无人值守安装变成刚需
