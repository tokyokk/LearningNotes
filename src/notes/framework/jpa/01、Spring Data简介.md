---
# 当前页面内容标题
title: 01、Spring Data简介
# 分类
category:
  - springdata
# 标签
tag: 
  - spring
  - springdata
  - java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

01、Spring Data简介
---

### 1.1、简介

```
Spring Data’s mission is to provide a familiar and consistent, Spring-based programming model for data access while still retaining the special traits of the underlying data store.

It makes it easy to use data access technologies, relational and non-relational databases, map-reduce frameworks, and cloud-based data services. This is an umbrella project which contains many subprojects that are specific to a given database. The projects are developed by working together with many of the companies and developers that are behind these exciting technologies.

```

> Spring Data 的任务是为数据访问提供一个熟悉的、一致的、基于 Spring 的编程模型，同时保留底层数据存储的特性。
>
> 它使得使用数据访问技术、关系和非关系数据库、 map-reduce 框架和基于云的数据服务变得容易。**这是一个总括项目，其中包含许多特定于给定数据库的子项目。**这些项目是通过与这些令人兴奋的技术背后的许多公司和开发人员合作开发的。

简单来说，可以理解为：

**Spring Data致力为数据访问（Dao）提供熟悉且一致的基于Spring的编程模板：**

对于每种持久性存储，您的 Dao 通常需要为不同存储库提供不同 CRUD （创建-读取-更新-删除）持久化操作！Spring Data为这些持久化存储以及特定实现提供了通用接口（CrudRepository、PagingAndSortingRepository）和模板（jdbcTemplate、redisTemplate、RestTemplate、MongoTemplate….）！

**其目的是统一和简化对不同类型持久化存储（关系型数据库和 NoSQL数据存储）的访问！**



> 官网地址：
>
> spring：https://spring.io/
>
> hibernate：https://hibernate.org/
>
> github：https://github.com/spring-projects

### 1.2、Spring Data 主要模块

Spring Data 支持的持久层技术非常多，如下所示：

- Spring Data Commons - 支撑每个 Spring 数据模块的核心 Spring 概念。
- Spring Data JDBC - 对 JDBC 的 Spring Data 存储库支持。
- Spring Data JDBC Ext - 支持特定于数据库的标准 JDBC 扩展，包括支持 Oracle RAC 快速连接故障转移、支持 AQ JMS 和支持使用高级数据类型。
- Spring Data JPA - Spring Data 存储库对 JPA 的支持。
- Spring Data KeyValue - Map基于映射的存储库和 SPI，可以轻松地为键值存储构建 Spring Data 模块。
- Spring Data LDAP - SpringData 存储库对 SpringLDAP 的支持。
- Spring Data MongoDB - MongoDB 基于 Spring 的对象文档支持和存储库。
- Spring Data Redis - 从 Spring 应用程序轻松配置和访问 Redis。
- Spring Data REST - 将 Spring Data 存储库作为超媒体驱动的 RESTful 资源导出。
- Spring Data for Apache Cassandra - 易于配置和访问 Cassandra 或大规模、高可用性、面向数据的 Spring 应用程序。
- Spring Data for Apache Geode - 为高度一致、低延迟、面向数据的 Spring 应用程序轻松配置和访问 ApacheGeode。
- Spring Data for Apache Solr - 为面向搜索的 Spring 应用程序轻松配置和访问 ApacheSolr。
- Spring Data for Pivotal GemFire - 易于配置和访问枢纽 GemFire 为您的高度一致性，低延迟/高吞吐量，面向数据的 Spring 应用程序。
- ……

### 1.3、Features（特性）

1. 强大的repository仓储和自定义对象映射ORM抽象
2. 从repository方法名称派生动态查询接口
3. 实现Domain域基类提供基本属性
4. 支持透明审计日志（创建，最后更改）
5. 可以自定义repository代码
6. 通过JavaConfig和自定义XML命名空间轻松实现 Spring集成
7. 与Spring MVC控制器的高级集成
8. 跨库持久性的实验支持



- 模板制作
  - mongoTemplate、redisTemplate、jdbcTemplate……

> 模板提供存贮特定操作，例如保存、更新和删除单个记录或用于执行查询或映射/减少作业。
>
> Spring Data JPA不提供模板，因为JPA实现本身已经是 JDBC API 之上的抽象层。JPA 的 EntityManager 是模板的对应物。异物转换由存储库实现处理。

- 对象/数据存储映射

可以通过xml或者注解进行对象关系映射

#### 一、JPA

```java
@Entity
@Table(name = "TUSR")
public class User {
    
    @Id
    private String id;
    
    @Column(name = "fn")
    private String name;
    
    private Date gmt_create;
    
    @OneToMany
    private List<Role> roles;
    ...
}
```

#### 二、MongoDB

```java
@Document(collection="usr")
public class User {

    @Id
    private String id;

    @Field("fn")
    private String name;

    private Date gmt_create;

    private List<Role> roles;
    ...
}
```

#### 三、Neo4J

```java
@NodeEntity
public class User {

    @Graphld
    private String id;

    private String name;

		@RelatedTo(type="has",direction=Direction.OUTGOING)
    private List<Role> roles;
    ...
}
```

### 1.4、Repository 支持

Repository 提供了最基本的数据访问功能，其几个子接口则扩展了一些功能。他们的继承关系如下：

Repository ：仅仅是一个标识，表名任何继承它的均为仓库接口类。

- CrudRepository：继承 Repository，实现了一组 CRUD 相关的方法
- PagingAndSortingRepository：继承 CrudRepository，实现了一组分页排序相关的方法
- JpaRepository：继承 PagingAndSortingRepository，实现一组 API规范相关的方法
- ……

自定义的 Repository 只需继承 XxxxRepository，这样自定义的 Repository 接口就具备了通用的数据访问控制层的能力。