---
# 当前页面内容标题
title: 01、JDBC简介
# 分类
category:
  - jdbc
# 标签
tag: 
  - jdbc
  - java
  - 数据库
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

# 01、JDBC简介

## 1.1 数据的持久化

- 持久化(persistence)：把数据保存到可掉电式存储设备中以供之后使用。大多数情况下，特别是企业级应用，数据持久化意味着将内存中的数据保存到硬盘上加以”固化”，而持久化的实现过程大多通过各种关系数据库来完成。
- 持久化的主要应用是将内存中的数据存储在关系型数据库中，当然也可以存储在磁盘文件、XML数据文件中。 

![612b4d83-7eba-475c-b563-005a053f1e2e](./images/612b4d83-7eba-475c-b563-005a053f1e2e.png)

## 1.2 Java中的数据存储技术

- 在Java中，数据库存取技术可分为如下几类：
  - JDBC直接访问数据库
  - JDO (Java Data Object )技术
  - 第三方O/R工具，如Hibernate, Mybatis 等

- JDBC是java访问数据库的基石，JDO、Hibernate、MyBatis等只是更好的封装了JDBC。

## 1.3 JDBC介绍

- JDBC(Java Database Connectivity)是一个**独立于特定数据库管理系统、通用的SQL数据库存取和操作的公共接口**（一组API），定义了用来访问数据库的标准Java类库，`（java.sql,javax.sql`）使用这些类库可以以一种标准的方法、方便地访问数据库资源。
- JDBC为访问不同的数据库提供了一种统一的途径，为开发者屏蔽了一些细节问题。
- JDBC的目标是使Java程序员使用JDBC可以连接任何提供了JDBC驱动程序的数据库系统，这样就使得程序员无需对特定的数据库系统的特点有过多的了解，从而大大简化和加快了开发过程。
- 如果没有JDBC，那么Java程序访问数据库时是这样的：

![b07babe0-dd9d-466c-ac9e-ec003c9dcf10](./images/b07babe0-dd9d-466c-ac9e-ec003c9dcf10.png)

- 有了JDBC，Java程序访问数据库时是这样的：

![6092cece-68f5-4670-8335-0d161c71bf62](./images/6092cece-68f5-4670-8335-0d161c71bf62.png)

- 总结如下：

![e90df598-7a2c-48e0-bdc9-3ace87967c89](./images/e90df598-7a2c-48e0-bdc9-3ace87967c89.png)

## 1.4 JDBC体系结构

- JDBC接口（API）包括两个层次：
  - **面向应用的API**：Java API，抽象接口，供应用程序开发人员使用（连接数据库，执行SQL语句，获得结果）。
  - **面向数据库的API**：Java Driver API，供开发商开发数据库驱动程序用。

> **JDBC是sun公司提供一套用于数据库操作的接口，java程序员只需要面向这套接口编程即可。**
>
> **不同的数据库厂商，需要针对这套接口，提供不同实现。不同的实现的集合，即为不同数据库的驱动。 ————面向接口编程**

## 1.5 JDBC程序编写步骤

![e3226b08-1aac-4129-9809-c216078ed873](./images/e3226b08-1aac-4129-9809-c216078ed873.png)

> 补充：ODBC(**Open Database Connectivity**，开放式数据库连接)，是微软在Windows平台下推出的。使用者在程序中只需要调用ODBC API，由 ODBC 驱动程序将调用转换成为对特定的数据库的调用请求。

