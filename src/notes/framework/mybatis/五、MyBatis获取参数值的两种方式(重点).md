---
# 当前页面内容标题
title: 五、MyBatis获取参数值的两种方式(重点)
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

# 五、MyBatis获取参数值的两种方式(重点)

MyBatis获取参数值的两种方式：${} 和 #{}

**${} 的本质就是字符串拼接，#{}的本质就是占位符赋值**

- ${}使用字符串拼接的方式拼接sql，若为字符串类型或日期类型的字段进行赋值时，需要手动加单引号

- #{}使用占位符赋值的方式拼接sql，此时为字符串类型或日期类型的字段进行赋值时，可以自动添加单引号

## 1、单个字面量类型的参数

**若mapper接口中的方法参数为单个的字面量类型**

此时可以使用${}和#{}以任意的名称获取参数的值，注意${}需要手动加单引号

```java
/**
 * 根据用户名查询用户信息
 */
User getUserByUsername(String username);
```

```xml
<!--User getUserByUsername(String username);-->
<select id="getUserByUsername" resultType="User">
    <!-- select * from t_user where username = #{username} -->
    select * from t_user where username = '${username}'
</select>
```

## 2、多个字面量类型的参数

若mapper接口中的方法参数为多个时

此时MyBatis会**自动将这些参数放在一个map集合中**，以**arg0,arg1...为键**，以参数为值;以 **param1,param2**...为键，以参数为值;因此只需要通过${}和#{}访问map集合的键就可以获取相对应的值，注意${}需要手动加单引号

```java
/**
 * 验证登录
 */
User checkLogin(String username, String password);
```

```xml
<!--User checkLogin(String username, String password);-->
<!--[arg0,arg1,param1,param2]-->
<select id="checkLogin" resultType="User">
    <!-- select * from t_user where username = #{agr0} and password = #{arg1} -->
    select * from t_user where username = '${param1}' and password = '${param2}'
</select>
```

## 3、map集合类型的参数

若mapper接口中的方法采参数为多个时，此时可以手动创建map集合，将这些数据放在map中只需要通过${}和#{}**访问map集合的键就可以获取对应的值**，注意${}需要手动加单引号

```java
/**
* 验证登录(参数为map)
*/
User checkLoginByMap(Map<String,Object> map);
```

```xml
<!--User checkLoginByMap(Map<String,Object> map);-->
<select id="checkLoginByMap" resultType="user">
    select * from t_user where username = #{username} and password = #{password}
</select>
```

## 4、实体类类型的参数

若mapper接口中的方法参数为实体类对象时 此时可以使用${}和#{}，**通过访问实体类对象中的属性名获取属性值**，注意${}需要手动加单引号

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

## 5、使用@Param标识参数

可以通过@Param注解标识mapper接口中的方法参数

此时，会将这些参数放在map集合中，**以@Param注解的value属性值为键，以参数为值**;以 **param1,param2...为键，以参数为值;**只需要通过${}和#{}访问map集合的键就可以获取相对应的值， 注意${}需要手动加单引号

```java
/**
* 验证登录（使用@Parm）
*/
User checkLoginByParma(@Param("username") String username,@Param("password") String password);
```

```xml
<!--User checkLoginByParma(@Param("username") String username,@Param("password") String password);-->
<select id="checkLoginByParma" resultType="User">
    select * from t_user where username = #{username} and password = #{password}
</select>
```

---

测试类

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.ParameterMapper;
import com.atguigu.mybatis.pojo.User;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ParameterMapperTest {



    /**
     *  MyBatis获取参数值的两种方式：${} 和 #{}
     *  ${} 本质是字符串拼接 (可能会导致sql注入)
     *  #{} 本质是占位符赋值
     *  MyBatis获取参数值的各种情况：
     *  1、mapper接口方法的参数为单个的字面量类型
     *  可以通过${}和#{}以任意的名称获取参数值，但是需要注意${}的单引号问题
     *  2、mapper接口方法的参数为多个时
     *  此时MyBatis会将这些参数放在一个map集合中，以两种方式进行存储
     *  a>以arg0,arg1..为键，以参数为值
     *  b>以param1,param2...为键,以参数为值
     *  因此只需要通过#{}和${}以键的方式访问值即可，但是需要注意${}的单引号问题
     *  3、若mapper接口方法的参数有多个时，可以手动将这些参数放在一个map中存储
     *  只需要通过#{}和${}以键(自己设置的)的方式访问值即可，但是需要注意${}的单引号问题
     *  4、mapper接口方法的参数是一个实体类类型的参数
     *  只需要通过#{}和${}以属性的方式访问属性值即可，但是需要注意${}的单引号问题
     *  5、使用@Param注解命名参数
     *  此时MyBatis会将这些参数放在一个map集合汇总，以两种方式进行存储
     *  a>以@Param注解的值为键，以参数为值
     *  b>以param1,param2...为键，以参数为值
     *  因此只需要通过#{}和${}以键的方式访问值即可，但是需要注意${}的单引号问题
     */

    @Test
    public void testInsertUser() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        int rows = mapper.insertUser(new User(null, "李四", "123", 23, "男", "123@qq.com"));
        System.out.println(rows);
    }

    @Test
    public void testCheckLoginByMap() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        Map<String,Object> map = new HashMap<>();
        map.put("username", "admin");
        map.put("password", "123456");
        User user = mapper.checkLoginByMap(map);
        System.out.println(user);
    }

    @Test
    public void testCheckLoginByParam() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        User user = mapper.checkLoginByParma("张三", "123456");
        System.out.println(user);
        sqlSession.close();
    }


    @Test
    public void testCheckLogin() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        User user = mapper.checkLogin("张三", "123456");
        System.out.println(user);
    }

    @Test
    public void testGetUserByUserName() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        User user = mapper.getUserByUsername("张三");
        System.out.println(user);
    }

    @Test
    public void testGetAllUser() {
        SqlSession sqlSession = SqlSessionUtils.getSqlSession();
        ParameterMapper mapper = sqlSession.getMapper(ParameterMapper.class);
        List<User> users = mapper.getAllUser();
        users.forEach(user -> System.out.println(user));
    }


}
```

