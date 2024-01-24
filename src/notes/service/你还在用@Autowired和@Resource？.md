---
# 标题
title: 你还在用@Autowired和@Resource吗？
# 分类
category:
  - java
# 标签
tag:
  - java
  - redis
  - Map
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

直接上总结：`我们在类上使用 Lombok的@RequiredArgsConstructor 注解来替代类中的多处@Autowired和@Resource`。

### 依赖注入

先回顾一下Spring的3种依赖注入。

1. 属性注入

```java
public class SysUserController extends BaseController {
    @Autowired
    private ISysUserService userService;

    @Resource
    private ISysRoleService roleService;
}
```

@Autowired默认按类型装配,@Resource默认按名称装配，当找不到与名称匹配的bean时，才会按类型装配。

而@Qualifier和Autowired配合使用，指定bean的名称，也可以做到按名称装配。

IDEA中直接在变量上使用 @Autowired会发现警告提示：`Field injection is not recommended`。

原因是官方建议我们使用构造器注入方式，这种方式存在明显的弊端，比如：注入对象不能用final修饰、无法发现NullPointException的存在。

2. 构造器注入

```java
public class SysUserController extends BaseController {

    private final ISysUserService userService;

    private final ISysRoleService roleService;

    public SysUserController(ISysUserService userService, ISysRoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }
}
```

构造器依赖注入通过容器触发一个类的构造器来实现的，通过强制指明依赖注入来保证这个类的运行，防止`NullPointerException`；

Spring官方推荐使用构造器注入不仅是因为这种情况下成员属性可以使用final关键字修饰，更关键的一点是能够避免循环依赖，如果存在循环依赖，Spring项目启动的时候就会报错。

为什么说是避免而不是解决呢？

`因为构造器注入是通过构造方法来生成对象，其必须要先获取属性，才能生成调用构造方法进行实例化，这种情况的循环依赖是无法解决的。`

下面通过一张图来看下A、B俩相互依赖的对象注入方式不同时Spring能否解决循环依赖的情况：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eab81918af7946328f5d24fb60652d0c~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

> 构造器注入方式解决循环依赖:  
> 1.代码重构  
> 2.@Lazy注解  
> 3.改用属性注入  
> 建议查看：[zhuanlan.zhihu.com](https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F562691467 "https://link.juejin.cn/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F562691467")

3. Setter注入

```java
public class SysUserController extends BaseController {
    
    private ISysUserService userService;

    @Autowired
    public void setUserService(ISysUserService userService) {
        this.userService = userService;
    }
}
```

需要注意的是，在使用Setter注入时需要加`@Autowired`或`@Resource`注解，否则是无法注入成功的。

另外要注意一点，属性注入和Setter注入的变量都无法使用`final`关键字修饰。

### @RequiredArgsConstructor

> 这里可能会有人说不推荐使用Lombok，只要我们知其然且知其所以然，那他就是一个帮助我们快速开发的好工具。

在说完Spring的三种依赖注入后，我们来认识一下Lombok的@RequiredArgsConstructor 注解。

在Lombok中，生成构造方法的注解一共有三个，分别是@NoArgsConstructor, @RequiredArgsConstructor, @AllArgsContructor，我们这里只介绍@RequiredArgsConstructor。

```java
@Controller
@RequiredArgsConstructor
public class SysUserController extends BaseController {

    private final ISysUserService userService;

    private ISysRoleService roleService;

   //----------------------------
}
```

使用@RequiredArgsConstructor会为我们生成一个包含`常量、使用final关键字修饰的变量`的`私有构造方法`。

那我们就可以不使用属性注入(@Autowired和@Resource)的方式，直接通过构造器的方式来完成注入，不仅能够省略简化许多代码，也解决了属性注入可能存在的空指针问题。
