---
# 当前页面内容标题
title: 十五、Synchronized与锁升级
# 分类
category:
  - JUC
  - java
# 标签
tag: 
  - java
  - juc
  - 并发编程
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 十五、Synchronized与锁升级

### 1、Synchronized 锁优化的背景

用锁能够实现数据的安全性，但是会带来性能下降。 无锁能够基于线程并行提升程序性能，但是会带来安全性下降。

![image20210929210812273](./images/image-20210929210812273.png)

synchronized锁：由对象头中的Mark Word根据锁标志位的不同而被复用及锁升级策略

### 2、Synchronized的性能变化

java5以前，只有Synchronized，这个是操作系统级别的重量级操作，重量级锁，假如锁的竞争比较激烈的话，性能下降

#### 1、Java5之前，用户态和内核态之间的切换

![image20210929210932836](./images/image-20210929210932836.png)

 java的线程是映射到操作系统原生线程之上的，如果要阻塞或唤醒一个线程就需要操作系统介入，需要在户态与核心态之间切换，这种切换会消耗大量的系统资源，因为用户态与内核态都有各自专用的内存空间，专用的寄存器等，用户态切换至内核态需要传递给许多变量、参数给内核，内核也需要保护好用户态在切换时的一些寄存器值、变量等，以便内核态调用结束后切换回用户态继续工作。

 在Java早期版本中，synchronized属于重量级锁，效率低下，因为监视器锁（monitor）是依赖于底层的操作系统的Mutex Lock来实现的，挂起线程和恢复线程都需要转入内核态去完成，阻塞或唤醒一个Java线程需要操作系统切换CPU状态来完成，这种状态切换需要耗费处理器时间，如果同步代码块中内容过于简单，这种切换的时间可能比用户代码执行的时间还长”，时间成本相对较高，这也是为什么早期的synchronized效率低的原因 Java 6之后，为了减少获得锁和释放锁所带来的性能消耗，引入了轻量级锁和偏向锁

#### 2、为什么每一个对象都可以成为一个锁？？？？

markOop.hpp

![image20210929211015422](./images/image-20210929211015422.png)

 Monitor可以理解为一种同步工具，也可理解为一种同步机制，常常被描述为一个Java对象。Java对象是天生的Monitor，每一个Java对象都有成为Monitor的潜质，因为在Java的设计中 ，每一个Java对象自打娘胎里出来就带了一把看不见的锁，它叫做内部锁或者Monitor锁。

![image20210929211037543](./images/image-20210929211037543.png)

Monitor的本质是依赖于底层操作系统的Mutex Lock实现，操作系统实现线程之间的切换需要从用户态到内核态的转换，成本非常高。

Monitor(监视器锁)

![image20210929211107964](./images/image-20210929211107964.png)

Mutex Lock  Monitor是在jvm底层实现的，底层代码是c++。本质是依赖于底层操作系统的Mutex Lock实现，操作系统实现线程之间的切换需要从用户态到内核态的转换，状态转换需要耗费很多的处理器时间成本非常高。所以synchronized是Java语言中的一个重量级操作。

Monitor与java对象以及线程是如何关联 ？ 1.如果一个java对象被某个线程锁住，则该java对象的Mark Word字段中LockWord指向monitor的起始地址 2.Monitor的Owner字段会存放拥有相关联对象锁的线程id

Mutex Lock 的切换需要从用户态转换到核心态中，因此状态转换需要耗费很多的处理器时间。

#### 3、java6开始，优化Synchronized

Java 6之后，为了减少获得锁和释放锁所带来的性能消耗，引入了轻量级锁和偏向锁

需要有个逐步升级的过程，别一开始就捅到重量级锁

### 3、Synchronized锁种类及升级步骤

#### 1、多线程访问情况，3种

- 只有一个线程来访问，有且唯一Only One
- 有2个线程A、B来交替访问
- 竞争激烈，多个线程来访问

#### 2、升级流程

synchronized用的锁是存在Java对象头里的Mark Word中锁升级功能主要依赖MarkWord中锁标志位和释放偏向锁标志位

![image20210929211353978](./images/image-20210929211353978.png)

#### 3、无锁

```java
public class MyObject
{
    public static void main(String[] args)
    {
        Object o = new Object();

        System.out.println("10进制hash码："+o.hashCode());
        System.out.println("16进制hash码："+Integer.toHexString(o.hashCode()));
        System.out.println("2进制hash码："+Integer.toBinaryString(o.hashCode()));

        System.out.println( ClassLayout.parseInstance(o).toPrintable());
    }
}
```

![image20210929211429008](./images/image-20210929211429008.png)

![image20210929211444490](./images/image-20210929211444490.png)

#### 4、偏向锁

- 当一段同步代码一直被同一个线程多次访问，由于只有一个线程那么该线程在后续访问时便会自动获得锁
- 同一个老顾客来访，直接老规矩行方便

> Hotspot 的作者经过研究发现，大多数情况下：
> 
> 多线程的情况下，锁不仅不存在多线程竞争，还存在锁由同一线程多次获得的情况，
> 
> 偏向锁就是在这种情况下出现的，它的出现是为了解决只有在一个线程执行同步时提高性能。

![image20210929211553962](./images/image-20210929211553962.png)

通过CAS方式修改markword中的线程ID

##### 1、偏向锁的持有

理论落地： 在实际应用运行过程中发现，“锁总是同一个线程持有，很少发生竞争”，也就是说锁总是被第一个占用他的线程拥有，这个线程就是锁的偏向线程。

 那么只需要在锁第一次被拥有的时候，记录下偏向线程ID。这样偏向线程就一直持有着锁(后续这个线程进入和退出这段加了同步锁的代码块时，不需要再次加锁和释放锁。而是直接比较对象头里面是否存储了指向当前线程的偏向锁)。 如果相等表示偏向锁是偏向于当前线程的，就不需要再尝试获得锁了，直到竞争发生才释放锁。以后每次同步，检查锁的偏向线程ID与当前线程ID是否一致，如果一致直接进入同步。无需每次加锁解锁都去CAS更新对象头。如果自始至终使用锁的线程只有一个，很明显偏向锁几乎没有额外开销，性能极高。

 假如不一致意味着发生了竞争，锁已经不是总是偏向于同一个线程了，这时候可能需要升级变为轻量级锁，才能保证线程间公平竞争锁。偏向锁只有遇到其他线程尝试竞争偏向锁时，持有偏向锁的线程才会释放锁，线程是不会主动释放偏向锁的。

技术实现： 一个synchronized方法被一个线程抢到了锁时，那这个方法所在的对象就会在其所在的Mark Word中将偏向锁修改状态位，同时还 会有占用前54位来存储线程指针作为标识。若该线程再次访问同一个synchronized方法时，该线程只需去对象头的Mark Word 中去判断一下是否有偏向锁指向本身的ID，无需再进入 Monitor 去竞争对象了。

##### 2、细化案例Account对象举例说明

偏向锁的操作不用直接捅到操作系统，不涉及用户到内核转换，不必要直接升级为最高级，我们以一个account对象的“对象头”为例，

![image20210929211754329](./images/image-20210929211754329.png)

 假如有一个线程执行到synchronized代码块的时候，JVM使用CAS操作把线程指针ID记录到Mark Word当中，并修改标偏向标示，标示当前线程就获得该锁。锁对象变成偏向锁（通过CAS修改对象头里的锁标志位），字面意思是“偏向于第一个获得它的线程”的锁。执行完同步代码块后，线程并不会主动释放偏向锁。

![image20210929211803269](./images/image-20210929211803269.png)

 这时线程获得了锁，可以执行同步代码块。当该线程第二次到达同步代码块时会判断此时持有锁的线程是否还是自己（持有锁的线程ID也在对象头里），JVM通过account对象的Mark Word判断：当前线程ID还在，说明还持有着这个对象的锁，就可以继续进入临界区工作。由于之前没有释放锁，这里也就不需要重新加锁。 如果自始至终使用锁的线程只有一个，很明显偏向锁几乎没有额外开销，性能极高。

 **结论**：JVM不用和操作系统协商设置Mutex(争取内核)，它只需要记录下线程ID就标示自己获得了当前锁，不用操作系统接入。 上述就是偏向锁：在没有其他线程竞争的时候，一直偏向偏心当前线程，当前线程可以一直执行。

##### 3、偏向锁JVM命令

```sh
java -XX:+PrintFlagsInitial |grep BiasedLock*
```

![image20210929211909262](./images/image-20210929211909262.png)

![image20210929211918843](./images/image-20210929211918843.png)

```
* 实际上偏向锁在JDK1.6之后是默认开启的，但是启动时间有延迟，
* 所以需要添加参数-XX:BiasedLockingStartupDelay=0，让其在程序启动时立刻启动。
*
* 开启偏向锁：
* -XX:+UseBiasedLocking -XX:BiasedLockingStartupDelay=0
*
* 关闭偏向锁：关闭之后程序默认会直接进入------------------------------------------>>>>>>>>   轻量级锁状态。
* -XX:-UseBiasedLocking
```

##### 4、Code演示

```java
public class MyObject
{
    public static void main(String[] args)
    {
        Object o = new Object();

        new Thread(() -> {
            synchronized (o){
                System.out.println(ClassLayout.parseInstance(o).toPrintable());
            }
        },"t1").start();
    }
}
```

![image20210929212100730](./images/image-20210929212100730.png)

一切默认，演示无效果,因为参数系统默认开启

![image20210929212916026](./images/image-20210929212916026.png)

```sh
-XX:+UseBiasedLocking                       # 开启偏向锁(默认)           
-XX:-UseBiasedLocking                       # 关闭偏向锁
-XX:BiasedLockingStartupDelay=0             # 关闭延迟(演示偏向锁时需要开启)

#参数说明：
#偏向锁在JDK1.6以上默认开启，开启后程序启动几秒后才会被激活，可以使用JVM参数来关闭延迟 -XX:BiasedLockingStartupDelay=0

#如果确定锁通常处于竞争状态则可通过JVM参数 -XX:-UseBiasedLocking 关闭偏向锁，那么默认会进入轻量级锁
```

关闭延时参数，启用该功能

```sh
-XX:BiasedLockingStartupDelay=0
```

![image20210929212953054](./images/image-20210929212953054.png)

##### 5、偏向锁的撤销

当有另外线程逐步来竞争锁的时候，就不能再使用偏向锁了，要升级为轻量级锁

竞争线程尝试CAS更新对象头失败，会等待到全局安全点（此时不会执行任何代码）撤销偏向锁。

> 偏向锁使用一种等到竞争出现才释放锁的机制，只有当其他线程竞争锁时，持有偏向锁的原来线程才会被撤销。 撤销需要等待全局安全点(该时间点上没有字节码正在执行)，同时检查持有偏向锁的线程是否还在执行：
> 
> ① 第一个线程正在执行synchronized方法(处于同步块)，它还没有执行完，其它线程来抢夺，该偏向锁会被取消掉并出现锁升级。 此时轻量级锁由原持有偏向锁的线程持有，继续执行其同步代码，而正在竞争的线程会进入自旋等待获得该轻量级锁。 ② 第一个线程执行完成synchronized方法(退出同步块)，则将对象头设置成无锁状态并撤销偏向锁，重新偏向 。

![img](./images/image-20210929213113133.png)

![image20210929213128855](./images/image-20210929213128855.png)

#### 5、轻锁

有线程来参与锁的竞争，但是获取锁的冲突时间极短

本质就是自旋锁

##### 1、轻量级锁的获取

轻量级锁是为了在线程近乎交替执行同步块时提高性能。 主要目的： 在没有多线程竞争的前提下，通过CAS减少重量级锁使用操作系统互斥量产生的性能消耗，说白了先自旋再阻塞。 升级时机： 当关闭偏向锁功能或多线程竞争偏向锁会导致偏向锁升级为轻量级锁

假如线程A已经拿到锁，这时线程B又来抢该对象的锁，由于该对象的锁已经被线程A拿到，当前该锁已是偏向锁了。 而线程B在争抢时发现对象头Mark Word中的线程ID不是线程B自己的线程ID(而是线程A)，那线程B就会进行CAS操作希望能获得锁。 此时线程B操作中有两种情况： 如果锁获取成功，直接替换Mark Word中的线程ID为B自己的ID(A → B)，重新偏向于其他线程(即将偏向锁交给其他线程，相当于当前线程"被"释放了锁)，该锁会保持偏向锁状态，A线程Over，B线程上位；

![image20210929213253052](./images/image-20210929213253052.png)

 如果锁获取失败，则偏向锁升级为轻量级锁，此时轻量级锁由原持有偏向锁的线程持有，继续执行其同步代码，而正在竞争的线程B会进入自旋等待获得该轻量级锁。

![image20210929213304246](./images/image-20210929213304246.png)

##### 2、Code演示

![image20210929213324762](./images/image-20210929213324762.png)

如果关闭偏向锁，就可以直接进入轻量级锁

```sh
-XX:-UseBiasedLocking
```

##### 3、自旋达到一定次数和程度

java6之前

默认启用，默认情况下自旋的次数是 10 次 -XX:PreBlockSpin=10来修改，或者自旋线程数超过cpu核数一半

Java6之后

自适应，自适应意味着自旋的次数不是固定不变的

而是根据：同一个锁上一次自旋的时间，拥有锁线程的状态来决定。

##### 4、轻量锁与偏向锁的区别和不同

争夺轻量级锁失败时，自旋尝试抢占锁

轻量级锁每次退出同步块都需要释放锁，而偏向锁是在竞争发生时才释放锁

#### 6、重锁

有大量的线程参与锁的竞争，冲突性很高

![image20210929213558173](./images/image-20210929213558173.png)

![image20210929213604489](./images/image-20210929213604489.png)

#### 7、各种锁优缺点、synchronized锁升级和实现原理

![image20210929213623068](./images/image-20210929213623068.png)

synchronized锁升级过程总结：一句话，就是先自旋，不行再阻塞。 实际上是把之前的悲观锁(重量级锁)变成在一定条件下使用偏向锁以及使用轻量级(自旋锁CAS)的形式

 synchronized在修饰方法和代码块在字节码上实现方式有很大差异，但是内部实现还是基于对象头的MarkWord来实现的。 JDK1.6之前synchronized使用的是重量级锁，JDK1.6之后进行了优化，拥有了无锁->偏向锁->轻量级锁->重量级锁的升级过程，而不是无论什么情况都使用重量级锁。

 偏向锁:适用于单线程适用的情况，在不存在锁竞争的时候进入同步方法/代码块则使用偏向锁。 轻量级锁：适用于竞争较不激烈的情况(这和乐观锁的使用范围类似)， 存在竞争时升级为轻量级锁，轻量级锁采用的是自旋锁，如果同步方法/代码块执行时间很短的话，采用轻量级锁虽然会占用cpu资源但是相对比使用重量级锁还是更高效。  重量级锁：适用于竞争激烈的情况，如果同步方法/代码块执行时间很长，那么使用轻量级锁自旋带来的性能消耗就比使用重量级锁更严重，这时候就需要升级为重量级锁。

### 4、JIT编译器对锁的优化

Just In Time Compiler，一般翻译为即时编译器

#### 1、锁消除

```java
/**
 * 锁消除
 * 从JIT角度看相当于无视它，synchronized (o)不存在了,这个锁对象并没有被共用扩散到其它线程使用，
 * 极端的说就是根本没有加这个锁对象的底层机器码，消除了锁的使用
 */
public class LockClearUPDemo
{
    static Object objectLock = new Object();//正常的

    public void m1()
    {
        //锁消除,JIT会无视它，synchronized(对象锁)不存在了。不正常的
        Object o = new Object();

        synchronized (o)
        {
            System.out.println("-----hello LockClearUPDemo"+"\t"+o.hashCode()+"\t"+objectLock.hashCode());
        }
    }

    public static void main(String[] args)
    {
        LockClearUPDemo demo = new LockClearUPDemo();

        for (int i = 1; i <=10; i++) {
            new Thread(() -> {
                demo.m1();
            },String.valueOf(i)).start();
        }
    }
}
```

#### 2、锁粗化

```java
/**
 * 锁粗化
 * 假如方法中首尾相接，前后相邻的都是同一个锁对象，那JIT编译器就会把这几个synchronized块合并成一个大块，
 * 加粗加大范围，一次申请锁使用即可，避免次次的申请和释放锁，提升了性能
 */
public class LockBigDemo
{
    static Object objectLock = new Object();


    public static void main(String[] args)
    {
        new Thread(() -> {
            synchronized (objectLock) {
                System.out.println("11111");
            }
            synchronized (objectLock) {
                System.out.println("22222");
            }
            synchronized (objectLock) {
                System.out.println("33333");
            }
        },"a").start();

        new Thread(() -> {
            synchronized (objectLock) {
                System.out.println("44444");
            }
            synchronized (objectLock) {
                System.out.println("55555");
            }
            synchronized (objectLock) {
                System.out.println("66666");
            }
        },"b").start();

    }
}
```
