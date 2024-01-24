---
# 当前页面内容标题
title: 七、特殊SQL的执行
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

# 七、特殊SQL的执行

## 1、模糊查询

三种方式

- **'%{xxx}%'**
- **concat('%', #{xxx}, '%')**
- **"%"#{xxxx}"%" 用的最多**

```java
/**
* 根据用户模糊查询用户信息
*/
List<User> getUserByLike(@Param("username") String username);
```

```xml
<!--List<User> getUserByLike(@Param("username") String username);-->
<select id="getUserByLike" resultType="User">
    <!--select * from t_user where username like '%${username}%' -->
    <!-- select * from t_user where username like concat('%', #{username}, '%') -->
    select * from t_user where username like "%"#{username}"%"
</select>
```

## 2、批量删除

```java
/**
* 批量删除
*/
int deleteMore(@Param("ids") String ids);
```

```xml
<!--int deleteMore(@Param("ids") String ids);-->
<delete id="deleteMore">
    delete from t_user where id in(${ids})
</delete>
```

> - 这里使用 **${}** 的原因是：解析后不带 ''

## 3、动态设置表名

```java
/**
* 查询指定表中的数据
*/
List<User> getUserByTableName(@Param("tableName") String tableName);
```

```xml
<!--List<User> getUserByTableName(@Param("tableName") String tableName);-->
<select id="getUserByTableName" resultType="User">
    select * from ${tableName}
</select>
```

## 4、添加功能获取自增的主键

- **userGeneratedKeys：设置使用自增的主键**
- **KeyProperty：因为增删改查有统一的返回值是受影响的行数，因此只能将获取的自增的主键放在传输的参数user对象的某个属性中**

```java
/**
* 添加用户信息
*/
void insertUser(User user);
```

```xml
<!--
  void insertUser(User user);
  useGeneratedKeys:设置当前标签的sql使用了自增的主键
  keyProperty：将自增的主键赋值给传输到映射文件中参数的某个属性
-->
<insert id="insertUser" useGeneratedKeys="true" keyProperty="id">
  insert into t_user values(null, #{username}, #{password}, #{age}, #{sex}, #{email})
</insert>
```

---

测试类：

```java
public class SQLMapperTest {

    @Test
    public void testGetUserByLike() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        SQLMapper mapper = session.getMapper(SQLMapper.class);
        List<User> list = mapper.getUserByLike("a");
        System.out.println(list);
    }


    @Test
    public void testDeleteMore() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        SQLMapper mapper = session.getMapper(SQLMapper.class);
        int result = mapper.deleteMore("2,3,4");
        System.out.println(result);
    }

    @Test
    public void testGetUserByTableName() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        SQLMapper mapper = session.getMapper(SQLMapper.class);
        List<User> list = mapper.getUserByTableName("t_user");
        System.out.println(list);
    }

    @Test
    public void testJDBC() throws Exception {
        Class.forName("");
        Connection connection = DriverManager.getConnection("", "", "");
        PreparedStatement ps = connection.prepareStatement("insert", Statement.RETURN_GENERATED_KEYS);
        ps.executeUpdate();
        ResultSet resultSet = ps.getGeneratedKeys();
    }

    @Test
    public void testInsertUser() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        SQLMapper mapper = session.getMapper(SQLMapper.class);
        User user = new User(null, "王五", "123", 23, "男", "wangwu@qq.com");
        mapper.insertUser(user);
        System.out.println(user);
    }

}
```

