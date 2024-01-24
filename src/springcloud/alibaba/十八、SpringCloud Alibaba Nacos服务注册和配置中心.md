---
# 当前页面内容标题
title: 十八、SpringCloud Alibaba Nacos服务注册和配置中心
# 分类
category:
  - springcloud
# 标签
tag: 
  - spring
  - springcloud
  - 微服务
  - java
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 01、Nacos简介和下载

**为什么叫Nacos**

- 前四个字母分别为Naming和Configuration的前两个字母，最后的s为Service。

**是什么**

- 一个更易于构建云原生应用的动态服务发现、配置管理和服务管理平台。
- Nacos: Dynamic Naming and Configuration Service
- Nacos就是注册中心＋配置中心的组合 -> **Nacos = Eureka+Config+Bus**

**能干嘛**

- 替代Eureka做服务注册中心
- 替代Config做服务配置中心

去哪下

- https://github.com/alibaba/nacos/releases
- [官网文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring cloud alibaba nacos_discovery)

**各中注册中心比较**

| 服务注册与发现框架 | CAP模型 | 控制台管理 | 社区活跃度      |
| --------- | ----- | ----- | ---------- |
| Eureka    | AP    | 支持    | 低(2.x版本闭源) |
| Zookeeper | CP    | 不支持   | 中          |
| consul    | CP    | 支持    | 高          |
| Nacos     | AP    | 支持    | 高          |

据说Nacos在阿里巴巴内部有超过10万的实例运行，已经过了类似双十一等各种大型流量的考验。

## 02、Nacos安装

- 本地Java8+Maven环境已经OK先
- 从[官网](https://github.com/alibaba/nacos/releases)下载Nacos
- 解压安装包，直接运行bin目录下的startup.cmd
- 命令运行成功后直接访问http://localhost:8848/nacos，默认账号密码都是nacos
- 结果页面

![img](./images/a3ad68ab8165ff76356641c1f49a7683.png)

> Nacos2.x启动报错：[(58条消息) mac使用Nacos2.x版本启动报错解决方案_mac启动nacos报错_꧁༺青༒竹༻ ꧂的博客-CSDN博客](https://blog.csdn.net/weixin_54889617/article/details/128237460)

## 03、Nacos之服务提供者注册

[官方文档](https://spring-cloud-alibaba-group.github.io/github-pages/greenwich/spring-cloud-alibaba.html#_spring_cloud_alibaba_nacos_discovery)

新建Module - cloudalibaba-provider-payment9001

POM

父POM

```xml
<dependencyManagement>
    <dependencies>
        <!--spring cloud alibaba 2.1.0.RELEASE-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-alibaba-dependencies</artifactId>
            <version>2.1.0.RELEASE</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

本模块POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2020</artifactId>
        <groupId>com.nakanomay.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-provider-payment9001</artifactId>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
</project>
```

YML

```yml
server:
  port: 9001

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #配置Nacos地址

management:
  endpoints:
    web:
      exposure:
        include: '*'
```

主启动

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@EnableDiscoveryClient
@SpringBootApplication
public class PaymentMain9001 {
    public static void main(String[] args) {
            SpringApplication.run(PaymentMain9001.class, args);
    }
}
```

业务类

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {
    @Value("${server.port}")
    private String serverPort;

    @GetMapping(value = "/payment/nacos/{id}")
    public String getPayment(@PathVariable("id") Integer id) {
        return "nacos registry, serverPort: "+ serverPort+"\t id"+id;
    }
}
```

测试

- http://localhost:9001/payment/nacos/1
- nacos控制台
- nacos服务注册中心+服务提供者9001都OK了

为了下一章节演示nacos的负载均衡，参照9001新建9002

- 新建cloudalibaba-provider-payment9002
- 9002其它步骤你懂的
- 或者**取巧**不想新建重复体力劳动，可以利用IDEA功能，直接拷贝虚拟端口映射
- 参数：`-DServer.port=9011`

![img](./images/2bef79cd8f72b8f23b815b49f4ba07ce.png)

## 04、Nacos之服务消费者注册和负载

新建Module - cloudalibaba-consumer-nacos-order83

POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2022</artifactId>
        <groupId>com.nakanomay.springcloud</groupId>
        <version>1.0.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-consumer-nacos-order83</artifactId>

    <dependencies>
        <!--SpringCloud ailibaba nacos -->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!-- 引入自己定义的api通用包，可以使用Payment支付Entity -->
        <dependency>
            <groupId>com.nakanomay.springcloud</groupId>
            <artifactId>cloud-api-commons</artifactId>
            <version>1.0-SNAPSHOT</version>
        </dependency>
        <!-- SpringBoot整合Web组件 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--日常通用jar包配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

为什么nacos支持负载均衡？因为spring-cloud-starter-alibaba-nacos-discovery内含netflix-ribbon包。

YML

```yml
server:
  port: 83

spring:
  application:
    name: nacos-order-consumer
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848

#消费者将要去访问的微服务名称(注册成功进nacos的微服务提供者)
service-url:
  nacos-user-service: http://nacos-payment-provider
```

主启动

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class OrderNacosMain83
{
    public static void main(String[] args)
    {
        SpringApplication.run(OrderNacosMain83.class,args);
    }
}
```

业务类

ApplicationContextConfig

```java
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class ApplicationContextConfig
{
    @Bean
    @LoadBalanced
    public RestTemplate getRestTemplate()
    {
        return new RestTemplate();
    }
}
```

OrderNacosController

```java
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.annotation.Resource;

@RestController
@Slf4j
public class OrderNacosController {

    @Resource
    private RestTemplate restTemplate;

    @Value("${service-url.nacos-user-service}")
    private String serverURL;

    @GetMapping(value = "/consumer/payment/nacos/{id}")
    public String paymentInfo(@PathVariable("id") Long id)
    {
        return restTemplate.getForObject(serverURL+"/payment/nacos/"+id,String.class);
    }

}
```

测试

- 启动nacos控制台
- http://localhost:83/consumer/payment/nacos/13
  - 83访问9001/9002，轮询负载OK

## 05、Nacos服务注册中心对比提升

**Nacos全景图**

![nacos全景图](./images/a9c35ea022a95aa76bfec990d6b73d8a.jpeg)

**Nacos和CAP**

Nacos与其他注册中心特性对比

![Nacos与其他注册中心特性对比](./images/62d5a8566a2dc588a5ed52346049a054.png)

**Nacos服务发现实例模型**

![Nacos服务发现实例模型](./images/6578e36df056a995a39034045c36fc40.png)

**Nacos支持AP和CP模式的切换**

C是所有节点在同一时间看到的数据是一致的;而A的定义是所有的请求都会收到响应。

*何时选择使用何种模式?*

—般来说，如果不需要存储服务级别的信息且服务实例是通过nacos-client注册，并能够保持心跳上报，那么就可以选择AP模式。当前主流的服务如Spring cloud和Dubbo服务，都适用于AP模式，AP模式为了服务的可能性而减弱了一致性，因此AP模式下只支持注册临时实例。

如果需要在服务级别编辑或者存储配置信息，那么CP是必须，K8S服务和DNS服务则适用于CP模式。CP模式下则支持注册持久化实例，此时则是以Raft协议为集群运行模式，该模式下注册实例之前必须先注册服务，如果服务不存在，则会返回错误。

切换命令：

`curl -X PUT '$NACOS_SERVER:8848/nacos/v1/ns/operator/switches?entry=serverMode&value=CP`

## 06、Nacos之服务配置中心

基础配置

cloudalibaba-config-nacos-client3377

POM

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <parent>
        <artifactId>cloud2020</artifactId>
        <groupId>com.nakanomay.springcloud</groupId>
        <version>1.0-SNAPSHOT</version>
    </parent>
    <modelVersion>4.0.0</modelVersion>

    <artifactId>cloudalibaba-config-nacos-client3377</artifactId>

    <dependencies>
        <!--nacos-config-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-config</artifactId>
        </dependency>
        <!--nacos-discovery-->
        <dependency>
            <groupId>com.alibaba.cloud</groupId>
            <artifactId>spring-cloud-starter-alibaba-nacos-discovery</artifactId>
        </dependency>
        <!--web + actuator-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
        <!--一般基础配置-->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
            <scope>runtime</scope>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

</project>
```

YML

Nacos同springcloud-config一样，在项目初始化时，要保证先从配置中心进行配置拉取，拉取配置之后，才能保证项目的正常启动。

springboot中配置文件的加载是存在优先级顺序的，bootstrap优先级高于application

bootstrap

```yml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: DEV_GROUP
        namespace: 7d8f0f5a-6a53-4785-9686-dd460158e5d4


# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml

# nacos-config-client-test.yaml   ----> config.info
```

application

```yml
spring:
  profiles:
    active: dev # 表示开发环境
    #active: test # 表示测试环境
    #active: info
```

主启动

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;


@EnableDiscoveryClient
@SpringBootApplication
public class NacosConfigClientMain3377
{
    public static void main(String[] args) {
        SpringApplication.run(NacosConfigClientMain3377.class, args);
    }
}
```

业务类

```java
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope //支持Nacos的动态刷新功能。
public class ConfigClientController
{
    @Value("${config.info}")
    private String configInfo;

    @GetMapping("/config/info")
    public String getConfigInfo() {
        return configInfo;
    }
}
```

**在Nacos中添加配置信息**

Nacos中的dataid的组成格式及与SpringBoot配置文件中的匹配规则

[官方文档](https://nacos.io/zh-cn/docs/quick-start-spring-cloud.html)

说明：之所以需要配置spring.application.name，是因为它是构成Nacos配置管理dataId 字段的一部分。

在 Nacos Spring Cloud中,dataId的完整格式如下：

```java
${prefix}-${spring-profile.active}.${file-extension}
```

- prefix默认为spring.application.name的值，也可以通过配置项spring.cloud.nacos.config.prefix来配置。
- spring.profile.active即为当前环境对应的 profile，详情可以参考 Spring Boot文档。注意：当spring.profile.active为空时，对应的连接符 - 也将不存在，datald 的拼接格式变成`${prefix}.${file-extension}`
- file-exetension为配置内容的数据格式，可以通过配置项spring .cloud.nacos.config.file-extension来配置。目前只支持properties和yaml类型。
- 通过Spring Cloud 原生注解@RefreshScope实现配置自动更新。

最后公式：

```java
${spring.application.name)}-${spring.profiles.active}.${spring.cloud.nacos.config.file-extension}
```

配置新增

![img](./images/05d45948bf637614dbd70e2bc8ce992d.png)

Nacos界面配置对应 - 设置DataId

![img](./images/c61619bbe5ea16f34efca8103b0f90ba.png)

配置小结

![img](./images/b3bffc4a646b30f9bf64fc649bf26f7d.png)

**测试**

- 启动前需要在nacos客户端-配置管理-配置管理栏目下有对应的yaml配置文件
- 运行cloud-config-nacos-client3377的主启动类
- 调用接口查看配置信息 - http://localhost:3377/config/info

**自带动态刷新**

修改下Nacos中的yaml配置文件，再次调用查看配置的接口，就会发现配置已经刷新。

## 07、Nacos之命名空间分组和DataID三者关系

**问题 - 多环境多项目管理**

问题1:

实际开发中，通常一个系统会准备

1. dev开发环境
2. test测试环境
3. prod生产环境。

如何保证指定环境启动时服务能正确读取到Nacos上相应环境的配置文件呢?

问题2:

一个大型分布式微服务系统会有很多微服务子项目，每个微服务项目又都会有相应的开发环境、测试环境、预发环境、正式环境…那怎么对这些微服务配置进行管理呢?

Nacos的图形化管理界面

![img](./images/3a7d1ad9bea8356742997ed3ebbe9be3.png)

![img](./images/fe336f99f44c4b0aefddf0ae38d1c470.png)

**Namespace+Group+Data lD三者关系？为什么这么设计？**

1是什么

类似Java里面的package名和类名最外层的namespace是可以用于区分部署环境的，Group和DatalD逻辑上区分两个目标对象。

2三者情况

![img](./images/60712abd615dd86ac6c119bf132a28d6.png)

默认情况：Namespace=public，Group=DEFAULT_GROUP，默认Cluster是DEFAULT

- Nacos默认的Namespace是public，Namespace主要用来实现隔离。
  
  - 比方说我们现在有三个环境：开发、测试、生产环境，我们就可以创建三个Namespace，不同的Namespace之间是隔离的。

- Group默认是DEFAULT_GROUP，Group可以把不同的微服务划分到同一个分组里面去

- Service就是微服务:一个Service可以包含多个Cluster (集群)，Nacos默认Cluster是DEFAULT，Cluster是对指定微服务的一个虚拟划分。
  
  - 比方说为了容灾，将Service微服务分别部署在了杭州机房和广州机房，这时就可以给杭州机房的Service微服务起一个集群名称(HZ) ，给广州机房的Service微服务起一个集群名称(GZ)，还可以尽量让同一个机房的微服务互相调用，以提升性能。

- 最后是Instance，就是微服务的实例。

## 08、Nacos之DataID配置

指定spring.profile.active和配置文件的DatalD来使不同环境下读取不同的配置

默认空间+默认分组+新建dev和test两个DatalD

- 新建dev配置DatalD

![img](./images/5ea4b3fd5ca8cb6e7de6f0d9ac98f051.png)

- 新建test配置DatalD

![img](./images/b41fe36b41fa2d5abc6e5e492ee3625d.png)

通过spring.profile.active属性就能进行多环境下配置文件的读取

![img](./images/281a70d387cb48ce82e94421adf17747.png)

**测试**

- http://localhost:3377/config/info
- 配置是什么就加载什么 test/dev

## 09、Nacos之Group分组方案

通过Group实现环境区分 - 新建Group

![img](./images/bdf592aa566fe50f7f454118a70ca03c.png)

在nacos图形界面控制台上面新建配置文件DatalD

![img](./images/28aee2b45901bbb9a6776d5c4398a6bb.png)

bootstrap+application

在config下增加一条group的配置即可。可配置为DEV_GROUP或TEST GROUP

![img](./images/342a167a8bd948d8ba5cbfd760cf66a6.png)

## 10、Nacos之Namespace空间方案

新建dev/test的Namespace

![img](./images/a10c71978c75c214aca5fa7057bb2834.png)

回到服务管理-服务列表查看

![img](./images/2a9f3fa415f5cead0219d404a47131a0.png)

按照域名配置填写

![img](./images/2177c126090c0db553a8ce77e838a7c9.png)

YML

```yml
# nacos配置
server:
  port: 3377

spring:
  application:
    name: nacos-config-client
  cloud:
    nacos:
      discovery:
        server-addr: localhost:8848 #Nacos服务注册中心地址
      config:
        server-addr: localhost:8848 #Nacos作为配置中心地址
        file-extension: yaml #指定yaml格式的配置
        group: DEV_GROUP
        namespace: 7d8f0f5a-6a53-4785-9686-dd460158e5d4 #<------------指定namespace


# ${spring.application.name}-${spring.profile.active}.${spring.cloud.nacos.config.file-extension}
# nacos-config-client-dev.yaml

# nacos-config-client-test.yaml   ----> config.info
```

## 11、Nacos集群_架构说明

> [官方文档](https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html)
> 
> **官网架构图**
> 
> 集群部署架构图
> 
> 因此开源的时候推荐用户把所有服务列表放到一个vip下面，然后挂到一个域名下面
> 
> http://ip1:port/openAPI直连ip模式，机器挂则需要修改ip才可以使用。
> 
> http://VIP:port/openAPI挂载VIP模式，直连vip即可，下面挂server真实ip，可读性不好。
> 
> http://nacos.com:port/openAPI域名＋VIP模式，可读性好，而且换ip方便，推荐模式
> 
> ![img](./images/59bfb9114980c13f42d14e64dd2dafab.png)

上图官网翻译，真实情况

![img](./images/681c3dc16a69f197896cbff482f2298e.png)

按照上述，**我们需要mysql数据库**。

> [官网说明](https://nacos.io/zh-cn/docs/deployment.html)
> 
> 默认Nacos使用嵌入式数据库实现数据的存储。所以，如果启动多个默认配置下的Nacos节点，数据存储是存在一致性问题的。为了解决这个问题，**Nacos采用了集中式存储的方式来支持集群化部署，目前只支持MySQL的存储**。
> 
> Nacos支持三种部署模式
> 
> - 单机模式-用于测试和单机试用。
> - 集群模式-用于生产环境，确保高可用。
> - 多集群模式-用于多数据中心场景。
> 
> **Windows**
> 
> cmd startup.cmd或者双击startup.cmd文件
> 
> **单机模式支持mysql**
> 
> 在0.7版本之前，在单机模式时nacos使用嵌入式数据库实现数据的存储，不方便观察数据存储的基本情况。0.7版本增加了支持mysql数据源能力，具体的操作步骤:
> 
> 1. 安装数据库，版本要求:5.6.5+
> 2. 初始化mysq数据库，数据库初始化文件: nacos-mysql.sql
> 3. 修改conf/application.properties文件，增加支持mysql数据源配置（目前只支持mysql)，添加mysql数据源的url、用户名和密码。
> 
> ```properties
> spring.datasource.platform=mysql
> 
> db.num=1
> db.url.0=jdbc:mysql://11.162.196.16:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
> db.user=nacos_devtest
> db.password=youdontknow
> ```
> 
> 再以单机模式启动nacos，nacos所有写嵌入式数据库的数据都写到了mysql。

## 12、Nacos持久化切换配置

Nacos默认自带的是嵌入式数据库derby，[nacos的pom.xml](https://blog.csdn.net/u011863024/article/details/github.com/alibaba/nacos/blob/develop/config/pom.xml)中可以看出。

derby到mysql切换配置步骤：

1. nacos-server-1.1.4\nacos\conf录下找到nacos-mysql.sql文件，执行脚本。
2. nacos-server-1.1.4\nacos\conf目录下找到application.properties，添加以下配置（按需修改对应值）。

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=root
db.password=1234
```

启动Nacos，可以看到是个全新的空记录界面，以前是记录进derby。

## 13、Nacos之Linux版本安装

预计需要，1个Nginx+3个[nacos](https://so.csdn.net/so/search?q=nacos&spm=1001.2101.3001.7020)注册中心+1个mysql

> 请确保是在环境中安装使用:
> 
> 1. 64 bit OS Linux/Unix/Mac，推荐使用Linux系统。
> 2. 64 bit JDK 1.8+；[下载](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html).[配置](https://docs.oracle.com/cd/E19182-01/820-7851/inst_cli_jdk_javahome_t/)。
> 3. Maven 3.2.x+；[下载](https://maven.apache.org/download.cgi).[配置](https://maven.apache.org/settings.html)。
> 4. 3个或3个以上Nacos节点才能构成集群。
> 
> [link](https://nacos.io/zh-cn/docs/cluster-mode-quick-start.html)

Nacos下载Linux版

- https://github.com/alibaba/nacos/releases/tag/1.1.4
- nacos-server-1.1.4.tar.gz 解压后安装

## 14、Nacos集群配置(上)

集群配置步骤(重点)

**1.Linux服务器上mysql数据库配置**

SQL脚本在哪里 - 目录nacos/conf/nacos-mysql.sql

![img](./images/e845f90f1003384a9db91bc34dfdd248.png)

自己Linux机器上的Mysql数据库上运行

**2.application.properties配置**

位置

![img](./images/1f5549ab8a788ff450f4cfb2bed03f58.png)

添加以下内容，设置数据源

```properties
spring.datasource.platform=mysql

db.num=1
db.url.0=jdbc:mysql://localhost:3306/nacos_devtest?characterEncoding=utf8&connectTimeout=1000&socketTimeout=3000&autoReconnect=true
db.user=root
db.password=1234
```

**3.Linux服务器上nacos的集群配置cluster.conf**

梳理出3台nacos集器的不同服务端口号，设置3个端口：

- 3333
- 4444
- 5555

复制出cluster.conf

![img](./images/d742baa2bf4354db8dd9d588724e1f5c.png)

内容

```conf
192.168.111.144:3333
192.168.111.144:4444
192.168.111.144:5555
```

**注意**，这个IP不能写127.0.0.1，必须是Linux命令`hostname -i`能够识别的IP

![img](./images/431d5c0a090b88dffce35768e89e5a90.png)

**4.编辑Nacos的启动脚本startup.sh，使它能够接受不同的启动端口**

/mynacos/nacos/bin目录下有startup.sh

![img](./images/2cd7289348079d580cefed591a7568b9.png)

平时单机版的启动，都是./startup.sh即可

但是，集群启动，我们希望可以类似其它软件的shell命令，传递不同的端口号启动不同的nacos实例。

命令: ./startup.sh -p 3333表示启动端口号为3333的nacos服务器实例，和上一步的cluster.conf配置的一致。

修改内容

![img](./images/5b1fc1f634176ad17a19e4021d2b3b5e.png)

![img](./images/9a3b1d043e5d55236216a46f296e8606.png)

执行方式 - `startup.sh - p 端口号`

![img](./images/c68aec0dbcc1ed3d61b7e482718f9270.png)

## 15、Nacos集群配置(下)

**5.Nginx的配置，由它作为负载均衡器**

修改nginx的配置文件 - nginx.conf

![img](./images/700b800ca2e5a3dc01d0312cbeacda38.png)

修改内容

![img](./images/769472eda4b6a5e1b284db80c705d17f.png)

按照指定启动

![img](./images/f97a514ee914fb6050fd7428beb20639.png)

**6.截止到此处，1个Nginx+3个nacos注册中心+1个mysql**

**测试**

- 启动3个nacos注册中心
  
  - `startup.sh - p 3333`
  - `startup.sh - p 4444`
  - `startup.sh - p 5555`
  - 查看nacos进程启动数`ps -ef | grep nacos | grep -v grep | wc -l`

- 启动nginx
  
  - `./nginx -c /usr/local/nginx/conf/nginx.conf`
  - 查看nginx进程`ps - ef| grep nginx`

- 测试通过nginx，访问nacos - http://172.16.102.100:1111/nacos/#/login

- 新建一个配置测试

![img](./images/a550718db79bd46ee21031e36cb3be00.png)

- 新建后，可在linux服务器的mysql新插入一条记录

```sql
select * from config;
```

![img](./images/acc1d20f83d539d0e7943a11859328f5.png)

- 让微服务cloudalibaba-provider-payment9002启动注册进nacos集群 - 修改配置文件

```yml
server:
  port: 9002

spring:
  application:
    name: nacos-payment-provider
  cloud:
    nacos:
      discovery:
        #配置Nacos地址
        #server-addr: Localhost:8848
        #换成nginx的1111端口，做集群
        server-addr: 192.168.111.144:1111

management:
  endpoints:
    web:
      exposure:
        inc1ude: '*'
```

- 启动微服务cloudalibaba-provider-payment9002
- 访问nacos，查看注册结果

![img](./images/b463fc3b4e9796fa7d98fb72a3c421b6.png)

**高可用小总结**

![img](./images/42ff7ef670012437b046f099192d7484.png)

> linux集群搭建：（可能遇到的问题）
> 
> - 如果你使用的是mysql5.x版本按照上述即可！
> 
> - 如果使用的是8.x版本的话请升级nacos升级到1.4.1版本以上否则不支持！
> 
> - 如果你使用的是nacos2.x版本的话集群搭建方式就会有差异！
> 
> [(61条消息) linux环境搭建nacos集群详解_linux安装nacos集群_怪 咖@的博客-CSDN博客](https://blog.csdn.net/weixin_43888891/article/details/126808112)
> 
> [(60条消息) 搭建nacos集群_nacos1.1.4集群 k8s\_一米阳光zw的博客-CSDN博客](https://blog.csdn.net/qq_42910468/article/details/127811284)
> 
> [Linux系统安装部署nacos集群：基于nacos2.0.3_linux部署nacos_北冥牧之的博客-CSDN博客](https://blog.csdn.net/qq_42971035/article/details/127174591)
> 
> [(60条消息) nacos无法连接mysql8.0.xx问题总结_nacos连接mysql8.0_zoeil的博客-CSDN博客](https://blog.csdn.net/m0_62946761/article/details/128909529?spm=1001.2101.3001.6650.1&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-128909529-blog-124126835.235%5Ev32%5Epc_relevant_default_base3&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7ECTRLIST%7ERate-1-128909529-blog-124126835.235%5Ev32%5Epc_relevant_default_base3&utm_relevant_index=2)
> 
> [(62条消息) Nacos集群启动报error=‘Cannot allocate memory‘ (errno=12)_errorno=12_xvibeliker的博客-CSDN博客](https://blog.csdn.net/m0_56357357/article/details/123776805)

注意：使用2.0以上版本的Nacos需要在nginx中进行额外配置2.0新增了GRPC功能，端口号为Nacos运行端口+1000

注：若是自行编译的nginx，需要在编译时使用 ./configure --with-stream

详情查看：github nacos 仓库 issues 7385