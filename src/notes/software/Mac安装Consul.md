---
# 当前页面内容标题
title: MAC安装consul与基本使用
# 分类
category:
  - consul
# 标签
tag: 
  - consul
  - 服务注册中心
  - springcloud
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 一、[consul](https://so.csdn.net/so/search?q=consul&spm=1001.2101.3001.7020)下载地址：

```text
https://www.consul.io/downloads
或者
https://releases.hashicorp.com/consul/1.12.1
```

解压并安装

将下载文件解压后得到consul，复制consul文件到如下目录

```sh
cp consul /usr/local/bin
```

## 二、开发模式启动验证

```sh
consul agent -dev
```

通过如下地址访问：

```
http://127.0.0.1:8500/ui/dc1/services
```

## 三、启用server端

```sh
consul agent \
-server \
-bootstrap-expect 1 \
-data-dir /Users//Documents/IDE/consul1.12.1/data \
-node=consulServer-emily \
-bind=127.0.0.1 \
-ui \
-rejoin \
-config-dir=/Users/admin/Documents/IDE/consul1.12.1/consul.d/ \
-client 0.0.0.0 \
-datacenter=emily-dev
```

- server ： 定义agent运行在server模式
- bootstrap ：用来控制一个server是否在bootstrap模式，在一个datacenter中只能有一个server处于bootstrap模式，当一个server处于bootstrap模式时，可以自己选举为raft leader
- bootstrap-expect ：在一个datacenter中期望提供的server节点数目，当该值提供的时候，consul一直等到达到指定sever数目的时候才会引导整个集群，该标记不能和bootstrap共用
- bind：该地址用来在集群内部的通讯，集群内的所有节点到地址都必须是可达的(默认是0.0.0.0,多张网卡的时候会报错，必须启动命令显式指定ip)
- node：节点在集群中的名称，在一个集群中必须是唯一的，默认是该节点的主机名
- rejoin：使consul忽略先前的离开，在再次启动后仍旧尝试加入集群中。
- config-dir：配置文件目录，里面所有以.json结尾的文件都会被加载
- client：consul服务侦听地址，这个地址提供HTTP、DNS、RPC等服务，默认是127.0.0.1所以不对外提供服务，如果你要对外提供服务改成0.0.0.0
- datacenter: 指定数据中心名称，默认是dc1
- ui:启动ui

## 四、以下将分两个步骤引导ACL系统，即启用ACL和创建引导令牌

步骤一、启用ACL，上面已经开启了Consul-Server，我们先去config-dir指定的目录下创建agent.[hcl](https://so.csdn.net/so/search?q=hcl&spm=1001.2101.3001.7020)来启用ACL

```sh
acl = {
  enabled = true
  default_policy = "deny"
  enable_token_persistence = true
}
```

- enabled：是否开启ACL；
- default_policy：默认策略，deny标识默认拒绝所有操作，allow标识默认允许所有操作；
- enable_token_persistence：持久化到磁盘，重启时重新加载；

步骤二：创建初始化bootstrap token

创建初始化bootstrap token，可以使用acl bootstrap命令在其中一个server端

执行如下命令：

```sh
consul acl bootstrap
```

或通过HTTP API:

```sh
curl \
    --request PUT \
    http://127.0.0.1:8500/v1/acl/bootstrap
```

返回结果示例：

```json
{
	"ID": "b4164a39-80a9-63cf-9c07-a6790ff9b64e",
	"AccessorID": "17b8493f-f059-e1e6-65fc-f9ead783141d",
	"SecretID": "b4164a39-80a9-63cf-9c07-a6790ff9b64e",
	"Description": "Bootstrap Token (Global Management)",
	"Policies": [{
		"ID": "00000000-0000-0000-0000-000000000001",
		"Name": "global-management"
	}],
	"Local": false,
	"CreateTime": "2022-05-27T11:33:07.529511+08:00",
	"Hash": "X2AgaFhnQGRhSSF/h0m6qpX1wj/HJWbyXcxkEM/5GrY=",
	"CreateIndex": 9,
	"ModifyIndex": 9
}
```

其中SecretID即为global-management策略的token;

## 五、状态查询

- 集群状态查询

```sh
consul operator raft list-peers
或
consul operator raft list-peers -token 'b4164a39-80a9-63cf-9c07-a6790ff9b64e'
```

- 单接单状态查询

```sh
consul members
或
consul members -token 'b4164a39-80a9-63cf-9c07-a6790ff9b64e'
```

## 六、[设置环境变量](https://so.csdn.net/so/search?q=设置环境变量&spm=1001.2101.3001.7020)

如果开启了ACL，通过如下命令设置环境变量后就不用每次都带上token令牌了

```sh
export CONSUL_HTTP_TOKEN=<your_token_here>
```

----



## 七、brew安装与使用

> 下载地址：[Install | Consul | HashiCorp Developer](https://developer.hashicorp.com/consul/downloads)
>
> consul官网：[Consul | HashiCorp Developer](https://developer.hashicorp.com/consul)

1. 安装

```sh
brew tap hashicorp/tap
brew install hashicorp/tap/consul
```

2. 输入第二个命令的时候如果报错（不报错的请忽略此步骤）

> 错误信息：
>
> consul
>
> Install the Command Line Tools:
>
> [xcode](https://so.csdn.net/so/search?q=xcode&spm=1001.2101.3001.7020)-select --install

报上面的错误信息则输入命令：

```sh
xcode-select --install
```

输入完命令以后会弹框，点同意下载，ps:刚开始的时候显示的下载时间会很长，其实并不会很久，10几分钟左右，大概2个g，安装完成以后继续输入命令：

```
brew install hashicorp/tap/consul
```



3. 验证是否安装成功

```sh
consul --version
```

4. 启动命令

```sh
brew services start consul
```

5. 关闭命令

```sh
brew services stop consul
```

6. 启动成功以后访问consul网址

```html
http://localhost:8500/ui/dc1/intentions
```

