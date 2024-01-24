---
# 当前页面内容标题
title: 肝了一周总结的SpringBoot常用注解大全，看完就炉火纯青了！
# 分类
category:
  - java
# 标签
tag: 
  - springboot
  - 注解
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

> 平时使用SpringBoot开发项目，少不了要使用到它的注解。这些注解让我们摆脱了繁琐的传统Spring XML配置，让我们开发项目更加高效，今天我们就来聊聊SpringBoot中常用的注解！

## 常用注解概览

这里整理了一张SpringBoot常用注解的思维导图，本文主要讲解这些注解的用法。

## ![51215645621654655615615](./images/51215645621654655615615.jpg)组件相关注解

### @Controller

用于修饰MVC中`controller`层的组件，SpringBoot中的组件扫描功能会识别到该注解，并为修饰的类实例化对象，通常与`@RequestMapping`联用，当SpringMVC获取到请求时会转发到指定路径的方法进行处理。

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/admin")
public class UmsAdminController {
    
}
```

### @Service

用于修饰`service`层的组件，`service`层组件专注于系统业务逻辑的处理，同样会被组件扫描并生成实例化对象。

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Service实现类
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Service
public class UmsAdminServiceImpl implements UmsAdminService {
    
}
```

### @Repository

用于修饰`dao`层的组件，`dao`层组件专注于系统数据的处理，例如数据库中的数据，同样会被组件扫描并生成实例化对象。

```java
/**
 * @auther macrozheng
 * @description 后台用户与角色关系管理自定义Dao
 * @date 2018/10/8
 * @github https://github.com/macrozheng
 */
@Repository
public interface UmsAdminRoleRelationDao {
    
}
```

### @Component

用于修饰SpringBoot中的组件，会被组件扫描并生成实例化对象。`@Controller`、`@Service`、`@Repository`都是特殊的组件注解。

```java
/**
 * @auther macrozheng
 * @description 取消订单消息的生产者组件
 * @date 2018/9/14
 * @github https://github.com/macrozheng
 */
@Component
public class CancelOrderSender {
    
}
```

## 依赖注入注解

### @Autowired

会根据对象的`类型`自动注入依赖对象，默认要求注入对象实例必须存在，可以配置`required=false`来注入不一定存在的对象。

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/admin")
public class UmsAdminController {
    @Autowired
    private UmsAdminService adminService;
}
```

### @Resource

默认会根据对象的`名称`自动注入依赖对象，如果想要根据类型进行注入，可以设置属性为`type = UmsAdminService.class`。

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/admin")
public class UmsAdminController {
    @Autowired
    @Resource(name = "umsAdminServiceImpl")
    private UmsAdminService adminService;
}
```

### @Qualifier

当同一个对象有多个实例可以注入时，使用`@Autowired`注解无法进行注入，这时可以使用`@Qualifier`注解指定实例的名称进行精确注入。

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/admin")
public class UmsAdminController {
    @Autowired
    @Qualifier("umsAdminServiceImpl")
    private UmsAdminService adminService;
}
```

## 实例与生命周期相关注解

### @Bean

用于修饰方法，标识该方法会创建一个Bean实例，并交给Spring容器来管理。

```java
/**
 * @auther macrozheng
 * @description RestTemplate相关配置
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Configuration
public class RestTemplateConfig {
    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

### @Scope

用于声明一个Spring`Bean`实例的作用域，作用域的范围有以下几种：

- singleton：单例模式，在Spring容器中该实例唯一，Spring默认的实例模式。

- prototype：原型模式，每次使用实例都将重新创建。

- request：在同一请求中使用相同的实例，不同请求重新创建。

- session：在同一会话中使用相同的实例，不同会话重新创建。

```java
/**
 * @auther macrozheng
 * @description RestTemplate相关配置
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Configuration
public class RestTemplateConfig {
    @Bean
    @Scope("singleton")
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }
}
```

### @Primary

当同一个对象有多个实例时，优先选择该实例。

```java
/**
 * @auther macrozheng
 * @description Jackson相关配置，配置json不返回null的字段
 * @date 2018/8/2
 * @github https://github.com/macrozheng
 */
@Configuration
public class JacksonConfig {
    @Bean
    @Primary
    @ConditionalOnMissingBean(ObjectMapper.class)
    public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return objectMapper;
    }
}
```

### @PostConstruct

用于修饰方法，当对象实例被创建并且依赖注入完成后执行，可用于对象实例的初始化操作。

### @PreDestroy

用于修饰方法，当对象实例将被Spring容器移除时执行，可用于对象实例持有资源的释放。

### @PostConstruct、@PreDestroy示例

```java
/**
 * @auther macrozheng
 * @description 动态权限数据源，用于获取动态权限规则
 * @date 2020/2/7
 * @github https://github.com/macrozheng
 */
public class DynamicSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

    private static Map<String, ConfigAttribute> configAttributeMap = null;
    @Autowired
    private DynamicSecurityService dynamicSecurityService;

    @PostConstruct
    public void loadDataSource() {
        configAttributeMap = dynamicSecurityService.loadDataSource();
    }

    @PostConstruct
    public void loadDataSource() {
        configAttributeMap = dynamicSecurityService.loadDataSource();
    }

    @PreDestroy
    public void clearDataSource() {
        configAttributeMap.clear();
        configAttributeMap = null;
    }
}
```

## SpringMVC相关注解

### @RequestMapping

可用于将Web请求路径映射到处理类的方法上，当作用于类上时，可以统一类中所有方法的路由路径，当作用于方法上时，可单独指定方法的路由路径。

`method`属性可以指定请求的方式，如GET、POST、PUT、DELETE等。

### @RequestBody

表示方法的请求参数为JSON格式，从Body中传入，将自动绑定到方法参数对象中。

### @ResponseBody

表示方法将返回JSON格式的数据，会自动将返回的对象转化为JSON数据。

### @RequestParam

用于接收请求参数，可以是如下三种形式：

- query param：GET请求拼接在地址里的参数。

- form data：POST表单提交的参数。

- multipart：文件上传请求的部分参数。

### @PathVariable

用于接收请求路径中的参数，常用于REST风格的API。

### @RequestPart

用于接收文件上传中的文件参数，通常是`multipart/form-data`形式传入的参数。

```java
/**
 * @auther macrozheng
 * @description MinIO对象存储管理Controller
 * @date 2019/12/25
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/minio")
public class MinioController {

    @RequestMapping(value = "/upload", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult upload(@RequestPart("file") MultipartFile file) {
            //省略文件上传操作...
            return CommonResult.success(minioUploadDto);
    }
}
```

### SpringMVC注解示例

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Controller
@RequestMapping("/admin")
public class UmsAdminController {

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    @ResponseBody
    public CommonResult<UmsAdmin> register(@RequestBody UmsAdminParam umsAdminParam) {
        UmsAdmin umsAdmin = adminService.register(umsAdminParam);
        if (umsAdmin == null) {
            return CommonResult.failed();
        }
        return CommonResult.success(umsAdmin);
    }
    
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<CommonPage<UmsAdmin>> list(@RequestParam(value = "keyword", required = false) String keyword,
                                                   @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
                                                   @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum) {
        List<UmsAdmin> adminList = adminService.list(keyword, pageSize, pageNum);
        return CommonResult.success(CommonPage.restPage(adminList));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public CommonResult<UmsAdmin> getItem(@PathVariable Long id) {
        UmsAdmin admin = adminService.getItem(id);
        return CommonResult.success(admin);
    }
}
```

### @RestController

用于表示`controller`层的组件，与`@Controller`注解的不同在于，相当于在每个请求处理方法上都添加了`@ResponseBody`注解，这些方法都将返回JSON格式数据。

### @GetMapping

用于表示GET请求方法，等价于`@RequestMapping(method = RequestMethod.GET)`。

### @PostMapping

用于表示POST请求方法，等价于`@RequestMapping(method = RequestMethod.POST)`。

### REST风格注解示例

```java
/**
 * @auther macrozheng
 * @description 后台用户管理Controller
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@RestController
@RequestMapping("/admin")
public class UmsAdminController {

    @PostMapping("/register")
    public CommonResult<UmsAdmin> register(@RequestBody UmsAdminParam umsAdminParam) {
        UmsAdmin umsAdmin = adminService.register(umsAdminParam);
        if (umsAdmin == null) {
            return CommonResult.failed();
        }
        return CommonResult.success(umsAdmin);
    }

    @GetMapping("/list")
    public CommonResult<CommonPage<UmsAdmin>> list(@RequestParam(value = "keyword", required = false) String keyword,
                                                   @RequestParam(value = "pageSize", defaultValue = "5") Integer pageSize,
                                                   @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum) {
        List<UmsAdmin> adminList = adminService.list(keyword, pageSize, pageNum);
        return CommonResult.success(CommonPage.restPage(adminList));
    }
}
```

## 配置相关注解

### @Configuration

用于声明一个Java形式的配置类，SpringBoot推荐使用Java配置，在该类中声明的Bean等配置将被SpringBoot的组件扫描功能扫描到。

```java
/**
 * @auther macrozheng
 * @description MyBatis相关配置
 * @date 2019/4/8
 * @github https://github.com/macrozheng
 */
@Configuration
@MapperScan({"com.macro.mall.mapper","com.macro.mall.dao"})
public class MyBatisConfig {
}
```

### @EnableAutoConfiguration

启用SpringBoot的自动化配置，会根据你在`pom.xml`添加的依赖和`application-dev.yml`中的配置自动创建你需要的配置。

```java
@Configuration
@EnableAutoConfiguration
public class AppConfig {
}
```

### @ComponentScan

启用SpringBoot的组件扫描功能，将自动装配和注入指定包下的Bean实例。

```java
@Configuration
@ComponentScan({"xyz.erupt","com.macro.mall.tiny"})
public class EruptConfig {
}
```

### @SpringBootApplication

用于表示SpringBoot应用中的启动类，相当于`@EnableAutoConfiguration`、`@EnableAutoConfiguration`和`@ComponentScan`三个注解的结合体。

```java
@SpringBootApplication
public class MallTinyApplication {

    public static void main(String[] args) {
        SpringApplication.run(MallTinyApplication.class, args);
    }

}
```

### @EnableCaching

当添加Spring Data Redis依赖之后，可用该注解开启Spring基于注解的缓存管理功能。

```java
/**
 * @auther macrozheng
 * @description Redis配置类
 * @date 2020/3/2
 * @github https://github.com/macrozheng
 */
@EnableCaching
@Configuration
public class RedisConfig extends BaseRedisConfig {

}
```

### @value

用于注入在配置文件中配置好的属性，例如我们可以在`application.yml`配置如下属性：

```yml
jwt:
  tokenHeader: Authorization #JWT存储的请求头
  secret: mall-admin-secret #JWT加解密使用的密钥
  expiration: 604800 #JWT的超期限时间(60*60*24*7)
  tokenHead: 'Bearer '  #JWT负载中拿到开头
```

然后在Java类中就可以使用`@Value`注入并进行使用了。

```java
public class JwtTokenUtil {
    @Value("${jwt.secret}")
    private String secret;
    @Value("${jwt.expiration}")
    private Long expiration;
    @Value("${jwt.tokenHead}")
    private String tokenHead;
}
```

### @ConfigurationProperties

用于批量注入外部配置，以对象的形式来导入指定前缀的配置，比如这里我们在`application.yml`中指定了`secure.ignored`为前缀的属性：

```yml
secure:
  ignored:
    urls: #安全路径白名单
      - /swagger-ui/
      - /swagger-resources/**
      - /**/v2/api-docs
      - /**/*.html
      - /**/*.js
      - /**/*.css
      - /**/*.png
      - /**/*.map
      - /favicon.ico
      - /actuator/**
      - /druid/**
```

然后在Java类中定义一个`urls`属性就可以导入配置文件中的属性了。

```java
/**
 * @auther macrozheng
 * @description SpringSecurity白名单资源路径配置
 * @date 2018/11/5
 * @github https://github.com/macrozheng
 */
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "secure.ignored")
public class IgnoreUrlsConfig {

    private List<String> urls = new ArrayList<>();

}
```

### @Conditional

用于表示当某个条件满足时，该组件或Bean将被Spring容器创建，下面是几个常用的条件注解。

- @ConditionalOnBean：当某个Bean存在时，配置生效。

- @ConditionalOnMissingBean：当某个Bean不存在时，配置生效。

- @ConditionalOnClass：当某个类在Classpath存在时，配置生效。

- @ConditionalOnMissingClass：当某个类在Classpath不存在时，配置生效。

```java
/**
 * @auther macrozheng
 * @description Jackson相关配置，配置json不返回null的字段
 * @date 2018/8/2
 * @github https://github.com/macrozheng
 */
@Configuration
public class JacksonConfig {
    @Bean
    @Primary
    @ConditionalOnMissingBean(ObjectMapper.class)
    public ObjectMapper jacksonObjectMapper(Jackson2ObjectMapperBuilder builder) {
        ObjectMapper objectMapper = builder.createXmlMapper(false).build();
        objectMapper.setSerializationInclusion(JsonInclude.Include.NON_NULL);
        return objectMapper;
    }
}
```

## 数据库事务相关注解

### @EnableTransactionManagement

启用Spring基于注解的事务管理功能，需要和`@Configuration`注解一起使用。

```java
/**
 * @auther macrozheng
 * @description MyBatis相关配置
 * @date 2019/4/8
 * @github https://github.com/macrozheng
 */
@Configuration
@EnableTransactionManagement
@MapperScan({"com.macro.mall.mapper","com.macro.mall.dao"})
public class MyBatisConfig {
}
```

### @Transactional

表示方法和类需要开启事务，当作用与类上时，类中所有方法均会开启事务，当作用于方法上时，方法开启事务，方法上的注解无法被子类所继承。

```java
/**
 * @auther macrozheng
 * @description 前台订单管理Service
 * @date 2018/8/30
 * @github https://github.com/macrozheng
 */
public interface OmsPortalOrderService {

    /**
     * 根据提交信息生成订单
     */
    @Transactional
    Map<String, Object> generateOrder(OrderParam orderParam);
```

## SpringSecurity相关注解

### @EnableWebSecurity

启用SpringSecurity的Web功能。

### @EnableGlobalMethodSecurity

启用SpringSecurity基于方法的安全功能，当我们使用`@PreAuthorize`修饰接口方法时，需要有对应权限的用户才能访问。

### SpringSecurity配置示例

```java
/**
 * @auther macrozheng
 * @description SpringSecurity配置
 * @date 2019/10/8
 * @github https://github.com/macrozheng
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig{
    
}
```

## 全局异常处理注解

### @ControllerAdvice

常与`@ExceptionHandler`注解一起使用，用于捕获全局异常，能作用于所有controller中。

### @ExceptionHandler

修饰方法时，表示该方法为处理全局异常的方法。

### 全局异常处理示例

```java
/**
 * @auther macrozheng
 * @description 全局异常处理
 * @date 2020/2/27
 * @github https://github.com/macrozheng
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ResponseBody
    @ExceptionHandler(value = ApiException.class)
    public CommonResult handle(ApiException e) {
        if (e.getErrorCode() != null) {
            return CommonResult.failed(e.getErrorCode());
        }
        return CommonResult.failed(e.getMessage());
    }
}
```

## AOP相关注解

### @Aspect

用于定义切面，切面是通知和切点的结合，定义了何时、何地应用通知功能。

### @Before

表示前置通知（Before），通知方法会在目标方法调用之前执行，通知描述了切面要完成的工作以及何时执行。

### @After

表示后置通知（After），通知方法会在目标方法返回或抛出异常后执行。

### @AfterReturning

表示返回通知（AfterReturning），通知方法会在目标方法返回后执行。

### @AfterThrowing

表示异常通知（AfterThrowing），通知方法会在目标方法返回后执行。

### @Around

表示环绕通知（Around），通知方法会将目标方法封装起来，在目标方法调用之前和之后执行自定义的行为。

### @Pointcut

定义切点表达式，定义了通知功能被应用的范围。

### @Order

用于定义组件的执行顺序，在AOP中指的是切面的执行顺序，value属性越低优先级越高。

### AOP相关示例

```java
/**
 * @auther macrozheng
 * @description 统一日志处理切面
 * @date 2018/4/26
 * @github https://github.com/macrozheng
 */
@Aspect
@Component
@Order(1)
public class WebLogAspect {
    private static final Logger LOGGER = LoggerFactory.getLogger(WebLogAspect.class);

    @Pointcut("execution(public * com.macro.mall.tiny.controller.*.*(..))")
    public void webLog() {
    }

    @Before("webLog()")
    public void doBefore(JoinPoint joinPoint) throws Throwable {
    }

    @AfterReturning(value = "webLog()", returning = "ret")
    public void doAfterReturning(Object ret) throws Throwable {
    }

    @Around("webLog()")
    public Object doAround(ProceedingJoinPoint joinPoint) throws Throwable {
        WebLog webLog = new WebLog();
        //省略日志处理操作...
        Object result = joinPoint.proceed();
        LOGGER.info("{}", JSONUtil.parse(webLog));
        return result;
    }
    
}
```

## 测试相关注解

### @SpringBootTest

用于指定测试类启用Spring Boot Test功能，默认会提供Mock环境。

### @Test

指定方法为测试方法。

### 测试示例

```java
/**
 * @auther macrozheng
 * @description JUnit基本测试
 * @date 2022/10/11
 * @github https://github.com/macrozheng
 */
@SpringBootTest
public class FirstTest {
    @Test
    public void test() {
        int a=1;
        Assertions.assertEquals(1,a);
    }
}
```

## 总结

这些SpringBoot注解基本都是我平时做项目常用的注解，在我的电商实战项目mall中基本都用到了，这里做了一番整理归纳，希望对大家有所帮助！来源于macrozheng！

