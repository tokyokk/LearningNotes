---
# 当前页面内容标题
title: 06、自定义操作（JPQL|SQL）
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

06、自定义操作（JPQL / SQL）
---

在我们经过了上面的学习，我们会发现一个问题：那就是我们所支持的就是一些简单的增删查改等等的操作，对于复杂的一些操作并不支持，所以我们也需要进行一些自定义，可以通过SQL或者 JPQL进行自定义操作！

自定义操作：

### 1、JPQL（原生SQL）

- @Query

  - 查询如果返回单个实体，就使用pojo类进行接收即可，如果是多个就使用list进行接收！

  - 参数设置方式

    - 索引：?数字
    - 具名：:参数名 结合@Param注解指定参数名称   |   

  - 增删改：

    - 要加上事务的支持：
    - 如果是插入方法：一定只能在hibernate下才支持（Insert into … select）

    ```java
    @Transactional // 开启事务！通常会放在业务逻辑层上去声明！
    @Modifying  // 通知springdatajpa 是增删改的操作！
    ```

测试代码如下：

1. 创建repository/CustomerRepository

```java
package com.yykk.repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerRepositories extends PagingAndSortingRepository<Customer,Long>{

    // 使用JPQL实现增删改查

    // 查询
    //@Query("from Customer where custName=?1")
    @Query(value = "from Customer where custName=:custName")
    List<Customer> findCustomerByCustName(@Param("custName") String custName);

    /**
     *  更新操作！
     *  在这里如果没有事务的支持，那么我们会报错！需要定义在业务逻辑层里面！
     *  @Modifying  // 通知springdatajpa 是增删改的操作！
     */
    @Query("update Customer c set c.custName=:custName where c.id=:id")
    @Transactional // 开启事务！
    @Modifying  // 通知springdatajpa 是增删改的操作！
    int updateCustomerById(@Param("custName") String custName,@Param("id") Long id);

    // 删除
    @Query("delete from Customer c  where c.id=?1")
    @Transactional // 开启事务！
    @Modifying  // 通知springdatajpa 是增删改的操作！
    String deleteCustomer(Long id);

    // 新增 JPQL 默认是不支持的，但是这里是使用的伪插入，底层是hibernate！
    // 通知springdatajpa 是增删改的操作！
    //@Transactional // 开启事务！
    //@Modifying
    //@Query(value = "insert into Customer(custName) select cust_name from Customer where id=?1") //这里推荐使用其他方法insert方法不推荐使用！如果要使用可以使用原生的！这里没有values报错！可以尝试一下拼接！
    //int insertCustomerBySelect(Long id);

    // 原生SQL查询
    // 在这个查询中写成custName之后就报错！
    @Query(value = "select * FROM tb_Customer where cust_name= ? "
            ,nativeQuery = true)
    List<Customer> findCustomerByCustNameBySql(@Param("custName") String custName);

}
```

2. 测试！

```java
import com.yykk.config.SpringDataJPAConfig;
import com.yykk.pojo.Customer;
import com.yykk.repositories.CustomerRepositories;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@ContextConfiguration(classes = SpringDataJPAConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class JPQLTest {

    @Autowired
    CustomerRepositories repositories;

    /**
     * 查询测试！
     * 因为可能会遇到返回的结果是多个相同的，就使用list接收！
     */
    @Test
    public void testQuery() {
        List<Customer> customer = repositories.findCustomerByCustName("yykk");
        System.out.println(customer);
    }

    /**
     *  更新操作！
     *  在这里如果没有事务的支持，那么我们会报错！需要定义在业务逻辑层里面！
     */
    @Test
    public void testUpdate() {
        int result = repositories.updateCustomerById("apple", 3L);
        System.out.println(result);
    }

    @Test
    public void testDelete() {
        String result = repositories.deleteCustomer( 9L);
        System.out.println(result);
    }

    //@Test
    //public void testInsert() {
    //    int result = repositories.insertCustomerBySelect(1L);
    //    System.out.println(result);
    //}

    @Test
    public void testQuery_sql() {

        List<Customer> list = repositories.findCustomerByCustNameBySql("yykk");
        System.out.println(list);
    }
}
```

### 2、规定方法名

- 只支持查询方法主题关键字（前缀）
  - 只有查询和删除！决定当前方法作用！

- **==查询主题关键字==**

| 关键字                                                       | 描述                                                         |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| `find…By`、``read…By`、`get…By`、`query..By`、`search…By`、`stream…By` | 通过查询方法通常返回存储库类型、`Collection`或`Streamable`子类型或结果包装器，例如：`Page`、`GeoResults`或任何其他特定于商店的结果包装器。可用于 `findBy…`，`findMyDomainTypeBy…` |
| `exists…By`                                                  | 存在投影，通常返回 `boolean`结果                             |
| count…By                                                     | 计数投影返回数字结果。                                       |
| delete…By、remove…By                                         | 删除查询方法返回无结果（`void`）或删除计数。                 |
| `…First<number>…`，`…Top<number>…`                           | 将查询结果限制为第一个`<number>`结果。此关键字可以出现在主题的`find`（和其他关键字）和之间的任何位置` by`。 |
| …Distinct…                                                   | 使用不同的查询仅返回唯一的结果。查询特定与商店的文档是否支持该功能。此关键字可以出现在主题的 `find `（和其他关键字）和之间的任意位置 `by`。 |

- 支持的查询方法谓词关键字和修饰符
  - 决定查询条件

| Keyword           | Sample                             | JPQL snippet                                                 |
| ----------------- | ---------------------------------- | ------------------------------------------------------------ |
| And               | findByNameAndPwd                   | where name= ? and pwd =?                                     |
| Or                | findByNameOrSex                    | where name= ? or sex=?                                       |
| Is,Equals         | findById,findByIdEquals            | where id= ?                                                  |
| Between           | findByIdBetween                    | where id between ? and ?                                     |
| LessThan          | findByIdLessThan                   | where id < ?                                                 |
| LessThanEquals    | findByIdLessThanEquals             | where id <= ?                                                |
| GreaterThan       | findByIdGreaterThan                | where id > ?                                                 |
| GreaterThanEquals | findByIdGreaterThanEquals          | where id > = ?                                               |
| After             | findByIdAfter                      | where id > ?                                                 |
| Before            | findByIdBefore                     | where id < ?                                                 |
| IsNull            | findByNameIsNull                   | where name is null                                           |
| isNotNull,NotNull | findByNameNotNull                  | where name is not null                                       |
| Like              | findByNameLike                     | where name like ?                                            |
| NotLike           | findByNameNotLike                  | where name not like ?                                        |
| StartingWith      | findByNameStartingWith             | where name like ‘?%’                                         |
| EndingWith        | findByNameEndingWith               | where name like ‘%?’                                         |
| Containing        | findByNameContaining               | where name like ‘%?%’                                        |
| OrderBy           | findByIdOrderByXDesc               | where id=? order by x desc                                   |
| Not               | findByNameNot                      | where name <> ?                                              |
| In                | findByIdIn(Collection<?> c)        | where id in (?)                                              |
| NotIn             | findByIdNotIn(Collection<?> c)     | where id not in (?)                                          |
| TRUE              | findByAaaTue                       | where aaa = true                                             |
| FALSE             | findByAaaFalse                     | where aaa = false                                            |
| IgnoreCase        | findByNameIgnoreCase               | where UPPER(name)=UPPER(?)                                   |
| top               | findTop10                          | top 10/where ROWNUM <=10                                     |
| Distinct          | findDistinctByLastnameAndFirstname | select distinct … where x.lastname = ?1 and x.firstname = ?2 |

1、repository/CustomerMethodNameRepositories

```java
package com.yykk.repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface CustomerMethodNameRepositories extends PagingAndSortingRepository<Customer,Long>{

    List<Customer> findByCustName(String custName);

    boolean existsByCustName(String custName);

    @Transactional
    @Modifying
    int deleteByid(Long id);

    List<Customer> findByCustNameLike(String custName);

}
```

2、测试！

```java
import com.yykk.config.SpringDataJPAConfig;
import com.yykk.pojo.Customer;
import com.yykk.repositories.CustomerMethodNameRepositories;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@ContextConfiguration(classes = SpringDataJPAConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class MethodName {

    @Autowired
    CustomerMethodNameRepositories repository;

    @Test
    public void list(){
        List<Customer> list = repository.findByCustName("yykk");
        System.out.println(list);
    }

    @Test
    public void exists(){
        boolean exists = repository.existsByCustName("yykk");
        System.out.println(exists);
    }

    @Test
    public void delete(){
        int del = repository.deleteByid(12L);
        System.out.println(del);
    }

    @Test
    public void like(){
        List<Customer> list = repository.findByCustNameLike("y%");
        System.out.println(list);
    }
}
```

这里的都是静态的固定查询，对于动态的查询要根据以下的这几种方法！

### 3、通过Query by Example

- 只支持查询
  - 不支持嵌套或分组的属性约束，如firstname = ？0 or（firstname = ？ 1 and lastname = ？ 2）
  - 只支持字符串 start/contains/ends/regex 匹配和其他属性类型的精确匹配。

实现：

1、将Repository继承QueryByExampleExecutor

```java
package com.yykk.repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.QueryByExampleExecutor;

public interface CustomerQBERepositories extends PagingAndSortingRepository<Customer, Long>
        , QueryByExampleExecutor<Customer> {

}
```

2、测试代码！

```java
import com.yykk.config.SpringDataJPAConfig;
import com.yykk.pojo.Customer;
import com.yykk.repositories.CustomerQBERepositories;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

@ContextConfiguration(classes = SpringDataJPAConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class QueryByExampleExecutor {

    @Autowired
    CustomerQBERepositories repository;

    /**
     * 简单实例：客户名称，客户地址动态查询！
     */
    @Test
    public void list() {
        Customer customer = new Customer();
        customer.setCustName("yykk");
        customer.setCustAddress("上海");

        // 通过 Example构造查询条件！
        Example<Customer> example = Example.of(customer);

        Iterable<Customer> all = repository.findAll(example);
        System.out.println(all);
    }

    /**
     * 通过匹配器，进行条件的限制！
     * 简单实例：客户名称，客户地址动态查询！
     */
    @Test
    public void test() {
        Customer customer = new Customer();
        customer.setCustName("kk");
        customer.setCustAddress("HAI");

        // 通过匹配器对条件行为进行设置！
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withIgnorePaths("custName")  // 设置忽略的属性！
                //.withIgnoreCase("cust_address")   // 设置忽略大小写，默认不写就是全部属性的设置！
                //.withStringMatcher(ExampleMatcher.StringMatcher.ENDING); // 对字符串进行结尾匹配
                .withMatcher("cust_address",m -> m.endsWith().ignoreCase(true));  // 针对单个条件进行设置,会使withIgnoreCase失效！
                //.withMatcher("custAddress", ExampleMatcher.GenericPropertyMatchers.endsWith());
        // 通过 Example构造查询条件！
        Example<Customer> example = Example.of(customer,matcher);

        Iterable<Customer> list = repository.findAll(example);
        System.out.println(list);
    }


}
```



### 4、通过Specifications

之前使用Query by Example只能针对字符串进行条件设置，那如果希望对所有类型支持，可以使用Specifcations

**实现**

1、继承接口

```java
package com.yykk.repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CustomerSpecificationsRepositories extends PagingAndSortingRepository<Customer,Long>
        ,JpaSpecificationExecutor<Customer> {
    
}
```

- root：查询哪个表（关联查询）= from
- CriteriaQuery：查询哪些字段，排序是什么 = 组合（order by 、where）
- CriteriaBuilder：条件之间是什么关系，如何生成一个查询条件，每一个查询条件是什么类型（>  between  in …）= where
- Predicate（Expression）：每一条查询条件的详细描述 

2、测试！

```java
import com.yykk.config.SpringDataJPAConfig;
import com.yykk.pojo.Customer;
import com.yykk.repositories.CustomerSpecificationsRepositories;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

@ContextConfiguration(classes = SpringDataJPAConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class SpecificationsTest {

    @Autowired
    CustomerSpecificationsRepositories repository;

    @Autowired
    EntityManager entityManager;

    @Test
    public void test_All(){
        List<Customer> customer = repository.findAll(new Specification<Customer>() {
            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                // root from Customer ,获取列
                // CriteriaBuilder 设置各种条件 (< > in ...)
                // query 组合(order by ,where )

                return null;
            }
        });
    }

    /**
     * 查询客户范围（in）
     * id > 大于
     * 地址：精确
     */
    @Test
    public void test_Coll(){
        List<Customer> customer = repository.findAll(new Specification<Customer>() {
            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                // root from Customer ,获取列
                // CriteriaBuilder 设置各种条件 (< > in ...)
                // query 组合(order by ,where )

                Path<Long> id = root.get("id");
                Path<String> custName = root.get("custName");
                Path<String> custAddress = root.get("custAddress");

                // 参数1：为哪个字段设置条件    参数2：值
                Predicate address = criteriaBuilder.equal(custAddress, "SHANGHAI");
                Predicate ids = criteriaBuilder.greaterThan(id, 0L);
                CriteriaBuilder.In<String> in = criteriaBuilder.in(custName);
                in.value("yykk").value("张三");

                Predicate predicate = criteriaBuilder.and(address, ids,in);

                return predicate;
            }
        });
        System.out.println(customer);
    }

    /**
     * 查询客户范围（in）
     * id > 大于
     * 地址：精确
     * 将这里的值设置为动态的！
     */
    @Test
    public void test_dynamic(){

        Customer params = new Customer();
        params.setId(0L);
        params.setCustAddress("SHANGHAI");
        params.setCustName("yykk,apple");

        List<Customer> customer = repository.findAll(new Specification<Customer>() {
            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                // root from Customer ,获取列
                // CriteriaBuilder 设置各种条件 (< > in ...)
                // query 组合(order by ,where )

                Path<Long> id = root.get("id");
                Path<String> custName = root.get("custName");
                Path<String> custAddress = root.get("custAddress");

                // 参数1：为哪个字段设置条件    参数2：值
                List<Predicate> list = new ArrayList<>();
                if (StringUtils.isEmpty(params.getCustAddress())) {
                    list.add(criteriaBuilder.equal(custAddress, "SHANGHAI"));
                }
                if (params.getId() > -1) {
                    list.add(criteriaBuilder.greaterThan(id, 0L));
                }
                if (StringUtils.isEmpty(params.getCustName())) {
                    CriteriaBuilder.In<String> in = criteriaBuilder.in(custName);
                    in.value("yykk").value("张三");
                    list.add(in);
                }

                Predicate predicate = criteriaBuilder.and(list.toArray(new Predicate[list.size()]));

                return predicate;
            }
        });
        System.out.println(customer);
    }

    /**
     * 查询客户范围（in）
     * id > 大于
     * 地址：精确
     * 将这里的值设置为动态的！
     */
    @Test
    public void test_dynamicx(){

        CriteriaBuilder builder = entityManager.getCriteriaBuilder();
        CriteriaQuery<Object> query = builder.createQuery();
        Root<Customer> root = query.from(Customer.class);

        Customer params = new Customer();
        params.setId(0L);
        params.setCustAddress("SHANGHAI");
        params.setCustName("yykk,apple");

        List<Customer> customer = repository.findAll(new Specification<Customer>() {
            @Override
            public Predicate toPredicate(Root<Customer> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {

                // root from Customer ,获取列
                // CriteriaBuilder 设置各种条件 (< > in ...)
                // query 组合(order by ,where )

                // 1、通过root拿到需要设置条件的字段
                Path<Long> id = root.get("id");
                Path<String> custName = root.get("custName");
                Path<String> custAddress = root.get("custAddress");

                // 2、通过CriteriaBuilder设置不同的类型条件
                List<Predicate> list = new ArrayList<>();
                if (StringUtils.isEmpty(params.getCustAddress())) {
                    // 参数1：为哪个字段设置条件    参数2：值
                    list.add(criteriaBuilder.equal(custAddress, "SHANGHAI"));
                }
                if (params.getId() > -1) {
                    list.add(criteriaBuilder.greaterThan(id, 0L));
                }
                if (StringUtils.isEmpty(params.getCustName())) {
                    CriteriaBuilder.In<String> in = criteriaBuilder.in(custName);
                    in.value("yykk").value("张三");
                    list.add(in);
                }

                // 3、组合条件！
                Predicate predicate = criteriaBuilder.and(list.toArray(new Predicate[list.size()]));

                Order desc = criteriaBuilder.desc(id);
                return query.where(predicate).orderBy(desc).getRestriction();
            }
        });
        System.out.println(customer);
    }

}
```

> 限制：不能分组、聚合函数，需要自己通过entityManager！



### 5、通过Querydsl

官网：http://querydsl.com/

Github：https://github.com/querydsl/querydsl

中文文档：https://github.com/wjw465150/Querydsl-Reference-Guide-Chinese-version

Querydsl 是基于ORM框架或SQL平台上的一个**通用查询框架**。借助于Querydsl可以在任何支持的ORM框架或者SQL平台上**以通用API方式构建查询**！

JPA是QueryDSL的主要集成技术，是JPQL和Criteria查询的替代方法。目前QueryDSL支持的平台包括JPA、JDO、SQL、MongoDB等等！

QueryDSL扩展让我们以链式方式编写查询方法。该扩展需要一个接口QueryDslPredicateExecutor，它定义了很多查询方法。

1、接口继承了该接口，就可以使用提供的各种方法了！

```java
package com.yykk.repositories;

import com.yykk.pojo.Customer;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface CustomerQueryDSLRepositories extends PagingAndSortingRepository<Customer,Long>
        , QuerydslPredicateExecutor<Customer> {

}
```

2、导入依赖！

```xml
<dependency>
  <groupId>com.querydsl</groupId>
  <artifactId>querydsl-apt</artifactId>
  <version>${querydsl.version}</version>
  <scope>provided</scope>
</dependency>

<dependency>
  <groupId>com.querydsl</groupId>
  <artifactId>querydsl-jpa</artifactId>
  <version>${querydsl.version}</version>
</dependency>

<dependency>
  <groupId>org.slf4j</groupId>
  <artifactId>slf4j-log4j12</artifactId>
  <version>1.6.1</version>
</dependency>
```

3、配置Maven APT插件！

```xml
<project>
  <build>
  <plugins>
    <plugin>
      <groupId>com.mysema.maven</groupId>
      <artifactId>apt-maven-plugin</artifactId>
      <version>1.1.3</version>
      <executions>
        <execution>
          <goals>
            <goal>process</goal>
          </goals>
          <configuration>
            <outputDirectory>target/generated-sources/java</outputDirectory>
            <processor>com.querydsl.apt.jpa.JPAAnnotationProcessor</processor>
          </configuration>
        </execution>
      </executions>
    </plugin>
  </plugins>
  </build>
</project>
```

`JPAAnnotationProcessor` 查找使用 `javax.persistence.Entity` 注解的实体类并为它们生成查询类。

如果您在实体类中使用 Hibernate 注解，则应改用 APT 处理器 `com.querydsl.apt.hibernate.HibernateAnnotationProcessor`。

运行`maven clean install`，您将得到生成的查询类到 `target/generated-sources/java`目录下。

如果您使用 Eclipse，请运行 `mvn eclipse:eclipse` 来更新您的 Eclipse 项目以包含 `target/generated-sources/java` 作为源文件夹。

==简单理解：打开IDEA的项目工程，将我们生成的Q类设置为Sources资源类！==

4、测试！

```java
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.yykk.config.SpringDataJPAConfig;
import com.yykk.pojo.Customer;
import com.yykk.pojo.QCustomer;
import com.yykk.repositories.CustomerQueryDSLRepositories;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.util.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@ContextConfiguration(classes = SpringDataJPAConfig.class)
@RunWith(SpringJUnit4ClassRunner.class)
public class QueryDSLTest {

    @Autowired
    CustomerQueryDSLRepositories repository;

    // 解决线程安全问题，类似于Autowired！@Bean默认是单例的，JPA就有线程安全问题！
    @PersistenceContext
    EntityManager entityManager;


    @Test
    public void test_All(){
        QCustomer customer = QCustomer.customer;

        // 通过id查找
        BooleanExpression eq = customer.id.eq(1L);
        System.out.println(repository.findOne(eq));
    }

    /**
     * 查询客户范围（in）
     * id > 大于
     * 地址：精确
     */
    @Test
    public void test_demo(){
        QCustomer customer = QCustomer.customer;

        // 通过id查找
        BooleanExpression and = customer.custName.in("yykk","apple")
                        .and(customer.id.gt(0L))
                        .and(customer.custAddress.eq("SHANGHAI"));
        System.out.println(repository.findOne(and));
    }


    /**
     * 查询客户范围（in）
     * id > 大于
     * 地址：精确
     * 测试动态的！
     */
    @Test
    public void test(){

        Customer params = new Customer();
        params.setId(0L);
        params.setCustAddress("SHANGHAI");
        params.setCustName("yykk");

        QCustomer customer = QCustomer.customer;

        // 初始条件 类似于1=1，永远都成立！
        BooleanExpression expression = customer.isNotNull().or(customer.isNull());

        expression = params.getId() > -1 ?
                expression.and(customer.id.gt(params.getId())) : expression;

        expression = !StringUtils.isEmpty(params.getCustName()) ?
                expression.and(customer.custName.in(params.getCustName().split(","))) : expression;

        expression = !StringUtils.isEmpty(params.getCustAddress()) ?
                expression.and(customer.custAddress.in(params.getCustAddress())) : expression;

        System.out.println(repository.findAll(expression));
    }

    /**
     * 自定义列查询、分组
     * 需要使用原生态的方式！(Specification)
     */
    @Test
    public void test_customize(){
        JPAQueryFactory factory = new JPAQueryFactory(entityManager);

        QCustomer customer = QCustomer.customer;

        // select id,custName from ...
        // 构建基于QueryDsl的查询
        JPAQuery<Tuple> tupleJPAQuery = factory.select(customer.id, customer.custName)
                .from(customer)
                .where(customer.id.eq(1L))
                .orderBy(customer.id.desc());

        // 执行查询
        List<Tuple> fetch = tupleJPAQuery.fetch();

        // 处理返回数据
        for (Tuple tuple : fetch) {
            System.out.println(tuple.get(customer.id));
            System.out.println(tuple.get(customer.custName));
        }
    }

    /**
     * 自定义列查询、分组
     * 需要使用原生态的方式！(Specification)
     * 通过Repository进行查询，列、表都是固定的！
     */
    @Test
    public void test_customize_list(){
        JPAQueryFactory factory = new JPAQueryFactory(entityManager);

        QCustomer customer = QCustomer.customer;

        // select id,custName from ...
        // 构建基于QueryDsl的查询
        JPAQuery<Long> longJPAQuery = factory.select(customer.id.sum())
                .from(customer)
                //.where(customer.id.eq(1L))
                .orderBy(customer.id.desc());

        // 执行查询
        List<Long> fetch = longJPAQuery.fetch();

        // 处理返回数据
        for (Long tuple : fetch) {
            System.out.println(tuple);
        }
    }
}
```

