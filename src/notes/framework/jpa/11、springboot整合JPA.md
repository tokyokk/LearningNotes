---
# 当前页面内容标题
title: 11、springboot整合JPA
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

11、springboot整合JPA
---

### 1、导入依赖

```xml
<dependencies>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>

    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <scope>runtime</scope>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-test</artifactId>
        <scope>test</scope>
        <exclusions>
            <exclusion>
                <groupId>org.junit.vintage</groupId>
                <artifactId>junit-vintage-engine</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
</dependencies>
```

### 2、配置文件

```properties
# 应用名称
spring.application.name=04-springdata-jpa-springboot
# 数据库驱动：
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
# 数据源名称
spring.datasource.name=defaultDataSource
# 数据库连接地址
spring.datasource.url=jdbc:mysql://localhost:3306/spring_data?serverTimezone=UTC
# 数据库用户名&密码：
spring.datasource.username=root
spring.datasource.password=123456
# 应用服务 WEB 访问端口
server.port=8080


spring.jpa.show-sql=true
spring.jpa.database=mysql
spring.jpa.database-platform=mysql
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
```

### 3、创建实体类

```java
package com.yykk.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;

/**
 * @author yykk
 */
@Entity // 作为 hibernate实体类
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_Customer") // 配置数据库表的名称,实体类中属性和表中字段的映射关系!
@EntityListeners(AuditingEntityListener.class)
public class Customer {

    /**
     * @Id：声明主键的配置
     * @GeneratedValue:配置主键的生成策略 strategy
     * GenerationType.IDENTITY ：自增，mysql
     * * 底层数据库必须支持自动增长（底层数据库支持的自动增长方式，对id自增）
     * GenerationType.SEQUENCE : 序列，oracle
     * * 底层数据库必须支持序列
     * GenerationType.TABLE : jpa提供的一种机制，通过一张数据库表的形式帮助我们完成主键自增
     * GenerationType.AUTO ： 由程序自动的帮助我们选择主键生成策略
     * @Column:配置属性和字段的映射关系 name：数据库表中字段的名称
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "cust_name")
    private String custName;//客户名称

    @Column(name = "cust_source")
    private String custSource;//客户来源

    @Column(name = "cust_level")
    private String custLevel;//客户级别

    @Column(name = "cust_industry")
    private String custIndustry;//客户所属行业

    @Column(name = "cust_phone")
    private String custPhone;//客户的联系方式

    @Column(name = "cust_address")
    private String custAddress;//客户地址


}
```

### 4、Repositories/CustomerRepository

```java
package com.yykk.Repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CustomerRepository extends PagingAndSortingRepository<Customer,Long> {
}
```

### 5、service、serviceImpl

```java
package com.yykk.service;

import com.yykk.pojo.Customer;

public interface CustomerService {

    Iterable<Customer> getAll();
}
```

```java
package com.yykk.service;

import com.yykk.Repositories.CustomerRepository;
import com.yykk.pojo.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService{

    @Autowired
    CustomerRepository repository;

    @Override
    public Iterable<Customer> getAll() {
        return repository.findAll();
    }
}
```

### 6、controller

```java
package com.yykk.controller;

import com.yykk.pojo.Customer;
import com.yykk.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class CustomerController {

    @Autowired
    CustomerService customerService;

    @RequestMapping("/all")
    public Iterable<Customer> getAll() {
        return customerService.getAll();
    }
}
```

springboot自动配置之jpa原理：https://blog.csdn.net/fengyuyeguirenenen/article/details/124114875

可配置项：

```properties
spring.jpa.show-sql=true
spring.jpa.database=mysql
spring.jpa.database-platform=mysql
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL57Dialect
```

### spring.datasource.xxx

- `spring.datasource.schema`: 脚本中创建表的语句存放路径，classpath/db表示在工程的resource层级下的db目录中存放。
- `spring.datasource.data`：脚本中初始化数据的语句存放路径。
- `spring.datasource.sql-script-encoding`：设置脚本的编码，默认常用设置为UTF-8。
- `spring.datasource.driver-class-name`：配置driver的类名，默认是从JDBC URL中自动探测。
- `spring.datasource.url`：配置数据库JDBC连接串。
- `spring.datasource.username`：配置数据库连接用户名。
- `spring.datasource.password`：配置数据库连接用户名对应的密码。
  使用上述方式建表时，`spring.jpa.hibernet.ddl-auto`设置成none，否则有啥问题，我也没尝试过。这样配置可以避免两种方式一起使用。

### spring.jpa.xxx

- `spring.jpa.hibernet.ddl-auto`值说明

1. **create**： 服务程序重启后，加载hibernate时都会删除上一次服务生成的表，然后根据服务程序中的model（entity）类再重新生成表，这个值**慎用**，会导致数据库中原表数据丢失。
2. **create-drop** ：服务服务程序重启后，加载hibernate时根据model（entity）类生成表，当sessionFactory关闭时，创建的表就自动删除。
3. **update**：默认常用属性，第一次加载hibernate时根据model（entity）类会自动建立表结构，后面服务程序重启时，加载hibernate会根据model（entity）类自动更新表结构，如果表结构改变了，但是表行仍然存在，不会删除以前的行（对于**表结构行只增不减**）。
4. **validate** ：服务程序重启后，每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，如果不同，就会报错。不会创建新表，但是会插入新值。
5. **none** : 什么也不做。
   我们常用的是`update`这个属性配置。

- `spring.jpa.database`
  配置数据库类型，我们常用MYSQL数据库，就配置MYSQL（大小写都可）即可；
- `spring.jpa.properties.hibernate.dialect`
  使用MYSQL5作为数据库访问方言。



### 配置

```
spring.jpa.hibernate.ddl-auto
create ----每次运行该程序，没有表格会新建表格，表内有数据会清空；
create-drop ----每次程序结束的时候会清空表
update ---- 每次运行程序，没有表格会新建表格，表内有数据不会清空，只会更新
validate ---- 运行程序会校验数据与数据库的字段类型是否相同，不同会报错。
none —禁用 ddl 处理
spring.jpa.show-sql=true
#输出出sql

spring.jpa.properties.hibernate.format_sql=true
#格式化SQL,如果不加,SQL输出不换行,不方便查看

spring.jpa.properties.hibernate.max_fetch_depth=1
#hibernate.max_fetch_depth 属性用于为单向关联（一对一或多对一）的外连接抓取（Outer Join Fetch）树设置最大深度。设置单向关联的外连接抓取树的最大深度为 1，

spring.jpa.properties.hibernate.hbm2ddl=update
自动创建|更新|验证数据库表结构。如果不是此方面的需求建议set value=“none”。

create：每次加载hibernate时都会删除上一次的生成的表，然后根据你的model类再重新来生成新表，
哪怕两次没有任何改变也要这样执行，这就是导致数据库表数据丢失的一个重要原因。
create-drop ：每次加载hibernate时根据model类生成表，但是sessionFactory一关闭,表就自动删除。
update(***)：最常用的属性，第一次加载hibernate时根据model类会自动建立起表的结构（前提是先建立好数据库），
以后加载hibernate时根据 model类自动更新表结构，即使表结构改变了但表中的行仍然存在不会删除以前的行。
要注意的是当部署到服务器后，表结构是不会被马上建立起来的，是要等 应用第一次运行起来后才会。
validate ：每次加载hibernate时，验证创建数据库表结构，只会和数据库中的表进行比较，不会创建新表，但是会插入新值。
spring.jpa.properties.hibernate.enable_lazy_load_no_trans=true
这个配置的意思就是在没有事务的情况下允许懒加载。

spring.jpa.properties.hibernate.temp.use_jdbc_metadata_defaults=false
```

