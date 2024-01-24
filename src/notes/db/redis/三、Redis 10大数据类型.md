---
# 当前页面内容标题
title: 三、Redis10打数据类型
# 分类
category:
  - redis
# 标签
tag: 
  - redis
  - NOSQL
  - K,V缓存数据库
  - 非关系型数据库
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 01、which 10

> 官网：https://redis.io/docs/data-types/

![](./images/2023-03-25-23-53-47-image.png)

![](./images/2023-03-25-23-52-38-image.png)

### 一图

![](./images/2023-03-25-23-54-26-image.png)

### 提前声明

> 这里说的数据类型是value的数据类型，key的类型就是字符串

### 十大数据类型

1. redis字符串（String）

> String（字符串）
> 
> string是redis最基本的类型，一个key对应一个value。
> 
> string类型是二进制安全的，意思是redis的string可以包含任何数据，比如jpg图片或者序列化的对象 。
> 
> string类型是Redis最基本的数据类型，一个redis中字符串value最多可以是512M

2. redis列表（List）

> List（列表）
> 
> Redis列表是简单的字符串列表，按照插入顺序排序。你可以添加一个元素到列表的头部（左边）或者尾部（右边）
> 
> 它的底层实际是个双端链表，最多可以包含 2^32 - 1 个元素 (4294967295, 每个列表超过40亿个元素)

3. redis哈希表

> Redis hash 是一个 string 类型的 field（字段） 和 value（值） 的映射表，hash 特别适合用于存储对象。
> 
> Redis 中每个 hash 可以存储 2^32 - 1 键值对（40多亿）

4. redis集合（Set）

> Set（集合）
> 
> Redis 的 Set 是 String 类型的无序集合。集合成员是唯一的，这就意味着集合中不能出现重复的数据，集合对象的编码可以是 intset 或者 hashtable。
> 
> Redis 中Set集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。
> 
> 集合中最大的成员数为 2^32 - 1 (4294967295, 每个集合可存储40多亿个成员)

5. redis有序集合（ZSet）

> zset(sorted set：有序集合)
> 
> Redis zset 和 set 一样也是string类型元素的集合,且不允许重复的成员。
> 
> 不同的是每个元素都会关联一个double类型的分数，redis正是通过分数来为集合中的成员进行从小到大的排序。
> 
> zset的成员是唯一的,但分数(score)却可以重复。
> 
> zset集合是通过哈希表实现的，所以添加，删除，查找的复杂度都是 O(1)。 集合中最大的成员数为 2^32 - 1

6. redis地理空间

> Redis GEO 主要用于存储地理位置信息，并对存储的信息进行操作，包括
> 
> 添加地理位置的坐标。
> 
> 获取地理位置的坐标。
> 
> 计算两个位置之间的距离。
> 
> 根据用户给定的经纬度坐标来获取指定范围内的地理位置集合

7. redis基数统计（HyperLogLog）

> HyperLogLog 是用来做基数统计的算法，HyperLogLog 的优点是，在输入元素的数量或者体积非常非常大时，计算基数所需的空间总是固定且是很小的。
> 
> 在 Redis 里面，每个 HyperLogLog 键只需要花费 12 KB 内存，就可以计算接近 2^64 个不同元素的基 数。这和计算基数时，元素越多耗费内存就越多的集合形成鲜明对比。
> 
> 但是，因为 HyperLogLog 只会根据输入元素来计算基数，而不会储存输入元素本身，所以 HyperLogLog 不能像集合那样，返回输入的各个元素。

8. redis位图（bitmap）

![](./images/2023-03-25-23-59-00-image.png)

> 由0和1状态表现的二进制位的bit数组

9. redis位域（bitfield）

> 通过bitfield命令可以一次性操作多个比特位域(指的是连续的多个比特位)，它会执行一系列操作并返回一个响应数组，这个数组中的元素对应参数列表中的相应操作的执行结果。
> 
> 说白了就是通过bitfield命令我们可以一次性对多个比特位域进行操作。

10. redis流（Stream）

> Redis Stream 是 Redis 5.0 版本新增加的数据结构。
> 
> Redis Stream 主要用于消息队列（MQ，Message Queue），Redis 本身是有一个 Redis 发布订阅 (pub/sub) 来实现消息队列的功能，但它有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。
> 
> 简单来说发布订阅 (pub/sub) 可以分发消息，但无法记录历史消息。
> 
> 而 Redis Stream 提供了消息的持久化和主备复制功能，可以让任何客户端访问任何时刻的数据，并且能记住每一个客户端的访问位置，还能保证消息不丢失

## 02、哪里去获取redis常见数据类型操作命令

> 官网地址：https://redis.io/commands/
> 
> 中文文档：http://www.redis.cn/commands.html

## 03、Redis 键（Key）

### 常用

![](./images/2023-03-26-00-04-07-image.png)

### 案例

> keys *    查看当前库所有的key

> exists key    判断某个key是否存在

> del key    删除指定的key数据

> type key    查看你的key是什么类型

> unlink key    非阻塞删除，仅仅将keys从keyspace元数据中删除，真正删除会在后续异步中操作。

> ttl key    查看还有多少秒过期，-1代表永不过期，-2代表已过期

> expire key 秒钟    为给定的key设置过期时间
> 
> ---
> 
> 设置 Key 过期时间，默认-1表示永不过期，-2表示已过期
> 
> Redis 的过期时间设置有四种形式：
> 
> • EXPIRE 秒——设置指定的过期时间(秒)，表示的是时间间隔。
> 
> • PEXPIRE 毫秒——设置指定的过期时间，以毫秒为单位，表示的是时间间隔。
> 
> • EXPIREAT 时间戳-秒——设置指定的 Key 过期的 Unix 时间，单位为秒，表示的是时间/时刻。
> 
> • PEXPIREAT 时间戳-毫秒——设置指定的 Key 到期的 Unix 时间，以毫秒为单位，表示的是时间/时刻。
> 
> expire key seconds [NX|XX|GT|LT]

> move key dbindex [0~15]    将当前数据库的key移动到给定的数据库db当中

> select dbindex    切换数据库 [0~15],默认为0

> dbsize    查看当前数据库key的数量

> flushdb    清空当前数据库

> flushall    清空所有数据库

## 04、数据类型命令及落地运用

### 官网命令大全网址

> 英文：https://redis.io/commands/
> 
> 中文：http://www.redis.cn/commands.html

### 备注

> 命令不区分大小写，而key是区分大小写的

> 永远的帮助命令，`help @类型`

- help @string

- help @list

- help @hash

- help @hyperloglog

- 。。。

### Redis字符串（String）

> 官网地址：https://redis.io/docs/data-types/strings/

![](./images/2023-03-26-01-27-26-image.png)

![](./images/2023-03-26-01-27-44-image.png)

#### 常用

![](./images/2023-03-26-01-29-24-image.png)

#### 单值单value

#### 案例

> <mark>1.最常用</mark>

> set key value
> 
> set key value [NX|XX] [GET] [EX seconds|PX milliseconds|EXAT unix-time-seconds|PXAT unix-time-milliseconds|KEEPTTL]

![](./images/2023-03-26-16-40-06-image.png)

如何获得设置指定的 Key 过期的 Unix 时间，单位为秒

```java
System.out.println(Long.toString(System.currentTimeMillis()/1000L));
```

> keepttl

![](./images/2023-03-26-15-54-27-image.png)

![](./images/2023-03-26-15-55-26-image.png)

> get key

![](./images/2023-03-26-17-15-33-image.png)

> <mark>2.同时设置/获取多个键值</mark>

> MSET key value [key value ...]

> MGET key [key ...]

> mset/mget/msetnx
> 
> mset:同时设置一个或多个 key-value 对。

![](./images/2023-03-26-16-02-53-image.png)

> mget:获取所有(一个或多个)给定 key 的值。

![](./images/2023-03-26-16-04-10-image.png)

> msetnx:同时设置一个或多个 key-value 对，**当且仅当所有给定 key 都不存在**。

![](./images/2023-03-26-16-06-34-image.png)

> <mark>3.获取指定区间范围内的值</mark>

> getrange/setrange

> getrange:获取指定区间范围内的值，类似between......and的关系
> 
> 从零到负一表示全部

![](./images/2023-03-26-16-10-47-image.png)

> setrange设置指定区间范围内的值，格式是setrange key值 具体值

![](./images/2023-03-26-16-12-29-image.png)

> <mark>4.数值增减</mark>

- 一定是数字才能进行加减

- 递增数字
  
  INCR key

- 增加指定的整数
  
  INCRBY key increment

- 递减数值
  
  DECR key

- 减少指定的整数
  
  DECRBY key decrement

<img src="./images/2023-03-26-17-17-14-image.png" title="" alt="" data-align="center">

> <mark>5.获取字符串长度的内容追加</mark>

- STRLEN key

- APPEND key value

<img src="./images/2023-03-26-17-18-05-image.png" title="" alt="" data-align="center">

> <mark>6.分布式锁</mark>

<img src="./images/2023-03-26-16-15-57-image.png" title="" alt="" data-align="center">

> setnx key value 

> setex(set with expire)键秒值/setnx(set if not exist)
> 
> setex:设置带过期时间的key，动态设置。
> 
> setex 键 秒值 真实值

<img src="./images/2023-03-26-16-22-25-image.png" title="" alt="" data-align="center">

> setnx:只有在 key 不存在时设置 key 的值。

![](./images/2023-03-26-16-24-28-image.png)

> 下半场-高阶篇详细深度讲解，不要错过，^_^

> <mark>7.getset(先get再set)</mark>

> getset:将给定 key 的值设为 value ，并返回 key 的旧值(old value)。
> 
> 简单一句话，先get然后立即set

![](./images/2023-03-26-16-30-14-image.png)

#### 应用场景

1. 比如抖音无限点赞某个视频或者商品，点一下加一下

![](./images/2023-03-26-16-32-09-image.png)

2. 是否喜欢的文章

```textline
阅读数：只要点击了rest地址，直接可以使用incr key 命令增加一个数字1，完成记录数字。
```

<img src="./images/2023-03-26-16-32-45-image.png" title="" alt="" data-align="center">

### Redis列表（List）

![](./images/2023-03-26-17-09-46-image.png)

#### 常用

![](./images/2023-03-26-17-11-14-image.png)

#### 单key多value

#### 简单说明

> 一个双端链表的结构，容量是2的32次方减1个元素，大概40多亿，主要功能有push/pop等，一般用在栈、队列、消息队列等场景。
> 
> left、right都可以插入添加；
> 
> 如果键不存在，创建新的链表；
> 
> 如果键已存在，新增内容；
> 
> 如果值全移除，对应的键也就消失了。
> 
> - 它的底层实际是个**双向链表，对两端的操作性能很高，通过索引下标的操作中间的节点性能会较差。**

![](./images/2023-03-26-17-12-19-image.png)

#### 案例

> <mark>1.lpush/rpush/lrange</mark>

![](./images/2023-03-26-17-21-50-image.png)

> <mark>2.lpop/rpop</mark>

![](./images/2023-03-26-17-23-51-image.png)

> <mark>3.lindex，按照索引下标获取元素（从上到下）</mark>

> 通过索引获取列表中的元素 lindex key index

<img src="./images/2023-03-26-17-25-27-image.png" title="" alt="" data-align="center">

> <mark>4.llen</mark>

> 获取列表中元素的个数

![](./images/2023-03-26-20-22-56-image.png)

> <mark>5.lrem key 数字N 给定值v1    解释（删除N个值等于v1的元素）</mark>

* 从left往right删除2个值等于v1的元素，返回的值为实际删除的数量
* LREM list3 0 值，表示删除全部给定的值。**零个就是全部值**

![](./images/2023-03-26-17-30-26-image.png)

> <mark>6.ltrim key 开始index 结束index，截取指定范围的值后再赋值给key</mark>

> ltrim：截取指定索引区间的元素，格式是ltrim list的key 起始索引 结束索引

![](./images/2023-03-26-17-33-41-image.png)

> <mark>7.rpoplpush 源列表 目的列表</mark>

> 移除列表的最后一个元素，并将该元素添加到另一个列表并返回

![](./images/2023-03-26-17-37-44-image.png)

> <mark>8.lset key index value</mark>

![](./images/2023-03-26-17-39-16-image.png)

> <mark>9.linsert key before/after 已有值 插入的新值</mark>

```textile
在list某个已有值的前后再添加具体值
```

![](./images/2023-03-26-17-43-13-image.png)

#### 应用场景

1. 微信公众号订阅的消息

```textile
1 大V作者李永乐老师和CSDN发布了文章分别是 11 和 22



2 阳哥关注了他们两个，只要他们发布了新文章，就会安装进我的List

   lpush likearticle:阳哥id    11 22



3 查看阳哥自己的号订阅的全部文章，类似分页，下面0~10就是一次显示10条

  lrange likearticle:阳哥id 0 9
```

![](./images/2023-03-26-17-49-28-image.png)

![](./images/2023-03-26-17-49-38-image.png)

### Redis哈希（Hash）

#### 常用

![](./images/2023-03-26-17-53-50-image.png)

#### KV模式不变，但V是一个键值对

```java
Map<String,Map<Object,Object>>
```

#### 案例

> <mark>1.hset/hget/hmset/hgetall/hdel</mark>

![](./images/2023-03-26-18-12-14-image.png)

![](./images/2023-03-26-18-15-04-image.png)

![](./images/2023-03-26-18-15-44-image.png)

![](./images/2023-03-26-18-17-47-image.png)

> <mark>2.hlen</mark>

> 获取某个key内的全部数量

![](./images/2023-03-26-20-21-04-image.png)

> <mark>3.hexists key 在key里面的某个值的key</mark>

![](./images/2023-03-26-20-20-26-image.png)

> <mark>4.hkeys/hvals</mark>

![](./images/2023-03-26-20-11-49-image.png)

> <mark>5.hincrby/hincrbyfloat</mark>

![](./images/2023-03-26-20-14-17-image.png)

> <mark>6.hsetnx</mark>

> 不存在赋值，存在了无效

![](./images/2023-03-26-20-15-58-image.png)

#### 应用场景

1. JD购物车早期设计目前不采用，当前中小厂可用

```textile
新增商品 → hset shopcar:uid1024 334488 1

新增商品 → hset shopcar:uid1024 334477 1

增加商品数量 → hincrby shopcar:uid1024 334477 1

商品总数 → hlen shopcar:uid1024

全部选择 → hgetall shopcar:uid1024
```

![](./images/2023-03-26-20-17-28-image.png)

### Redis集合（Set）

#### 常用

![](./images/2023-03-26-20-30-24-image.png)

#### 单值多value，且无重复

#### 案例

> <mark>1.SADD key member [member ...]</mark>

> 添加元素

> <mark>2.SMEMBERS key</mark>

> 遍历集合中的所有元素

> <mark>3.SISMEMBER key member</mark>

> 判断元素是否在结合中

> <mark>4.SREM key member [member ...]</mark>

> 删除元素

> <mark>5.SCARD，获取集合里面的元素个数</mark>

> 获取集合里面的元素个数

![](./images/2023-03-26-20-42-28-image.png)

> <mark>6.SRANDMEMBER key [数字]</mark>

> 从集合中随机**展现设置的数字个数**元素，元素不删除

![](./images/2023-03-26-20-47-00-image.png)

> <mark>7.SPOP key [数字]</mark>

> 从集合中随机弹出一个元素，出一个删一个

![](./images/2023-03-26-20-48-16-image.png)

> <mark>8.SMOVE key1 key2 在key1里已存在的某个值</mark>

> 将key1里已存在的某个值赋给key2

![](./images/2023-03-26-20-50-53-image.png)

> <mark>9.集合运算</mark>

- A、B

```
A abc12
B 123ax
```

- 集合的差集运算**A - B**

> 属于A但是不属于B的元素构成的集合
> 
> SDIFF key [key ...]

![](./images/2023-03-26-21-04-53-image.png)

- 集合的并集运算**A U B**

> 属于A或者属于B的元素合并后的集合
> 
> SUNION key [key ...]

![](./images/2023-03-26-21-08-22-image.png)

- 集合的交集运算 **A ∩ B**

> 属于A同时也属于B的共同拥有的元素构成的集合
> 
> SINTER key [key ...]

![](./images/2023-03-26-21-16-19-image.png)

> SINTERCARD numkeys key [key ...] [LIMIT limit]

```
redis7新命令
它不返回结果集，而只返回结果的技术。
返回由所有给定集合的交集产生的集合基数 
```

> 案例

```shell
127.0.0.1:6379> SINTER set1 set2
1) "1"
2) "2"
3) "a"
127.0.0.1:6379> SINTERCARD 2 set1 set2
(integer) 3
127.0.0.1:6379> SINTERCARD 2 set1 set2 limit 1
(integer) 1
```

#### 应用场景

- 微信抽奖小程序

![](./images/2023-03-26-21-28-02-image.png)

| 1 用户ID，立即参与按钮            | sadd key 用户ID                                                               |
| ------------------------ | --------------------------------------------------------------------------- |
| 2 显示已经有多少人参与了，上图23208人参加 | SCARD key                                                                   |
| 3 抽奖(从set中任意选取N个中奖人)     | SRANDMEMBER key 2    随机抽奖2个人，元素不删除<br/>SPOP key 3             随机抽奖3个人，元素会删除 |

- 微信朋友圈点赞查看同赞朋友

![](./images/2023-03-26-21-33-52-image.png)

| 1 新增点赞                | sadd pub:msgID  点赞用户ID1  点赞用户ID2 |
| --------------------- | -------------------------------- |
| 2 取消点赞                | srem pub:msgID  点赞用户ID           |
| 3 展现所有点赞过的用户          | SMEMBERS  pub:msgID              |
| 4 点赞用户数统计，就是常见的点赞红色数字 | scard  pub:msgID                 |
| 5 判断某个朋友是否对楼主点赞过      | SISMEMBER pub:msgID 用户ID         |

- QQ内推可能认识的人

![](./images/2023-03-26-21-34-39-image.png)

### Redis有序集合ZSet（sorted set）

#### 多说一句

```textile
在set基础上，每个val值前加一个score分数值。
之前set是k1 v1,v2,v3，
现在zset是k1 score1 v1 score2 v2
```

#### 常用

![](./images/2023-03-26-21-42-18-image.png)

#### 案例

> <mark>1.向有序集合中加入一个元素和该元素的分数</mark>

> <mark>2.ZADD key score member [score member ...]</mark>    添加元素

> <mark>3.ZRANGE key start stop [WITHSCORES]</mark>

```
按照元素分数从小到大的顺序

返回索引从start到stop之间的所有元素
```

![](./images/2023-03-26-22-39-51-image.png)

> <mark>4.ZREVRANGE</mark>

![](./images/2023-03-26-22-42-33-image.png)

> <mark>5.ZRANGEBYSCORE key min max [WITHSCORES] [LIMIT offset count]</mark>

![](./images/2023-03-26-22-59-33-image.png)

```
获取指定分数范围的元素
    - withscores
    - ( 不包含
    - limit 作用是返回限制：limit开始下标步 多少步 
```

![](./images/2023-03-26-23-01-31-image.png)

> <mark>6.ZSCORE key member</mark>

> 获取元素的分数

```shell
# zscore：按照值获得对应的分数
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "v1"
2) "60"
3) "v2"
4) "70"
5) "v3"
6) "80"
7) "v4"
8) "90"
127.0.0.1:6379> ZSCORE zset1 60
(nil)
127.0.0.1:6379> ZSCORE zset1 70
(nil)
127.0.0.1:6379> ZSCORE zset1 v1
"60"
127.0.0.1:6379> ZSCORE zset1 v2
"70"
127.0.0.1:6379> ZSCORE zset1 v3
"80"
```

> <mark>7.ZCARD key</mark>

```shell
# zcard ：获取集合中元素个数 
127.0.0.1:6379> ZCARD zset1 
(integer) 4
```

> <mark>8.ZREM key 某个score下对应的value值，作用是删除元素</mark>

```
删除元素，格式是zrem zset的key 项的值，项的值可以是多个

zrem key score某个对应值，可以是多个值
```

![](./images/2023-03-26-23-13-59-image.png)

> <mark>9.ZINCRBY key increment member</mark>

> 增加某个元素的分数

```shell
127.0.0.1:6379> ZINCRBY zset1 10 v5
"110"
127.0.0.1:6379> ZINCRBY zset1 10 v5
"120"
```

> <mark>10.ZCOUNT key min max</mark>

> 获取指定分数范围内的元素个数

```shell
# zcount ：获取分数区间内元素个数，zcount key 开始分数区间 结束分数区间
127.0.0.1:6379> ZCOUNT zset1 60 80
(integer) 3
```

> <mark>11.ZMPOP(redis7新增命令)</mark>

> 从键名列表中的第一个非空排序集中弹出一个或多个元素，他们是成员分数对

![](./images/2023-03-26-23-28-40-image.png)

> <mark>12.ZRANK key values值，作用是获得下标值</mark>

```shell
# zrank： 获取value在zset中的下标位置
127.0.0.1:6379> ZRANGE zset1 0 -1 withscores
1) "v1"
2) "60"
3) "v2"
4) "70"
5) "v3"
6) "80"
7) "v4"
8) "90"
127.0.0.1:6379> ZRANK zset1 v1
(integer) 0
127.0.0.1:6379> ZRANK zset1 v2
(integer) 1
127.0.0.1:6379> ZRANK zset1 v3
(integer) 2
```

> <mark>13.ZREVRANK key values值，作用是逆序获得下标值</mark>

```shell
# 正序、逆序获得下标索引值
127.0.0.1:6379> ZREVRANK zset1 v1
(integer) 4
127.0.0.1:6379> ZRANK zset1 v1
(integer) 0
```

#### 应用场景

- 根据商品销售对商品进行排序显示

```textile
思路：定义商品销售排行榜(sorted set集合)，key为goods:sellsort，分数为商品销售数量。
```

| 商品编号1001的销量是9，商品编号1002的销量是15  | zadd goods:sellsort 9 1001 15 1002   |
|:-----------------------------:| ------------------------------------ |
| 有一个客户又买了2件商品1001，商品编号1001销量加2 | zincrby goods:sellsort 2 1001        |
| 求商品销量前10名                     | ZRANGE goods:sellsort 0 9 withscores |

![](./images/2023-03-26-23-34-06-image.png)

### Redis位图（bitmap）

#### 一句话

> 由0和1状态组成的二进制位的bit数组

#### 看需求

- 用户是否登录过Y、N，比如京东每日签到送京豆

- 电影、广告是否被点击播放过

- 钉钉打卡上下班，签到统计

- 。。。。

#### 是什么？

![](./images/2023-03-27-14-50-19-image.png)

> 说明：用String类型作为底层数据结构实现的一种统计二值状态的数据类型
> 
> 位图本质是数组，它是基于String数据类型的按位的操作。该数组由多个二进制位组成，每个二进制位都对应一个偏移量(我们称之为一个索引)。
> 
> Bitmap支持的最大位数是2^32位，它可以极大的节约存储空间，使用512M内存就可以存储多达42.9亿的字节信息(2^32 = 4294967296)

#### 能干嘛？

> 用于状态统计
> 
>     - Y、N类似AutomicBoolean

#### 基本命令

![](./images/2023-03-27-14-54-09-image.png)

1. setbit

> setbit key offset value

![](./images/2023-03-27-14-57-18-image.png)

> submit 键 偏移量 只能0或者1

> Bitmap的偏移量是从零开始算的

2. getbit

> getbit key offest

3. strlen

```shell
 127.0.0.1:6379> SETBIT k1 0 1
(integer) 0
127.0.0.1:6379> SETBIT k1 7 1
(integer) 0
127.0.0.1:6379> STRLEN k1
(integer) 1
127.0.0.1:6379> SETBIT k1 8 1
(integer) 0
127.0.0.1:6379> STRLEN k1
(integer) 2
```

> 不是字符串长度而是占据几个字节，超过8位后自己按照8位一组一byte再扩容

> 统计字节数占用多少

![](./images/2023-03-27-15-22-50-image.png)

4. bitcount

> 全部键里面含有1的有多少个？

```shell
127.0.0.1:6379> BITCOUNT user:login
(integer) 3
```

5. bitop

```textile
连续2天都签到的用户

加入某个网站或者系统，它的用户有1000W，做个用户id和位置的映射

比如0号位对应用户id：uid-092iok-lkj

比如1号位对应用户id：uid-7388c-xxx

。。。。。。  
```

![](./images/2023-03-27-15-28-45-image.png)

6. setbit和getbit案例说明

> 按照天

![](./images/2023-03-27-15-31-00-image.png)

![](./images/2023-03-27-15-31-09-image.png)

#### 应用场景

- 一年365天，全年天天登录占用多少字节

```shell
127.0.0.1:6379> SETBIT k1 0 1
(integer) 0
127.0.0.1:6379> SETBIT k1 1 1
(integer) 0
127.0.0.1:6379> SETBIT k1 12 1
(integer) 0
127.0.0.1:6379> BITCOUNT k1
(integer) 3
127.0.0.1:6379> SETBIT k1 362 1
(integer) 0
127.0.0.1:6379> STRLEN k1
(integer) 46
```

- 按照年

```textile
按年去存储一个用户的签到情况，365 天只需要 365 / 8 ≈ 46 Byte，1000W 用户量一年也只需要 44 MB 就足够了。

假如是亿级的系统，

每天使用1个1亿位的Bitmap约占12MB的内存（10^8/8/1024/1024），10天的Bitmap的内存开销约为120MB，内存压力不算太高。

此外，在实际使用时，最好对Bitmap设置过期时间，让Redis自动删除不再需要的签到记录以节省内存开销。
```

### Redis基数统计（HyperLogLog）

![](./images/2023-03-27-15-35-41-image.png)

#### 看需求

- 统计某个网站的UV、统计某个文章的UV

- 什么是UV
  
  - Unique Visitor，独立访客，一般理解为客户端IP
  
  - 需要考虑去重

- 用户搜索网站关键词的数量

- 统计用户每天搜索不同词条个数

- 用户搜索网站关键词的数量

- 统计用户每天搜索不同词条个数

#### 是什么？

1. 去重统计功能的基数估计算法就是 HyperLogLog

![](./images/2023-03-27-16-07-42-image.png)

2. 基数

> 是一种数据集，去重复后的真是个数
> 
> 案例Case

![](./images/2023-03-27-16-08-32-image.png)

3. 基数统计

> 用于统计一个集合中不重复的元素个数，就是对集合去重复后剩余元素的计算

4. 一句话

> 去重脱水后的真是数据

#### 基本命令

![](./images/2023-03-27-16-14-43-image.png)

![](./images/2023-03-27-16-14-55-image.png)

```shell
127.0.0.1:6379> PFADD hello1 1 3 4 5 7 9
(integer) 1
127.0.0.1:6379> PFADD hello2 2 4 4 4 6 8 9
(integer) 1
127.0.0.1:6379> PFCOUNT hello2
(integer) 5
127.0.0.1:6379> PFMERGE distResult hello1 hello2 
OK
127.0.0.1:6379> PFCOUNT distResult
(integer) 9
```

#### 应用场景-编码实战案例见高级篇

> 天猫网站首页亿级UV的Redis统计方案

### Redis地理空间（GEO）

#### 简介

移动互联网时代LBS应用越来越多，交友软件中附近的小姐姐、外卖软件中附近的美食店铺、高德地图附近的核酸检查点等等，那这种附近各种形形色色的XXX地址位置选择是如何实现的？

地球上的地理位置是使用二维的经纬度表示，经度范围 (-180, 180]，纬度范围 (-90, 90]，只要我们确定一个点的经纬度就可以名取得他在地球的位置。

例如滴滴打车，最直观的操作就是实时记录更新各个车的位置，

然后当我们要找车时，在数据库中查找距离我们(坐标x0,y0)附近r公里范围内部的车辆

使用如下SQL即可：

```sql
select taxi from position where x0-r < x < x0 + r and y0-r < y < y0+r
```

但是这样会有什么问题呢？

1.查询性能问题，如果并发高，数据量大这种查询是要搞垮数据库的

2.这个查询的是一个矩形访问，而不是以我为中心r公里为半径的圆形访问。

3.精准度的问题，我们知道地球不是平面坐标系，而是一个圆球，这种矩形计算在长距离计算时会有很大误差

#### 原理

核心思想就是将球体转换为平面，区块转换为一点

![](./images/2023-03-27-16-22-09-image.png)

地理知识说明

> [经纬度_百度百科 (baidu.com)](https://baike.baidu.com/item/%E7%BB%8F%E7%BA%AC%E5%BA%A6/1113442?fr=aladdin)

#### Redis在3.2版本以后增加了地理位置的处理

#### 命令

1. GEOADD

> 多个(longitude)、纬度(laitude)、位置名称(member)添加到指定的key中

2. GEOPOS

> 从键里面返回所有给定位置元素的位置（经度和纬度）

3. GEODIST

> 返回两个给定位置之间的距离

4. GEORADIUS

> 以给定的经纬度为中心，返回与中心的距离不超过给定最大距离的所有位置元素

5. GEORADIUSBYMEMBER 跟 GEORADIUS类似

6. GEOHASH

> 返回一个或多个位置元素的 Geohash 表示

#### 命令实操

1. 如何获取某个地址的经纬度

> [拾取坐标系统 (baidu.com)](https://api.map.baidu.com/lbsapi/getpoint/)
> 
> [IP地址查询 - 在线工具 (tool.lu)](https://tool.lu/ip/)

2. GEOADD添加经纬度坐标

![](./images/2023-03-27-17-33-19-image.png)

![](./images/2023-03-27-17-38-25-image.png)

命令如下：

```shell
GEOADD city 116.403963 39.915119 "天安门" 116.403414 39.924091 "故宫" 116.024067 40.362639 "长城"
```

> 中文乱码如何解决
> 
>     -redis-cli --raw

![](./images/2023-03-27-17-41-16-image.png)

3. GEOPOS返回经纬度

![](./images/2023-03-27-17-42-17-image.png)

![](./images/2023-03-27-17-43-52-image.png)

```shell
GEOPOS city 天安门     故宫  长城
```

4. GEOHASH返回坐标的geohash表示

![](./images/2023-03-27-17-45-42-image.png)

```shell
127.0.0.1:6379> GEOHASH city 天安门 故宫 长城
wx4g0f6f2v0
wx4g0gfqsj0
wx4t85y1kt0
```

> geohash算法生成的base31编码值

> 三维变二维变一维

![](./images/2023-03-27-17-47-27-image.png)

5. GEODIST两个位置之间的距离

![](./images/2023-03-27-17-48-29-image.png)

最后一个距离单位参数说明：

- m ：米，默认单位。
- km ：千米。
- mi ：英里。
- ft ：英尺。

```shell
127.0.0.1:6379> GEODIST city 天安门 长城 km
59.3390
127.0.0.1:6379> GEODIST city 天安门 长城 m
59338.9814
```

6. GEORADIUS

georadius 以给定的经纬度为中心， 返回键包含的位置元素当中， 与中心的距离不超过给定最大距离的所有位置元素。

```shell
GEORADIUS city 116.418017 39.914402 10 km withdist withcoord count 10 withhash desc

GEORADIUS city 116.418017 39.914402 10 km withdist withcoord withhash count 10 desc
```

WITHDIST: 在返回位置元素的同时， 将位置元素与中心之间的距离也一并返回。 距离的单位和用户给定的范围单位保持一致。

WITHCOORD: 将位置元素的经度和维度也一并返回。

WITHHASH: 以 52 位有符号整数的形式， 返回位置元素经过原始 geohash 编码的有序集合分值。 这个选项主要用于底层应用或者调试， 实际中的作用并不大

COUNT 限定返回的记录数。

当前位置(116.418017 39.914402),阳哥在北京王府井

![](./images/2023-03-27-17-52-41-image.png)

> 以半径为中心，查找附近的xxx

7. GEORADIUSBYMEMBER

> 找出位于指定范围内的元素，中心点是由给定的位置元素决定

![](./images/2023-03-27-17-56-00-image.png)

#### 应用场景-编码实战案例见高级篇

- 美团地图位置附近的酒店推送

- 高德地图附近的核酸检查点

### Redis流（Stream）

#### 是什么？

1. redis5.0之前痛点

> redis消息队列的2种方案

- List实现消息队列

按照插入顺序排序，你可以添加一个元素到列表的头部（左边）或者尾部（右边）。 

所以常用来做异步队列使用，将需要延后处理的任务结构体序列化成字符串塞进 Redis 的列表，另一个线程从这个列表中轮询数据进行处理。

![](./images/2023-03-28-17-04-27-image.png)

`LPUSH、RPOP 左进右出    RPUSH、LPOP 右进左出`

![](./images/2023-03-28-17-05-53-image.png)

> List实现方式其实就是点对点的模式

- (Pub/Sub)

![](./images/2023-03-28-17-07-02-image.png)

Redis 发布订阅 (pub/sub) 有个缺点就是消息无法持久化，如果出现网络断开、Redis 宕机等，消息就会被丢弃。而且也没有 Ack 机制来保证数据的可靠性，假设一个消费者都没有，那消息就直接被丢弃了。

2. Redis5.0版本新增了一个更强大的数据结构----Stream

3. 一句话

> Redis版的MQ消息中间件+阻塞队列

#### 能干嘛？

实现消息队列，它支持消息的持久化、支持自动生成全局唯一ID、支持ack确认消息的模式、支持消费组模式等，让消息队列更加稳定和可靠

#### 底层结构和原理说明

> Stream结构

![](./images/2023-03-28-17-10-30-image.png)

`一个消息链表，将所有加入的消息都串起来，每个消息都有一个唯一的 ID 和对应的内容`

| 1   | Message Content   | 消息内容                                                                                                                                                                                                                              |
| --- | ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2   | Consumer group    | 消费组，通过XGROUP CREATE 命令创建，同一个消费组可以有多个消费者                                                                                                                                                                                           |
| 3   | Last_delivered_id | 游标，每个消费组会有个游标 last_delivered_id，任意一个消费者读取了消息都会使游标 last_delivered_id 往前移动。                                                                                                                                                         |
| 4   | Consumer          | 消费者，消费组中的消费者                                                                                                                                                                                                                      |
| 5   | Pending_ids       | 消费者会有一个状态变量，用于记录被当前消费已读取但未ack的消息Id，如果客户端没有ack，这个变量里面的消息ID会越来越多，一旦某个消息被ack它就开始减少。这个pending_ids变量在Redis官方被称之为 PEL(Pending Entries List)，记录了当前已经被客户端读取的消息，但是还没有 ack (Acknowledge character：确认字符），它用来确保客户端至少消费了消息一次，而不会在网络传输的中途丢失了没处理 |

#### 基本命令理论简介

1. 队列相关指令

![](./images/2023-03-28-17-12-02-image.png)

2. 消费组相关指令

![](./images/2023-03-28-17-12-35-image.png)

3. 四个特殊符号

| `- +` | 最小和最大可能出现的id                                   |
| ----- | ---------------------------------------------- |
| `$`   | `$`表示只消费新的消息，当前流中最大的id，可用于将要到来的消息              |
| `>`   | 用于XREADGROUP命令，表示迄今还没有发送给组中使用者的信息，会更新消费者组的最后ID |
| `*`   | 用于XADD命令中，让系统自动生成id                            |

#### 基本命令代码实操

> `Redis流实例演示`

##### 队列相关指令

1. XADD

> 添加消息到队列末尾

XADD 用于向Stream 队列中添加消息，如果指定的Stream 队列不存在，则该命令执行时会新建一个Stream 队列

//* 号表示服务器自动生成 MessageID(类似mysql里面主键auto_increment)，后面顺序跟着一堆 业务key/value

![](./images/2023-03-28-17-22-32-image.png)

| 信息条目指的是序列号，在相同的毫秒下序列号从0开始递增，序列号是64位长度，理论上在同一毫秒内生成的数据量无法到达这个级别，因此不用担心序列号会不够用。millisecondsTime指的是Redis节点服务器的本地时间，如果存在当前的毫秒时间戳比以前已经存在的数据的时间戳小的话（本地时间钟后跳），那么系统将会采用以前相同的毫秒创建新的ID，也即redis 在增加信息条目时会检查当前 id 与上一条目的 id， 自动纠正错误的情况，一定要保证后面的 id 比前面大，一个流中信息条目的ID必须是单调增的，这是流的基础。 |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 客户端显示传入规则:<br><br>Redis对于ID有强制要求，格式必须是时间戳-自增Id这样的方式，且后续ID不能小于前一个ID                                                                                                                                                                                                    |
| Stream的消息内容，也就是图中的Message Content它的结构类似Hash结构，以key-value的形式存在。                                                                                                                                                                                                        |

- 消息ID必须要比上个ID大

![](./images/2023-03-28-17-30-56-image.png)

- 默认用星号表示自动生成规矩

- `*`
  
  - 用于XADD命令中，让系统自动生成id
2. XRANGE

![](./images/2023-03-28-17-33-19-image.png)

- 用于获取消息列表（可以指定范围），忽略删除的消息

- start表示开始值，`-`代表最小值

- end表示结束值，`+`代表最大值

- count 表示最多获取多少个值
3. XREVRANGE

![](./images/2023-03-28-17-39-54-image.png)

> 与XRANGE的区别在于，获取消息队列元素的方向是相反的，end在前，start在后

4. XDEL

![](./images/2023-03-28-17-46-03-image.png)

5. XLEN

```shell
127.0.0.1:6379> XRANGE mystream - +
1) 1) "1679995644924-0"
   2) 1) "id"
      2) "11"
      3) "cname"
      4) "zs"
2) 1) "1679995687555-0"
   2) 1) "k1"
      2) "v1"
      3) "k2"
      4) "v2"
      5) "k3"
      6) "v3"
127.0.0.1:6379> XLEN mystream
(integer) 2
```

> 用于获取Stream队列的消息的长度

6. XTRIM
- 用于对Stream的长度进行截取，如超过长度会进行截取

- MAXLEN
  
  - 允许的最大长度，对流进行修剪限制长度

![](./images/2023-03-28-17-54-34-image.png)

- XMIN
  
  - 允许的最小id，从某个id值开始比该id值小的将会被抛弃

![](./images/2023-03-28-17-59-29-image.png)

7. XREAD
- 用于获取消息（阻塞/非阻塞），只会返回大于指定ID的消息

![](./images/2023-03-28-18-00-54-image.png)

- 非阻塞

| $代表特殊ID，表示以当前Stream已经存储的最大的ID作为最后一个ID，当前Stream中不存在大于当前最大ID的消息，因此此时返回nil       |
| ----------------------------------------------------------------------------- |
| 0-0代表从最小的ID开始获取Stream中的消息，当不指定count，将会返回Stream中的所有消息，注意也可以使用0（00/000也都是可以的……） |

![](./images/2023-03-28-18-13-34-image.png)

- 阻塞

`请redis-cli启动第2个客户端连接上来`

![](./images/2023-03-28-18-16-25-image.png)

- 小总结（类似java里面的阻塞队列）

> `Stream的基础方法，使用xadd存入消息和xread循环阻塞读取消息的方式可以实现简易版的消息队列，交互流程如下`

![](./images/2023-03-28-18-17-15-image.png)

`对比List结构`

![](./images/2023-03-28-18-17-39-image.png)

##### 消费组相关指令

1. XGROUP CREATE

> `用于创建消费者组`

![](./images/2023-03-28-18-22-20-image.png)

| $表示从Stream尾部开始消费                                     |
|:----------------------------------------------------:|
| 0表示从Stream头部开始消费                                     |
| 创建消费者组的时候必须指定 ID, ID 为 0 表示从头开始消费，为 $ 表示只消费新的消息，队尾新来 |

2. XREADGROUP GROUP
- ">"，表示从第一条尚未被消费的消息开始读取

- 消费组groupA内的消费者consumer1从mystream消息队列中读取所有消息

![](./images/2023-03-28-18-32-07-image.png)

- 但是，不同消费组的消费者可以消费同一条消息

![](./images/2023-03-28-18-32-56-image.png)

- 消费组的目的？

> 让组内的多个消费者共同分担读取消息，所以，我们通常会让每个消费者读取部分消息，从而实现消息读取负载在多个消费者间是均衡分布的

![](./images/2023-03-28-18-33-35-image.png)

3. 重点问题

| 1问题 | 基于 Stream 实现的消息队列，如何保证消费者在发生故障或宕机再次重启后，仍然可以读取未处理完的消息？                                        |
| --- | -------------------------------------------------------------------------------------------- |
| 2   | Streams 会自动使用内部队列（也称为 PENDING List）留存消费组里每个消费者读取的消息保底措施，直到消费者使用 XACK 命令通知 Streams“消息已经处理完成”。 |
| 3   | 消费确认增加了消息的可靠性，一般在业务处理完成之后，需要执行 XACK 命令确认消息已经被消费完成                                            |

![](./images/2023-03-28-18-34-40-image.png)

4. XPENDING
- 查询每个消费组内所有消费者【已读、但未确认】的消息

![](./images/2023-03-28-18-36-02-image.png)

- 查看某个消费者具体读了哪些数据

![](./images/2023-03-28-18-36-43-image.png)

> 下面抓图所示：consumer2已读取的消息的 ID是1659430293537-0
> 
> 一旦消息1659430293537-0被consumer2处理了consumer2就可以使用 XACK 命令通知 Streams，然后这条消息就会被删除

![](./images/2023-03-28-18-37-16-image.png)

5. XACK

> 向消息队列确认消息处理已完成

![](./images/2023-03-28-18-41-34-image.png)

![](./images/2023-03-28-18-41-43-image.png)

6. XINFO用于打印Stream\Consumer\Group的详细信息

![](./images/2023-03-28-18-42-44-image.png)

#### 使用建议

1. Stream还是不能100%等价于Kafka、RabbitMQ、SocketMQ来使用的    ，生产案例少，慎用

2. 仅仅代表本人愚见，不权威

### Redis位域（bitfield）

#### 了解即可

#### 是什么？

> 官网：[BITFIELD | Redis](https://redis.io/commands/bitfield/)
> 
> 中文文档：[BITFIELD命令 -- Redis中国用户组（CRUG）](http://www.redis.cn/commands/bitfield.html)

![](./images/2023-03-28-18-48-54-image.png)

#### 能干嘛？

![](./images/2023-03-28-18-59-31-image.png)

> `   hello 等价于 0110100001100101011011000110110001101111`

1. 位域修改

2. 溢出控制

#### 一句话

> 将一个Redis字符串看作是`一个由二进制组成的数组`
> 
> 并能对变成位宽和任意没有字节对齐的指定整形位域进行寻址和修改

#### 命令基本语法

![](./images/2023-03-28-18-49-35-image.png)

```shell
BITFIELD key [GET type offset] [SET type offset value] [INCRBY type offset increment] [OVERFLOW WRAP|SAT|FAIL]
```

#### 案例

##### Ascii码表

> Ascii码表：https://ascii.org.cn/

##### 基本命令代码实操

1. BITFIELD key [GET type offset]

![](./images/2023-03-28-19-06-51-image.png)

![](./images/2023-03-28-23-56-01-image.png)

![](./images/2023-03-28-23-56-13-image.png)

> hello 等价于 0110100001100101011011000110110001101111

![](./images/2023-03-28-23-56-31-image.png)

2. BITFIELD key [SET type offset value]

![](./images/2023-03-28-23-57-17-image.png)

![](./images/2023-03-28-23-57-27-image.png)

3. BITFIELD key [INCRBY type offset increment]

![](./images/2023-03-28-23-58-20-image.png)

- 默认情况下，INCRBY使用 `WARP`参数
4. 溢出控制OVERFLOW [WARP|SAT|FALL]
- WARP：使用回绕（warp around）方法处理有符号整数和无符号整数的溢出情况

![](./images/2023-03-29-00-00-42-image.png)

- SAT：使用饱和计算（saturation arithmetic）方法处理溢出，下溢计算的结果为最小的整数值，而上溢计算的结果为最大的整数值

![](./images/2023-03-29-00-02-23-image.png)

- FALL：命令将拒绝执行那些会导致上溢或者下溢情况出现的计算，并向用户返回空值表示未被执行

![](./images/2023-03-29-00-03-38-image.png)

### 落地案例实战-高级篇再见

![](./images/2023-03-29-00-04-29-image.png)
