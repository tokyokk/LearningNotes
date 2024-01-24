---
# 当前页面内容标题
title: 九、MyBatisX插件
# 分类
category:
  - mybatisplus
# 标签
tag: 
  - mybatisplus
  - mybatis
  - java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

# 九、MyBatisX插件

> MyBatis-Plus为我们提供了强大的mapper和service模板，能够大大的提高开发效率。
>
> 但是在真正开发过程中，MyBatis-Plus并不能为我们解决所有问题，例如一些复杂的SQL，多表联查，我们就需要自己去编写代码和SQL语句，我们该如何快速的解决这个问题呢，这个时候可以使用MyBatisX插件。
>
> MyBatisX一款基于 IDEA 的快速开发插件，为效率而生。
>
> MyBatisX插件用法：https://baomidou.com/pages/ba5b24/



## 1.安装MyBatisX插件

> **打开IDEA，File-> Setteings->Plugins->MyBatisX，搜索栏搜索MyBatisX然后安装。**

![image-20220522115718361](./images/image-20220522115718361.png)



## 2.快速生成代码

- 新建一个Spring Boot项目引入依赖（创建工程时记得勾选lombok及mysql驱动）

  ```xml
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>mybatis-plus-boot-starter</artifactId>
      <version>3.5.1</version>
  </dependency>
  
  <dependency>
      <groupId>com.baomidou</groupId>
      <artifactId>dynamic-datasource-spring-boot-starter</artifactId>
      <version>3.5.0</version>
  </dependency>
  ```

- 配置数据源信息

  ```yml
  spring:
    datasource:
      type: com.zaxxer.hikari.HikariDataSource
      driver-class-name: com.mysql.cj.jdbc.Driver
      url: jdbc:mysql://localhost:3306/mybatis_plus?characterEncoding=utf-8&useSSL=false
      username: root
      password: 132537
  ```

- 在IDEA中与数据库建立链接

  ![image-20220522120758740](./images/image-20220522120758740.png)

- 填写数据库信息并保存

  ![image-20220522121434468](./images/image-20220522121434468.png)

- 找到我们需要生成的表点击右键

  ![image-20220522121613909](./images/image-20220522121613909.png)

- 填写完信息以后下一步

  ![image-20220522122127649](./images/image-20220522122127649.png)

- 继续填写信息

  ![image-20220522122525598](./images/image-20220522122525598.png)

- **大功告成（真特么好用yyds）**

  ![image-20220522122612334](./images/image-20220522122612334.png)



## 3.快速生成CRUD

> MyBaitsX可以根据我们在Mapper接口中输入的方法名快速帮我们生成对应的sql语句

![image-20220522123143852](./images/image-20220522123143852.png)

![image-20220522123202310](./images/image-20220522123202310.png)



