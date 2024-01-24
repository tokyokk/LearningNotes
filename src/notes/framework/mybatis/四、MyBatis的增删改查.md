---
# 当前页面内容标题
title: 四、MyBatis的增删改查
# 分类
category:
  - mybatis
# 标签
tag: 
  - mybatis
  - java
  - SSM框架
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

# 四、MyBatis的增删改查

## 1、添加

```java
/**
 * 添加用户信息
 */
int insertUser(User user);
```

```xml
<!--int insertUser(User user);-->
  <insert id="insertUser">
      insert into t_user values(null, #{username}, #{password}, #{age}, #{sex}, #{email})
  </insert>
```

## 2、删除

```java
/**
 * 删除用户信息
 */
void deleteUser();
```

```xml
<!--void deleteUser()-->
  <delete id="deleteUser">
      delete from t_user where id = 3
  </delete>
```

## 3、修改

```java
/**
 * 修改用户信息
 */
void updateUser();
```

```xml
<!--void updateUser();-->
  <update id="updateUser">
      update t_user set username = '张三' where id = 4
  </update>
```

## 4、查询一个实体对象

```java
/**
 * 根据id查询用户信息
 */
User getUserById();
```

```xml
<!--
      查询功能的标签必须设置resultType或者resultMap
      resultType:设置默认的映射关系
      resultMap:设置上自定义的映射关系 字段名和实体属性不一致的时候
  -->
  <select id="getUserById" resultType="com.atguigu.mybatis.pojo.User">
      select * from t_user where id = 4
  </select>
```

## 5、查询集合

```java
/**
 * 查询所有的用户信息
 */
List<User> getAllUser();
```

```xml
<!--List<User> getAllUser();-->
  <select id="getAllUser" resultType="User">
      select *
      from t_user
  </select>
```

> 注意：
>
> 1、**查询的标签select必须设置属性resultType或resultMap**，用于设置实体类和数据库表的映射关系
>
> resultType：自动映射，用于属性名和表中字段名一致的情况
>
> resultMap：自定义映射，用于一对多或多对一或字段名和属性名不一致的情况
>
> 2、当查询的数据我多条时，不能使用实体类作为返回值，只能使用集合，否则会抛出异常
>
> **TooManyResultsException**；**但是若查询的数据只有一条，可以使用实体类或集合作为返回值**

