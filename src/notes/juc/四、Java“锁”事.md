---
# 当前页面内容标题
title: 四、Java“锁”事
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

## 四、Java“锁”事

### 1、Lock

![image](./images/1614161410285-50f57395-d195-4f93-bed4-7b7dffaf078b.png)

```java
// Lock implementations provide more extensive locking operations than can be obtained using synchronized methods and statements. They allow more flexible structuring, may have quite different properties, and may support multiple associated Condition objects.

// 锁实现提供了比使用同步方法和语句可以获得的更广泛的锁操作。它们允许更灵活的结构，可能具有非常不同的属性，并且可能支持多个关联的条件对象
```

### 2、synchronized与Lock的区别

1. 首先synchronized是java内置关键字，在jvm层面，Lock是个java类；
2. synchronized无法判断是否获取锁的状态，Lock可以判断是否获取到锁；
3. synchronized会自动释放锁(a 线程执行完同步代码会释放锁 ；b 线程执行过程中发生异常会释放锁)，Lock需在finally中手工释放锁（unlock()方法释放锁），否则容易造成线程死锁；
4. 用synchronized关键字的两个线程1和线程2，如果当前线程1获得锁，线程2线程等待。如果线程1阻塞，线程2则会一直等待下去，而Lock锁就不一定会等待下去，如果尝试获取不到锁，线程可以不用一直等待就结束了；
5. synchronized的锁可重入、不可中断、非公平，而Lock锁可重入、可判断、可公平（两者皆可）
6. Lock锁适合大量同步的代码的同步问题，synchronized锁适合代码少量的同步问题。

### 3、synchronized

1. 修饰实例方法，作用于当前实例，进入同步代码前需要先获取实例的锁
2. 修饰静态方法，作用于类的Class对象，进入修饰的静态方法前需要先获取类的Class对象的锁
3. 修饰代码块，需要指定加锁对象(记做lockobj)，在进入同步代码块前需要先获取lockobj的锁

#### 1、synchronized作用于实例对象

所谓实例对象锁就是用synchronized修饰实例对象的实例方法，注意是**实例方法**，不是**静态方法**，如：

```java
public class Demo2 {
    int num = 0;
    public synchronized void add() {
        num++;
    }
    public static class T extends Thread {
        private Demo2 demo2;
        public T(Demo2 demo2) {
            this.demo2 = demo2;
        }
        @Override
        public void run() {
            for (int i = 0; i < 10000; i++) {
                this.demo2.add();
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Demo2 demo2 = new Demo2();
        T t1 = new T(demo2);
        T t2 = new T(demo2);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(demo2.num);
    }
}
```

main()方法中创建了一个对象demo2和2个线程t1、t2，t1、t2中调用demo2的add()方法10000次，add()方法中执行了num++，num++实际上是分3步，获取num，然后将num+1，然后将结果赋值给num，如果t2在t1读取num和num+1之间获取了num的值，那么t1和t2会读取到同样的值，然后执行num++，两次操作之后num是相同的值，最终和期望的结果不一致，造成了线程安全失败，因此我们对add方法加了synchronized来保证线程安全。

注意：m1()方法是实例方法，两个线程操作m1()时，需要先获取demo2的锁，没有获取到锁的，将等待，直到其他线程释放锁为止。

synchronize作用于实例方法需要注意：

1. 实例方法上加synchronized，线程安全的前提是，多个线程操作的是**同一个实例**，如果多个线程作用于不同的实例，那么线程安全是无法保证的
2. 同一个实例的多个实例方法上有synchronized，这些方法都是互斥的，同一时间只允许一个线程操作**同一个实例的其中的一个synchronized方法**

#### 2、synchronized作用于静态方法

当synchronized作用于静态方法时，锁的对象就是当前类的Class对象。如：

```java
public class Demo3 {
    static int num = 0;
    public static synchronized void m1() {
        for (int i = 0; i < 10000; i++) {
            num++;
        }
    }
    public static class T1 extends Thread {
        @Override
        public void run() {
            Demo3.m1();
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T1 t1 = new T1();
        T1 t2 = new T1();
        T1 t3 = new T1();
        t1.start();
        t2.start();
        t3.start();
        //等待3个线程结束打印num
        t1.join();
        t2.join();
        t3.join();
        System.out.println(Demo3.num);
        /**
         * 打印结果：
         * 30000
         */
    }
}
```

上面代码打印30000，和期望结果一致。m1()方法是静态方法，有synchronized修饰，锁用于与Demo3.class对象，和下面的写法类似：

```java
public static void m1() {
    synchronized (Demo4.class) {
        for (int i = 0; i < 10000; i++) {
            num++;
        }
    }
}
```

#### 3、synchronized同步代码块

除了使用关键字修饰实例方法和静态方法外，还可以使用同步代码块，在某些情况下，我们编写的方法体可能比较大，同时存在一些比较耗时的操作，而需要同步的代码又只有一小部分，如果直接对整个方法进行同步操作，可能会得不偿失，此时我们可以使用同步代码块的方式对需要同步的代码进行包裹，这样就无需对整个方法进行同步操作了，同步代码块的使用示例如下：

```java
public class Demo5 implements Runnable {
    static Demo5 instance = new Demo5();
    static int i = 0;
    @Override
    public void run() {
        //省略其他耗时操作....
        //使用同步代码块对变量i进行同步操作,锁对象为instance
        synchronized (instance) {
            for (int j = 0; j < 10000; j++) {
                i++;
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        Thread t1 = new Thread(instance);
        Thread t2 = new Thread(instance);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }
}
```

从代码看出，将synchronized作用于一个给定的实例对象instance，即当前实例对象就是锁对象，每次当线程进入synchronized包裹的代码块时就会要求当前线程持有instance实例对象锁，如果当前有其他线程正持有该对象锁，那么新到的线程就必须等待，这样也就保证了每次只有一个线程执行i++;操作。当然除了instance作为对象外，我们还可以使用this对象(代表当前实例)或者当前类的class对象作为锁，如下代码：

```java
//this,当前实例对象锁
synchronized(this){
    for(int j=0;j<1000000;j++){
        i++;
    }
}
//class对象锁
synchronized(Demo5.class){
    for(int j=0;j<1000000;j++){
        i++;
    }
}
```

分析代码是否互斥的方法，先找出synchronized作用的对象是谁，如果多个线程操作的方法中synchronized作用的锁对象一样，那么这些线程同时异步执行这些方法就是互斥的。如下代码:

```java
public class Demo6 {
    //作用于当前类的实例对象
    public synchronized void m1() {
    }
    //作用于当前类的实例对象
    public synchronized void m2() {
    }
    //作用于当前类的实例对象
    public void m3() {
        synchronized (this) {
        }
    }
    //作用于当前类Class对象
    public static synchronized void m4() {
    }
    //作用于当前类Class对象
    public static void m5() {
        synchronized (Demo6.class) {
        }
    }
    public static class T extends Thread{
        Demo6 demo6;
        public T(Demo6 demo6) {
            this.demo6 = demo6;
        }
        @Override
        public void run() {
            super.run();
        }
    }
    public static void main(String[] args) {
        Demo6 d1 = new Demo6();
        Thread t1 = new Thread(() -> {
            d1.m1();
        });
        t1.start();
        Thread t2 = new Thread(() -> {
            d1.m2();
        });
        t2.start();
        Thread t3 = new Thread(() -> {
            d1.m2();
        });
        t3.start();
        Demo6 d2 = new Demo6();
        Thread t4 = new Thread(() -> {
            d2.m2();
        });
        t4.start();
        Thread t5 = new Thread(() -> {
            Demo6.m4();
        });
        t5.start();
        Thread t6 = new Thread(() -> {
            Demo6.m5();
        });
        t6.start();
    }
}
```

分析上面代码：

1. 线程t1、t2、t3中调用的方法都需要获取d1的锁，所以他们是互斥的
2. t1/t2/t3这3个线程和t4不互斥，他们可以同时运行，因为前面三个线程依赖于d1的锁，t4依赖于d2的锁
3. t5、t6都作用于当前类的Class对象锁，所以这两个线程是互斥的，和其他几个线程不互斥

### 4、ReentrantLock

ReentrantLock是Lock的默认实现，在聊ReentranLock之前，我们需要先弄清楚一些概念：

1. 可重入锁：可重入锁是指同一个线程可以多次获得同一把锁；ReentrantLock和关键字Synchronized都是可重入锁
2. 可中断锁：可中断锁时子线程在获取锁的过程中，是否可以相应线程中断操作。synchronized是不可中断的，ReentrantLock是可中断的
3. 公平锁和非公平锁：公平锁是指多个线程尝试获取同一把锁的时候，获取锁的顺序按照线程到达的先后顺序获取，而不是随机插队的方式获取。synchronized是非公平锁，而ReentrantLock是两种都可以实现，不过默认是非公平锁

#### 1、synchronized的局限性

synchronized是java内置的关键字，它提供了一种独占的加锁方式。synchronized的获取和释放锁由jvm实现，用户不需要显示的释放锁，非常方便，然而synchronized也有一定的局限性，例如：

1. 当线程尝试获取锁的时候，如果获取不到锁会一直阻塞，这个阻塞的过程，用户无法控制
2. 如果获取锁的线程进入休眠或者阻塞，除非当前线程异常，否则其他线程尝试获取锁必须一直等待

JDK1.5之后发布，加入了Doug Lea实现的java.util.concurrent包。包内提供了Lock类，用来提供更多扩展的加锁功能。Lock弥补了synchronized的局限，提供了更加细粒度的加锁功能。

#### 2、ReentrantLock基本使用

我们使用3个线程来对一个共享变量++操作，先使用**synchronized**实现，然后使用**ReentrantLock**实现。

**synchronized方式**：

```java
public class Demo2 {
    private static int num = 0;
    private static synchronized void add() {
        num++;
    }
    public static class T extends Thread {
        @Override
        public void run() {
            for (int i = 0; i < 10000; i++) {
                Demo2.add();
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T();
        T t2 = new T();
        T t3 = new T();
        t1.start();
        t2.start();
        t3.start();
        t1.join();
        t2.join();
        t3.join();
        System.out.println(Demo2.num);
    }
}
```

**ReentrantLock方式**：

```java
import java.util.concurrent.locks.ReentrantLock;

public class Demo3 {
    private static int num = 0;
    private static ReentrantLock lock = new ReentrantLock();
    private static void add() {
        lock.lock();
        try {
            num++;
        } finally {
            lock.unlock();
        }
    }
    public static class T extends Thread {
        @Override
        public void run() {
            for (int i = 0; i < 10000; i++) {
                Demo3.add();
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T();
        T t2 = new T();
        T t3 = new T();
        t1.start();
        t2.start();
        t3.start();
        t1.join();
        t2.join();
        t3.join();
        System.out.println(Demo3.num);
    }
}
```

**ReentrantLock的使用过程：**

1. **创建锁：ReentrantLock lock = new ReentrantLock();**
2. **获取锁：lock.lock()**
3. **释放锁：lock.unlock();**

对比上面的代码，与关键字synchronized相比，ReentrantLock锁有明显的操作过程，开发人员必须手动的指定何时加锁，何时释放锁，正是因为这样手动控制，ReentrantLock对逻辑控制的灵活度要远远胜于关键字synchronized，上面代码需要注意**lock.unlock()**一定要放在finally中，否则，若程序出现了异常，锁没有释放，那么其他线程就再也没有机会获取这个锁了。

#### 3、ReentrantLock获取锁的过程是可中断的

对于synchronized关键字，如果一个线程在等待获取锁，最终只有2种结果：

1. 要么获取到锁然后继续后面的操作
2. 要么一直等待，直到其他线程释放锁为止

而ReentrantLock提供了另外一种可能，就是在等待获取锁的过程中（**发起获取锁请求到还未获取到锁这段时间内**）是可以被中断的，也就是说在等待锁的过程中，程序可以根据需要取消获取锁的请求。有些使用这个操作是非常有必要的。比如：你和好朋友越好一起去打球，如果你等了半小时朋友还没到，突然你接到一个电话，朋友由于突发状况，不能来了，那么你一定达到回府。中断操作正是提供了一套类似的机制，如果一个线程正在等待获取锁，那么它依然可以收到一个通知，被告知无需等待，可以停止工作了。

示例代码：

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Demo6 {
    private static ReentrantLock lock1 = new ReentrantLock(false);
    private static ReentrantLock lock2 = new ReentrantLock(false);
    public static class T extends Thread {
        int lock;
        public T(String name, int lock) {
            super(name);
            this.lock = lock;
        }
        @Override
        public void run() {
            try {
                if (this.lock == 1) {
                    lock1.lockInterruptibly();
                    TimeUnit.SECONDS.sleep(1);
                    lock2.lockInterruptibly();
                } else {
                    lock2.lockInterruptibly();
                    TimeUnit.SECONDS.sleep(1);
                    lock1.lockInterruptibly();
                }
            } catch (InterruptedException e) {
                System.out.println("中断标志:" + this.isInterrupted());
                e.printStackTrace();
            } finally {
                if (lock1.isHeldByCurrentThread()) {
                    lock1.unlock();
                }
                if (lock2.isHeldByCurrentThread()) {
                    lock2.unlock();
                }
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T("t1", 1);
        T t2 = new T("t2", 2);
        t1.start();
        t2.start();
    }
}
```

先运行一下上面代码，发现程序无法结束，使用jstack查看线程堆栈信息，发现2个线程死锁了。

```java
Found one Java-level deadlock:
=============================
"t2":
  waiting for ownable synchronizer 0x0000000717380c20, (a java.util.concurrent.locks.ReentrantLock$NonfairSync),
  which is held by "t1"
"t1":
  waiting for ownable synchronizer 0x0000000717380c50, (a java.util.concurrent.locks.ReentrantLock$NonfairSync),
  which is held by "t2
```

lock1被线程t1占用，lock2被线程t2占用，线程t1在等待获取lock2，线程t2在等待获取lock1，都在相互等待获取对方持有的锁，最终产生了死锁，如果是在synchronized关键字情况下发生了死锁现象，程序是无法结束的。

我们对上面代码改造一下，线程t2一直无法获取到lock1，那么等待5秒之后，我们中断获取锁的操作。主要修改一下main方法，如下：

```java
T t1 = new T("t1", 1);
T t2 = new T("t2", 2);
t1.start();
t2.start();
TimeUnit.SECONDS.sleep(5);
t2.interrupt();
```

新增了2行代码`TimeUnit.SECONDS.sleep(5);t2.interrupt();`，程序可以结束了，运行结果：

```java
java.lang.InterruptedException
    at java.util.concurrent.locks.AbstractQueuedSynchronizer.doAcquireInterruptibly(AbstractQueuedSynchronizer.java:898)
    at java.util.concurrent.locks.AbstractQueuedSynchronizer.acquireInterruptibly(AbstractQueuedSynchronizer.java:1222)
    at java.util.concurrent.locks.ReentrantLock.lockInterruptibly(ReentrantLock.java:335)
    at com.itsoku.chat06.Demo6$T.run(Demo6.java:31)
中断标志:false
```

从上面信息中可以看出，代码的31行触发了异常，**中断标志输出：false**

![ec24264d651f4eb6aa60bb98a3098f78](./images/ec24264d-651f-4eb6-aa60-bb98a3098f78.png)

t2在31行一直获取不到lock1的锁，主线程中等待了5秒之后，t2线程调用了`interrupt()`方法，将线程的中断标志置为true，此时31行会触发`InterruptedException`异常，然后线程t2可以继续向下执行，释放了lock2的锁，然后线程t1可以正常获取锁，程序得以继续进行。线程发送中断信号触发InterruptedException异常之后，中断标志将被清空。

关于获取锁的过程中被中断，注意几点:

1. **ReentrankLock中必须使用实例方法`lockInterruptibly()`获取锁时，在线程调用interrupt()方法之后，才会引发`InterruptedException`异常**
2. **线程调用interrupt()之后，线程的中断标志会被置为true**
3. **触发InterruptedException异常之后，线程的中断标志会被清空，即置为false**
4. **所以当线程调用interrupt()引发InterruptedException异常，中断标志的变化是:false->true->false**

#### 4、ReentrantLock锁申请等待限时

申请锁等待限时是什么意思？一般情况下，获取锁的时间我们是不知道的，synchronized关键字获取锁的过程中，只能等待其他线程把锁释放之后才能够有机会获取到锁。所以获取锁的时间有长有短。如果获取锁的时间能够设置超时时间，那就非常好了。

ReentrantLock刚好提供了这样功能，给我们提供了获取锁限时等待的方法`tryLock()`，可以选择传入时间参数，表示等待指定的时间，无参则表示立即返回锁申请的结果：true表示获取锁成功，false表示获取锁失败。

**tryLock无参方法**

看一下源码中tryLock方法：

```java
public boolean tryLock()
```

返回boolean类型的值，此方法会立即返回，结果表示获取锁是否成功，示例：

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Demo8 {
    private static ReentrantLock lock1 = new ReentrantLock(false);
    public static class T extends Thread {
        public T(String name) {
            super(name);
        }
        @Override
        public void run() {
            try {
                System.out.println(System.currentTimeMillis() + ":" + this.getName() + "开始获取锁!");
                //获取锁超时时间设置为3秒，3秒内是否能否获取锁都会返回
                if (lock1.tryLock()) {
                    System.out.println(System.currentTimeMillis() + ":" + this.getName() + "获取到了锁!");
                    //获取到锁之后，休眠5秒
                    TimeUnit.SECONDS.sleep(5);
                } else {
                    System.out.println(System.currentTimeMillis() + ":" + this.getName() + "未能获取到锁!");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                if (lock1.isHeldByCurrentThread()) {
                    lock1.unlock();
                }
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T("t1");
        T t2 = new T("t2");
        t1.start();
        t2.start();
    }
}
```

代码中获取锁成功之后，休眠5秒，会导致另外一个线程获取锁失败，运行代码，输出：

```java
1563356291081:t2开始获取锁!
1563356291081:t2获取到了锁!
1563356291081:t1开始获取锁!
1563356291081:t1未能获取到锁!
```

**tryLock有参方法**

可以明确设置获取锁的超时时间，该方法签名：

```java
public boolean tryLock(long timeout, TimeUnit unit) throws InterruptedException
```

该方法在指定的时间内不管是否可以获取锁，都会返回结果，返回true，表示获取锁成功，返回false表示获取失败。此方法有2个参数，第一个参数是时间类型，是一个枚举，可以表示时、分、秒、毫秒等待，使用比较方便，第1个参数表示在时间类型上的时间长短。此方法在执行的过程中，如果调用了线程的中断interrupt()方法，会触发InterruptedException异常。

```java
import java.util.concurrent.TimeUnit;
import java.util.concurrent.locks.ReentrantLock;

public class Demo7 {
    private static ReentrantLock lock1 = new ReentrantLock(false);
    public static class T extends Thread {
        public T(String name) {
            super(name);
        }
        @Override
        public void run() {
            try {
                System.out.println(System.currentTimeMillis() + ":" + this.getName() + "开始获取锁!");
                //获取锁超时时间设置为3秒，3秒内是否能否获取锁都会返回
                if (lock1.tryLock(3, TimeUnit.SECONDS)) {
                    System.out.println(System.currentTimeMillis() + ":" + this.getName() + "获取到了锁!");
                    //获取到锁之后，休眠5秒
                    TimeUnit.SECONDS.sleep(5);
                } else {
                    System.out.println(System.currentTimeMillis() + ":" + this.getName() + "未能获取到锁!");
                }
            } catch (InterruptedException e) {
                e.printStackTrace();
            } finally {
                if (lock1.isHeldByCurrentThread()) {
                    lock1.unlock();
                }
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T("t1");
        T t2 = new T("t2");
        t1.start();
        t2.start();
    }
}
```

程序中调用了ReentrantLock的实例方法`tryLock(3, TimeUnit.SECONDS)`，表示获取锁的超时时间是3秒，3秒后不管是否能否获取锁，该方法都会有返回值，获取到锁之后，内部休眠了5秒，会导致另外一个线程获取锁失败。

运行程序，输出：

```java
1563355512901:t2开始获取锁!
1563355512901:t1开始获取锁!
1563355512902:t2获取到了锁!
1563355515904:t1未能获取到锁!
```

输出结果中分析，t2获取到锁了，然后休眠了5秒，t1获取锁失败，t1打印了2条信息，时间相差3秒左右。

**关于tryLock()方法和tryLock(long timeout, TimeUnit unit)方法，说明一下：**

1. 都会返回boolean值，结果表示获取锁是否成功
2. tryLock()方法，不管是否获取成功，都会立即返回；而有参的tryLock方法会尝试在指定的时间内去获取锁，中间会阻塞的现象，在指定的时间之后会不管是否能够获取锁都会返回结果
3. tryLock()方法不会响应线程的中断方法；而有参的tryLock方法会响应线程的中断方法，而触发`InterruptedException`异常，这个从2个方法的声明上可以可以看出来

#### 5、ReentrantLock其他常用的方法

1. isHeldByCurrentThread：实例方法，判断当前线程是否持有ReentrantLock的锁，上面代码中有使用过。

**获取锁的4种方法对比**

| 获取锁的方法                               | 是否立即响应(不会阻塞) | 是否响应中断 |
| ------------------------------------ | ------------ | ------ |
| lock()                               | ×            | ×      |
| lockInterruptibly()                  | ×            | √      |
| tryLock()                            | √            | ×      |
| tryLock(long timeout, TimeUnit unit) | ×            | √      |

#### 6、总结

1. ReentrantLock可以实现公平锁和非公平锁
2. ReentrantLock默认实现的是非公平锁
3. ReentrantLock的获取锁和释放锁必须成对出现，锁了几次，也要释放几次
4. 释放锁的操作必须放在finally中执行
5. lockInterruptibly()实例方法可以相应线程的中断方法，调用线程的interrupt()方法时，lockInterruptibly()方法会触发`InterruptedException`异常
6. 关于`InterruptedException`异常说一下，看到方法声明上带有 `throws InterruptedException`，表示该方法可以相应线程中断，调用线程的interrupt()方法时，这些方法会触发`InterruptedException`异常，触发InterruptedException时，线程的中断中断状态会被清除。所以如果程序由于调用`interrupt()`方法而触发`InterruptedException`异常，线程的标志由默认的false变为ture，然后又变为false
7. 实例方法tryLock()会尝试获取锁，会立即返回，返回值表示是否获取成功
8. 实例方法tryLock(long timeout, TimeUnit unit)会在指定的时间内尝试获取锁，指定的时间内是否能够获取锁，都会返回，返回值表示是否获取锁成功，该方法会响应线程的中断

### 5、悲观锁

认为自己在使用数据的时候一定有别的线程来修改数据，因此在获取数据的时候会先加锁，确保数据不会被别的线程修改。

synchronized关键字和Lock的实现类都是悲观锁

适合写操作多的场景，先加锁可以保证写操作时数据正确。

显式的锁定之后再操作同步资源

```java
//=============悲观锁的调用方式
public synchronized void m1()
{
    //加锁后的业务逻辑......
}

// 保证多个线程使用的是同一个lock对象的前提下
ReentrantLock lock = new ReentrantLock();
public void m2() {
    lock.lock();
    try {
        // 操作同步资源
    }finally {
        lock.unlock();
    }
}
```

### 6、乐观锁

```java
//=============乐观锁的调用方式
// 保证多个线程使用的是同一个AtomicInteger
private AtomicInteger atomicInteger = new AtomicInteger();
atomicInteger.incrementAndGet();
```

 乐观锁认为自己在使用数据时不会有别的线程修改数据，所以不会添加锁，只是在更新数据的时候去判断之前有没有别的线程更新了这个数据。

如果这个数据没有被更新，当前线程将自己修改的数据成功写入。如果数据已经被其他线程更新，则根据不同的实现方式执行不同的操作

乐观锁在Java中是通过使用无锁编程来实现，最常采用的是CAS算法，Java原子类中的递增操作就通过CAS自旋实现的。

适合读操作多的场景，不加锁的特点能够使其读操作的性能大幅提升。

乐观锁则直接去操作同步资源，是一种无锁算法，得之我幸不得我命，再抢

乐观锁一般有两种实现方式：

1. 采用版本号机制
2. CAS（Compare-and-Swap，即比较并替换）算法实现

### 7、八锁案例

#### 1、JDK源码(notify方法)

![image20210907200227293](./images/image-20210907200227293-16310161483121.png)

#### 2、8种锁的案例实际体现在3个地方

1. 作用于实例方法，当前实例加锁，进入同步代码前要获得当前实例的锁；
2. 作用于代码块，对括号里配置的对象加锁。
3. 作用于静态方法，当前类加锁，进去同步代码前要获得当前类对象的锁；

##### 1、标准访问有ab两个线程，请问先打印邮件还是短信

```JAVA
class Phone //资源类
{
    public synchronized void sendEmail()
    {
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone.sendSMS();
        },"b").start();

    }
}
-------sendEmail
-------sendSMS
```

##### 2、sendEmail方法暂停3秒钟，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone.sendSMS();
        },"b").start();

    }
}
-------sendEmail
-------sendSMS
```

##### 1-2结论

```
一个对象里面如果有多个synchronized方法，某一个时刻内，只要一个线程去调用其中的一个synchronized方法了，
其它的线程都只能等待，换句话说，某一个时刻内，只能有唯一的一个线程去访问这些synchronized方法
锁的是当前对象this，被锁定后，其它的线程都不能进入到当前对象的其它的synchronized方法
```

##### 3、新增一个普通的hello方法，请问先打印邮件还是hello

```java
class Phone //资源类
{
    public synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone.hello();
        },"b").start();

    }
}
-------hello
-------sendEmail
```

##### 4、有两部手机，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1
        Phone phone2 = new Phone();//资源类2

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone2.sendSMS();
        },"b").start();
    }
}
-------sendSMS
-------sendEmail
```

##### 3-4结论

```
加个普通方法后发现和同步锁无关,hello
换成两个对象后，不是同一把锁了，情况立刻变化。
```

##### 5、两个静态同步方法，同1部手机，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public static synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public static synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone.sendSMS();
        },"b").start();
    }
}
-------sendEmail
-------sendSMS
```

##### 6、两个静态同步方法， 2部手机，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public static synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public static synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1
        Phone phone2 = new Phone();//资源类2

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone2.sendSMS();
        },"b").start();
    }
}
-------sendEmail
-------sendSMS
```

##### 5-6结论

```
都换成静态同步方法后，情况又变化
三种 synchronized 锁的内容有一些差别:
对于普通同步方法，锁的是当前实例对象，通常指this,具体的一部部手机,所有的普通同步方法用的都是同一把锁——实例对象本身，
对于静态同步方法，锁的是当前类的Class对象，如Phone.class唯一的一个模板
对于同步方法块，锁的是 synchronized 括号内的对象
```

##### 7、1个静态同步方法，1个普通同步方法,同1部手机，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public static synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone.sendSMS();
        },"b").start();
    }
}
-------sendSMS
-------sendEmail
```

##### 8、1个静态同步方法，1个普通同步方法,2部手机，请问先打印邮件还是短信

```java
class Phone //资源类
{
    public static synchronized void sendEmail()
    {
        //暂停几秒钟线程
        try { TimeUnit.SECONDS.sleep(3); } catch (InterruptedException e) { e.printStackTrace(); }
        System.out.println("-------sendEmail");
    }

    public synchronized void sendSMS()
    {
        System.out.println("-------sendSMS");
    }

    public void hello()
    {
        System.out.println("-------hello");
    }
}

public class Lock8Demo
{
    public static void main(String[] args)//一切程序的入口，主线程
    {
        Phone phone = new Phone();//资源类1
        Phone phone2 = new Phone();//资源类2

        new Thread(() -> {
            phone.sendEmail();
        },"a").start();

        //暂停毫秒
        try { TimeUnit.MILLISECONDS.sleep(300); } catch (InterruptedException e) { e.printStackTrace(); }

        new Thread(() -> {
            phone2.sendSMS();
        },"b").start();
    }
}
-------sendSMS
-------sendEmail
```

##### 7-8结论

```
当一个线程试图访问同步代码时它首先必须得到锁，退出或抛出异常时必须释放锁。

所有的普通同步方法用的都是同一把锁——实例对象本身，就是new出来的具体实例对象本身,本类this
也就是说如果一个实例对象的普通同步方法获取锁后，该实例对象的其他普通同步方法必须等待获取锁的方法释放锁后才能获取锁。

所有的静态同步方法用的也是同一把锁——类对象本身，就是我们说过的唯一模板Class
具体实例对象this和唯一模板Class，这两把锁是两个不同的对象，所以静态同步方法与普通同步方法之间是不会有竞态条件的
但是一旦一个静态同步方法获取锁后，其他的静态同步方法都必须等待该方法释放锁后才能获取锁。
```

### 8、公平锁和非公平锁

在大多数情况下，锁的申请都是非公平的，也就是说，线程1首先请求锁A，接着线程2也请求了锁A。那么当锁A可用时，是线程1可获得锁还是线程2可获得锁呢？这是不一定的，系统只是会从这个锁的等待队列中随机挑选一个，因此不能保证其公平性。这就好比买票不排队，大家都围在售票窗口前，售票员忙的焦头烂额，也顾及不上谁先谁后，随便找个人出票就完事了，最终导致的结果是，有些人可能一直买不到票。而公平锁，则不是这样，它会按照到达的先后顺序获得资源。公平锁的一大特点是：它不会产生饥饿现象，只要你排队，最终还是可以等到资源的；synchronized关键字默认是有jvm内部实现控制的，是非公平锁。而ReentrantLock运行开发者自己设置锁的公平性。

看一下jdk中ReentrantLock的源码，2个构造方法：

```java
public ReentrantLock() {
    sync = new NonfairSync();
}
public ReentrantLock(boolean fair) {
    sync = fair ? new FairSync() : new NonfairSync();
}
```

默认构造方法创建的是非公平锁。

第2个构造方法，有个fair参数，当fair为true的时候创建的是公平锁，公平锁看起来很不错，不过要实现公平锁，系统内部肯定需要维护一个有序队列，因此公平锁的实现成本比较高，性能相对于非公平锁来说相对低一些。因此，在默认情况下，锁是非公平的，如果没有特别要求，则不建议使用公平锁。

公平锁和非公平锁在程序调度上是很不一样，来一个公平锁示例看一下：

```java
import java.util.concurrent.locks.ReentrantLock;

public class Demo5 {
    private static int num = 0;
    private static ReentrantLock fairLock = new ReentrantLock(true);
    public static class T extends Thread {
        public T(String name) {
            super(name);
        }
        @Override
        public void run() {
            for (int i = 0; i < 5; i++) {
                fairLock.lock();
                try {
                    System.out.println(this.getName() + "获得锁!");
                } finally {
                    fairLock.unlock();
                }
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T("t1");
        T t2 = new T("t2");
        T t3 = new T("t3");
        t1.start();
        t2.start();
        t3.start();
        t1.join();
        t2.join();
        t3.join();
    }
}
```

看一下输出的结果，锁是按照先后顺序获得的。

修改一下上面代码，改为非公平锁试试，如下：

```java
ReentrantLock fairLock = new ReentrantLock(false);
```

从ReentrantLock卖票编码演示公平和非公平现象

```java
import java.util.concurrent.locks.ReentrantLock;

class Ticket
{
    private int number = 30;
    ReentrantLock lock = new ReentrantLock();

    public void sale()
    {
        lock.lock();
        try
        {
            if(number > 0)
            {
                System.out.println(Thread.currentThread().getName()+"卖出第：\t"+(number--)+"\t 还剩下:"+number);
            }
        }catch (Exception e){
            e.printStackTrace();
        }finally {
            lock.unlock();
        }
    }
}

public class SaleTicketDemo
{
    public static void main(String[] args)
    {
        Ticket ticket = new Ticket();

        new Thread(() -> { for (int i = 0; i <35; i++)  ticket.sale(); },"a").start();
        new Thread(() -> { for (int i = 0; i <35; i++)  ticket.sale(); },"b").start();
        new Thread(() -> { for (int i = 0; i <35; i++)  ticket.sale(); },"c").start();
    }
}
```

生活中，排队讲求先来后到视为公平。程序中的公平性也是符合请求锁的绝对时间的，其实就是 FIFO，否则视为不公平

#### 1、源码解读

 按序排队公平锁，就是判断同步队列是否还有先驱节点的存在(我前面还有人吗?)，如果没有先驱节点才能获取锁；先占先得非公平锁，是不管这个事的，只要能抢获到同步状态就可以

![image20210916224629198](./images/image-20210916224629198.png)

#### 2、为什么会有公平锁/非公平锁的设计为什么默认非公平？

1. 恢复挂起的线程到真正锁的获取还是有时间差的，从开发人员来看这个时间微乎其微，但是从CPU的角度来看，这个时间差存在的还是很明显的。所以非公平锁能更充分的利用CPU 的时间片，尽量减少 CPU 空闲状态时间。
2. 使用多线程很重要的考量点是线程切换的开销，当采用非公平锁时，当1个线程请求锁获取同步状态，然后释放同步状态，因为不需要考虑是否还有前驱节点，所以刚释放锁的线程在此刻再次获取同步状态的概率就变得非常大，所以就减少了线程的开销。

#### 3、使⽤公平锁会有什么问题

公平锁保证了排队的公平性，非公平锁霸气的忽视这个规则，所以就有可能导致排队的长时间在排队，也没有机会获取到锁，这就是传说中的 “锁饥饿”

#### 4、什么时候用公平？什么时候用非公平？

如果为了更高的吞吐量，很显然非公平锁是比较合适的，因为节省很多线程切换时间，吞吐量自然就上去了；否则那就用公平锁，大家公平使用。

### 9、可重入锁(又名递归锁)

是指在同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁(前提，锁对象得是同一个对象)，不会因为之前已经获取过还没释放而阻塞。

如果是1个有 synchronized 修饰的递归调用方法，程序第2次进入被自己阻塞了岂不是天大的笑话，出现了作茧自缚。所以Java中ReentrantLock和synchronized都是可重入锁，可重入锁的一个优点是可一定程度避免死锁。

#### 1、“可重入锁”这四个字分开来解释：

```
可：可以。
重：再次。
入：进入。
锁：同步锁。

进入什么:进入同步域（即同步代码块/方法或显式锁锁定的代码）
一句话:一个线程中的多个流程可以获取同一把锁，持有这把同步锁可以再次进入。
自己可以获取自己的内部锁
```

#### 2、可重入锁种类

##### 1、隐式锁（即synchronized关键字使用的锁）默认是可重入锁

```
指的是可重复可递归调用的锁，在外层使用锁之后，在内层仍然可以使用，并且不发生死锁，这样的锁就叫做可重入锁。
简单的来说就是：在一个synchronized修饰的方法或代码块的内部调用本类的其他synchronized修饰的方法或代码块时，是永远可以得到锁的

与可重入锁相反，不可重入锁不可递归调用，递归调用就发生死锁。
```

同步块

```java
public class ReEntryLockDemo{
    public static void main(String[] args){
        final Object objectLockA = new Object();

        new Thread(() -> {
            synchronized (objectLockA){
                System.out.println("-----外层调用");
                synchronized (objectLockA){
                    System.out.println("-----中层调用");
                    synchronized (objectLockA){
                        System.out.println("-----内层调用");
                    }
                }
            }
        },"a").start();
    }
}
```

同步方法

```java
public class ReEntryLockDemo{
    public synchronized void m1(){
        System.out.println("-----m1");
        m2();
    }
    public synchronized void m2(){
        System.out.println("-----m2");
        m3();
    }
    public synchronized void m3(){
        System.out.println("-----m3");
    }

    public static void main(String[] args){
        ReEntryLockDemo reEntryLockDemo = new ReEntryLockDemo();

        reEntryLockDemo.m1();
    }
}
```

##### 2、显式锁（即Lock）也有ReentrantLock这样的可重入锁。

```java
public class Demo4 {
    private static int num = 0;
    private static ReentrantLock lock = new ReentrantLock();
    private static void add() {
        lock.lock();
        lock.lock();
        try {
            num++;
        } finally {
            lock.unlock();
            lock.unlock();
        }
    }
    public static class T extends Thread {
        @Override
        public void run() {
            for (int i = 0; i < 10000; i++) {
                Demo4.add();
            }
        }
    }
    public static void main(String[] args) throws InterruptedException {
        T t1 = new T();
        T t2 = new T();
        T t3 = new T();
        t1.start();
        t2.start();
        t3.start();
        t1.join();
        t2.join();
        t3.join();
        System.out.println(Demo4.num);
    }
}
```

上面代码中add()方法中，当一个线程进入的时候，会执行2次获取锁的操作，运行程序可以正常结束，并输出和期望值一样的30000，假如ReentrantLock是不可重入的锁，那么同一个线程第2次获取锁的时候由于前面的锁还未释放而导致死锁，程序是无法正常结束的。ReentrantLock命名也挺好的Re entrant Lock，和其名字一样，可重入锁。

代码中还有几点需要注意：

1. **lock()方法和unlock()方法需要成对出现，锁了几次，也要释放几次，否则后面的线程无法获取锁了；可以将add中的unlock删除一个事实，上面代码运行将无法结束**
2. **unlock()方法放在finally中执行，保证不管程序是否有异常，锁必定会释放**

```java
/**
 * @create 2020-05-14 11:59
 * 在一个Synchronized修饰的方法或代码块的内部调用本类的其他Synchronized修饰的方法或代码块时，是永远可以得到锁的
 */
public class ReEntryLockDemo{
    static Lock lock = new ReentrantLock();

    public static void main(String[] args){
        new Thread(() -> {
            lock.lock();
            try
            {
                System.out.println("----外层调用lock");
                lock.lock();
                try
                {
                    System.out.println("----内层调用lock");
                }finally {
                    // 这里故意注释，实现加锁次数和释放次数不一样
                    // 由于加锁次数和释放次数不一样，第二个线程始终无法获取到锁，导致一直在等待。
                    lock.unlock(); // 正常情况，加锁几次就要解锁几次
                }
            }finally {
                lock.unlock();
            }
        },"a").start();

        new Thread(() -> {
            lock.lock();
            try
            {
                System.out.println("b thread----外层调用lock");
            }finally {
                lock.unlock();
            }
        },"b").start();

    }
}
```

#### 3、Synchronized的重入的实现机理

 每个锁对象拥有一个锁计数器和一个指向持有该锁的线程的指针。

 当执行monitorenter时，如果目标锁对象的计数器为零，那么说明它没有被其他线程所持有，Java虚拟机会将该锁对象的持有线程设置为当前线程，并且将其计数器加1。

 在目标锁对象的计数器不为零的情况下，如果锁对象的持有线程是当前线程，那么 Java 虚拟机可以将其计数器加1，否则需要等待，直至持有线程释放该锁。

 当执行monitorexit时，Java虚拟机则需将锁对象的计数器减1。计数器为零代表锁已被释放。

### 10、死锁

 死锁是指两个或两个以上的线程在执行过程中,因争夺资源而造成的一种互相等待的现象,若无外力干涉那它们都将无法推进下去，如果系统资源充足，进程的资源请求都能够得到满足，死锁出现的可能性就很低，否则就会因争夺有限的资源而陷入死锁。

![图像](./images/%E5%9B%BE%E5%83%8F.png)

#### 1、产生死锁主要原因

1. 系统资源不足
2. 进程运行推进的顺序不合适
3. 资源分配不当

```java
public class DeadLockDemo{
    public static void main(String[] args){
        final Object objectLockA = new Object();
        final Object objectLockB = new Object();

        new Thread(() -> {
            synchronized (objectLockA){
                System.out.println(Thread.currentThread().getName()+"\t"+"自己持有A，希望获得B");
                //暂停几秒钟线程
                try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
                synchronized (objectLockB)
                {
                    System.out.println(Thread.currentThread().getName()+"\t"+"A-------已经获得B");
                }
            }
        },"A").start();

        new Thread(() -> {
            synchronized (objectLockB){
                System.out.println(Thread.currentThread().getName()+"\t"+"自己持有B，希望获得A");
                //暂停几秒钟线程
                try { TimeUnit.SECONDS.sleep(1); } catch (InterruptedException e) { e.printStackTrace(); }
                synchronized (objectLockA){
                    System.out.println(Thread.currentThread().getName()+"\t"+"B-------已经获得A");
                }
            }
        },"B").start();

    }
}
```

#### 2、如何排查死锁

1. 纯命令

```shell
jps -l
jstack 进程编号
```

1. 图形化

```
jconsole
```