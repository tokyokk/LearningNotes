---
# 当前页面内容标题
title: MAC安装mysql后设置开机自启
# 分类
category:
  - mysql
# 标签
tag: 
  - mac
  - mysql
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

# mac 安装mysql 后设置开机自启

## 手动启动mysql 服务

打开终端

```bash
***@huahuapro ~ % mysql --version
zsh: command not found: mysql
***@huahuapro ~ % PATH="$PATH":/usr/local/mysql/bin
***@huahuapro ~ % mysql --version
mysql  Ver 8.0.27 for macos11 on arm64 (MySQL Community Server - GPL)
***@huahuapro ~ % mysql -uroot -ph*****
mysql: [Warning] Using a password on the command line interface can be insecure.
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 19
Server version: 8.0.27 MySQL Community Server - GPL

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| performance_schema |
| sys                |
+--------------------+
4 rows in set (0.00 sec)

mysql> 
```

查看是否启动

```bash
***@huahuapro ~ % ps -ef | grep mysqld             
   74  1401     1   0 二02下午 ??         0:34.23 /usr/local/mysql/bin/mysqld --user=_mysql --basedir=/usr/local/mysql --datadir=/usr/local/mysql/data --plugin-dir=/usr/local/mysql/lib/plugin --log-error=/usr/local/mysql/data/mysqld.local.err --pid-file=/usr/local/mysql/data/mysqld.local.pid --keyring-file-data=/usr/local/mysql/keyring/keyring --early-plugin-load=keyring_file=keyring_file.so
  501 50208 49815   0  2:29下午 ttys000    0:00.00 grep mysqld
***@huahuapro ~ % 
```

## 开机自启动mysql 服务

1. 配置mysql。 环境变量
2. 查看当前系统默认的
3. 打开终端，默认shell是dash(10.15默认是zsh)，可以用下行 代码更换成zsh，( 之前的绝大多数命令使用方法不变 )

```bash
chsh -s /bin/zsh
```

4. 如果想要换回来，使用下行 代码，换回bash

```bash
chsh -s /bin/bash
```

5. 需要注意的是，替换过后，要把终端退出再打开才生效
   查看MacOS现在使用的shell，输入并执行下行 代码

```bash
echo $SHELL

# 如果你的输出结果是 /bin/zsh，参考 zsh 终端操作方式 
# 如果你的输出结果是 /bin/bash，参考 bash 终端操作方式
```

6. 如果shell更改为zsh 打开终端，输入并执行下行 代码：

```bash
vim ~/.zshrc
```

7. 如果未更改，使用的是默认的bash
   输入并执行下行 代码：

```bash
vim ~/.bash_profile
```

8. 然后会到vim编辑的配置界面，键入 i，注意左下角，现在进入INSERT输入模式。 然后输入以下 代码，将MySQL安装路径加入环境变量。

```bash
export PATH=$PATH:/usr/local/mysql/bin
```

9. 与此同时，也可以将以下两行 代码添加进去，设置快捷指令来开启或关闭MySQL服务端

```mysql
alias mysqlstart='sudo /usr/local/mysql/support-files/mysql.server start'
alias mysqlstop='sudo /usr/local/mysql/support-files/mysql.server stop'
```

10. 之后，按esc退出插入模式，并输入:wq

```bash
##立即生效
source ~/.zshrc
```

11. 如果未更改，使用的是默认的bash
    输入并执行下行 代码

```bash
source ~/.bash_profile
```

12. `echo $PATH`

13. 如果添加成功，会出现`/usr/local/mysql/bin`这一句

```bash
ps -ef | grep mysqld
```
