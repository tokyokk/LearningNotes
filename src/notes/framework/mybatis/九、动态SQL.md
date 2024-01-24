---
# 当前页面内容标题
title: 九、动态SQL
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

# 九、动态SQL

Mybatis框架的动态SQL技术是一种根据特定条件动态拼装SQL语句的功能，它存在的意义是为了解决

拼接SQL语句字符串时的痛点问题。

## 1、if

if标签可通过test属性的表达式进行判断，若表达式的结果为true，则标签中的内容会执行;反之标签中 的内容不会执行

```java
/**
* 多条件查询
*/
List<Emp> getEmpByCondition(Emp emp);
```

```xml
<!-- List<Emp> getEmpByCondition(Emp emp);-->
<select id="getEmpByCondition" resultType="Emp">
    select * from t_emp where 1=1
    <if test="empName != null and empName != ''">
        emp_name = #{empName}
    </if>
    <if test="age != null and age != ''">
        and age = #{age}
    </if>
    <if test="sex != null and sex != ''">
        and sex = #{sex}
    </if>
    <if test="email != null and email != ''">
        and email = #{email}
    </if>
</select>
```

## 2、where

```xml
<!--where标签-->
<select id="getEmpByCondition" resultType="Emp">
    select * from t_emp
    <where>
        <if test="empName != null and empName != ''">
            emp_name = #{empName}
        </if>
        <if test="age != null and age != ''">
            and age = #{age}
        </if>
        <if test="sex != null and sex != ''">
            and sex = #{sex}
        </if>
        <if test="email != null and email != ''">
            and email = #{email}
        </if>
    </where>
</select>
```

> where和if一般结合使用:
>
> a>若where标签中的if条件都不满足，则where标签没有任何功能，即不会添加where关键字
>
> b>若where标签中的if条件满足，则where标签会自动添加where关键字，并将条件最前方多余的 and去掉
>
> 注意:where标签不能去掉条件最后多余的and

## 3、trim

```xml
<select id="getEmpByCondition" resultType="Emp">
    select * from t_emp
    <trim prefix="where" suffixOverrides="and|or">
        <if test="empName != null and empName != ''">
            emp_name = #{empName} and
        </if>
        <if test="age != null and age != ''">
            age = #{age} or
        </if>
        <if test="sex != null and sex != ''">
            sex = #{sex} and
        </if>
        <if test="email != null and email != ''">
            email = #{email}
        </if>
    </trim>
</select>
```

> trim用于去掉或添加标签中的内容
>
> 常用属性:
>
> - **prefix:在trim标签中的内容的前面添加某些内容**
> - prefixOverrides:在trim标签中的内容的前面去掉某些内容
> - suffix:在trim标签中的内容的后面添加某些内容
> - **suffixOverrides:在trim标签中的内容的后面去掉某些内容**

## 4、choose、when、otherwise

choose、when、otherwise相当于if...else if..else

```java
/**
* 测试choose、when、otherwise
*/
List<Emp> getEmpByChoose(Emp emp);
```

```xml
<!--List<Emp> getEmpByChoose(Emp emp);-->
<select id="getEmpByChoose" resultType="Emp">
    select * from t_emp
    <where>
        <choose>
            <when test="empName != null and empName != ''">
                emp_name = #{empName}
            </when>
            <when test="age != null and age != ''">
                age = #{age}
            </when>
            <when test="sex != null and sex != ''">
                sex = #{sex}
            </when>
            <when test="email != null and email != ''">
                email = #{email}
            </when>
            <otherwise>
                did = 1
            </otherwise>
        </choose>
    </where>
</select>
```

## 5、foreach

```java
/**
* 通过数组实现批量删除
*/
int deleteMoreByArray(@Param("eids") Integer[] eids);

/**
* 通过List集合实现批量添加
*/
int insertMoreByList(@Param("emps") List<Emp> emps);
```

```xml
<!--int deleteMoreByArray(@Param("eids") Integer[] eids);-->
  <delete id="deleteMoreByArray">
      <!--delete from t_emp where eid in-->
      <!-- <foreach collection="eids" item="eid" open="(" close=")" separator=",">
          #{eid}
      </foreach> -->
      delete from t_emp where eid =
      <foreach collection="eids" item="eid" separator="or">
          #{eid}
      </foreach>
  </delete>

<!--int insertMoreByList(List<Emp> emps);-->
<insert id="insertMoreByList">
    insert into t_emp values
    <foreach collection="emps" item="emp" separator=",">
        (null,#{emp.empName},#{emp.age},#{emp.sex},#{emp.email},null)
    </foreach>
</insert>
```

> 属性:
>
> - collection:设置要循环的数组或集合
> - item:表示集合或数组中的每一个数据
> - separator:设置循环体之间的分隔符
> - open:设置foreach标签中的内容的开始符
> - close:设置foreach标签中的内容的结束符

## 6、SQL片段

sql片段，可以记录一段公共sql片段，在使用的地方通过include标签进行引入

```xml
<sql id="empColumns">eid,emp_name,age,sex,email</sql>
引入公共部分
select <include refid="empColumns"></include> from t_emp
```

---

```java
package com.atguigu.mybatis.test;

import com.atguigu.mybatis.mapper.DynamicSQLMapper;
import com.atguigu.mybatis.pojo.Emp;
import com.atguigu.mybatis.utils.SqlSessionUtils;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.util.Arrays;
import java.util.List;

public class DynamicSQLTest {

    /**
     * 动态SQL:
     * 1、if：根据标签中test属性所对应的表达式决定标签中的内容是否需要拼接到SQL中
     * 2、where：
     * 当where标签中有内容时，会自动生成where关键字，并且将内容多余的and或or去掉
     * 当where标签中没有内容时，此时where标签没有任何效果
     * 注意：where标签不能将其中内容后面多余的and或or去掉
     * 3、trim
     * 若标签有内容时：
     * prefix|suffix：将trim标签中内容前面或后面添加指定内容
     * suffixOverrides|prefixOverrides:将trim标签中内容前面或后面去掉指定内容
     * 若标签中没有内容时，trim标签也没有任何效果
     * 4、choose、when、otherwise，相当于if...else if ... else
     * when至少要有一个，otherwise最多只能有一个
     * 5、foreach
     * collection:设置需要寻相互的数组或集合
     * item:表示数组或集合中的每一个数据
     * separator:循环体之间的分隔符
     * open:foreach标签所循环的所有内容的开始符
     * close:foreach标签所循环的所有内容的结果符
     * 6、sql标签
     *
     */

    @Test
    public void testInsertMoreByList() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        DynamicSQLMapper mapper = session.getMapper(DynamicSQLMapper.class);
        Emp emp1 = new Emp(null, "a1", 23, "男", "123@qq.com");
        Emp emp2 = new Emp(null, "a2", 23, "男", "123@qq.com");
        Emp emp3 = new Emp(null, "a3", 23, "男", "123@qq.com");
        List<Emp> emps = Arrays.asList(emp1, emp2, emp3);
        int rows = mapper.insertMoreByList(emps);
        System.out.println(rows);
    }

    @Test
    public void testDeleteMoreByArray() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        DynamicSQLMapper mapper = session.getMapper(DynamicSQLMapper.class);
        int rows = mapper.deleteMoreByArray(new Integer[]{6, 7, 8});
        System.out.println(rows);
    }

    @Test
    public void testGetEmpByChoose() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        DynamicSQLMapper mapper = session.getMapper(DynamicSQLMapper.class);
        List<Emp> list = mapper.getEmpByChoose(new Emp(null, "张三", null, "", ""));
        System.out.println(list);
    }

    @Test
    public void testGetEmpByCondition() {
        SqlSession session = SqlSessionUtils.getSqlSession();
        DynamicSQLMapper mapper = session.getMapper(DynamicSQLMapper.class);
        List<Emp> list = mapper.getEmpByCondition(new Emp(null, "", null, "", ""));
        System.out.println(list);
    }

}
```

