---
# 当前页面内容标题
title: 六、MyBatis的各种查询功能
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

# 六、MyBatis的各种查询功能

## 1、查询一个实体类对象

```java
/**
 * 根据id查询用户的信息
 */
List<User> getUserById(@Param("id") Integer id);
```

```xml
<!--List<User> getUserById(@Param("id") Integer id);-->
<select id="getUserById" resultType="User">
    select * from t_user where id = #{id}
</select>
```

## 2、查询一个list集合

```java
/**
 * 查询所有的用户信息
 */
List<User> getAllUsers();
```

```xml
<!--List<User> getAllUsers();-->
<select id="getAllUsers" resultType="User">
    select * from t_user
</select>
```

## 3、查询单个数据

```java
/**
 * 查询用户信息的总记录数
 */
Integer getCount();
```

```xml
<!--Integer getCount();-->
<select id="getCount" resultType="integer">
    select count(*) from t_user
</select>
```

## 4、查询一条数据为map集合

```java
/**
 * 根据id查询用户信息为一个map集合
 */
Map<String, Object> getUserByIdToMap(@Param("id") Integer id);
```

```xml
<!--Map<String, Object> getUserByIdToMap(@Param("id") Integer id);-->
<select id="getUserByIdToMap" resultType="map">
    select * from t_user where id = #{id}
</select>
<!--结果:{password=123456, sex=男, id=1, age=23, username=admin}-->
```

## 5、查询多条数据为map集合

### 方式一：

```java
/**
* 查询所有用户信息为map集合
* @return
* 将表中的数据以map集合的方式查询，一条数据对应一个map;若有多条数据，就会产生多个map集合，此
时可以将这些map放在一个list集合中获取 */
List<Map<String, Object>> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
    select * from t_user
</select>
```

### 方式二：

```java
/**
* 查询所有用户信息为map集合
* @return
* 将表中的数据以map集合的方式查询，一条数据对应一个map;若有多条数据，就会产生多个map集合，并
且最终要以一个map的方式返回数据，此时需要通过@MapKey注解设置map集合的键，值是每条数据所对应的 map集合
*/
@MapKey("id")
Map<String, Object> getAllUserToMap();
```

```xml
<!--Map<String, Object> getAllUserToMap();-->
<select id="getAllUserToMap" resultType="map">
    select * from t_user
</select>
结果:
<!-- {
1={password=123456, sex=男, id=1, age=23, username=admin}, 
2={password=123456, sex=男, id=2, age=23, username=张三}, 
3={password=123456, sex=男, id=3, age=23, username=张三}
} -->
```

---

> 总结：  
>
> MyBatis的各种查询功能：  
>
> 1、若查询出的数据只有一条
>
> - 可以通过实体类对象接收
>
> - 可以通过List集合接收
>
> - 可以通过map集合接收
>
> - 结果*：{password=123456, sex=男, id=4, age=20, email=123@qq.com, username=张三*
>
> - 若查询出的数据有多条
>
> - 可以通过List集合接收
>
> - 可以通过map类型的list集合接收
>
> - 可以在mapper接口的方法添加@MapKey注解，此时就可以将每条数据转换的map集合作为值，以某个字段为键，放在同一个map集合中。
>
> 注意：一定不能通过实体类对象接收，此时会抛出异常TooManyResultException
>
> Mybatis中设置了默认的类型别名
>
> java.lang.Integer --> int, integer
>
> int --> _int, _integer
>
> Map --> map
>
> String --> string

测试类

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.SelectMapper;
import com.atguigu.mybatis.pojo.User;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.List;
import java.util.Map;

public class SelectMapperTest {

    /**
     * MyBatis的各种查询功能：
     * 1、若查询出的数据只有一条
     * a>可以通过实体类对象接收
     * b>可以通过List集合接收
     * c>可以通过map集合接收
     * 结果：{password=123456, sex=男, id=4, age=20, email=123@qq.com, username=张三}
     * 2、若查询出的数据有多条
     * a>可以通过List集合接收
     * b>可以通过map类型的list集合接收
     * c>可以在mapper接口的方法添加@MapKey注解，此时就可以将每条数据转换的map集合作为值，
     * 以某个字段的值作为键，放在同一个map集合中。
     * 注意：一定不能通过实体类对象接收，此时会抛出异常TooManyResultException
     *
     * Mybatis中设置了默认的类型别名
     * java.lang.Integer --> int, integer
     * int-->_int,_integer
     * Map-->map
     * String-->string
     */

    @Test
    public void testGetAllUserToMap() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
        Map<String, Object> userByIdToMap = mapper.getAllUserToMap();
        System.out.println(userByIdToMap);
        sqlSession.close();
    }

    @Test
    public void testGetUserByIdToMap() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
        Map<String, Object> userByIdToMap = mapper.getUserByIdToMap(4);
        System.out.println(userByIdToMap);
        sqlSession.close();
    }


    @Test
    public void testGetCount() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
        Integer count = mapper.getCount();
        System.out.println("count = " + count);
        sqlSession.close();
    }

    @Test
    public void testGetAllUser() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
        List<User> users = mapper.getAllUsers();
        users.forEach(user -> System.out.println(user));
        sqlSession.close();
    }

    @Test
    public void testGetUserById() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        SelectMapper mapper = sqlSession.getMapper(SelectMapper.class);
        System.out.println(mapper.getUserById(4));
        sqlSession.close();
    }

}
```

