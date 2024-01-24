---
# 当前页面内容标题
title: MAC利用Homebrew安装JDK
# 分类
category:
  - mysql
# 标签
tag: 
  - mac
  - 环境配置
  - mysql
  - jdk
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## Mac 利用Homebrew安装JDK

**一:安装JDK17**

> 1.安装openjdk17
>
> 2.把homebrew安装的openjdk17软链接到系统目录

```shell
brew install openjdk@17  

sudo ln -sfn $(brew --prefix)/opt/openjdk@17/libexec/openjdk.jdk /Library/Java/JavaVirtualMachines/openjdk-17.jdk 
```

**二:检查是否安装成功**

> 在Terminal中运行下面的命令查看Java安装版本，如正常显示Java版本信息则说明安装成功，如果显示command java not find 或者其它则说明没有安装成功

```bash
java --version
```

三:**配置环境变量**

> 切到jdk的home文件

```bash
cd /Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home
```

> 首次创建配置，可以使用这个命令创建配置文件～

```bash
touch .bash_profile
```

> 然后使用以下命令打开配置文件

```text
open -e .bash_profile
```

> 添加配置内容:注意路径

```bash
JAVA_HOME="/Library/Java/JavaVirtualMachines/openjdk-17.jdk/Contents/Home"
export JAVA_HOME
CLASS_PATH="$JAVA_HOME/lib"
PATH=".$PATH:$JAVA_HOME/bin"
```

**四:完成配置**

> 1.完成配置:	`source .bash_profile`
>
> 2.输入**`echo $JAVA_HOME`**可以看到环境配置的路径

```bash
source .bash_profile #完成配置

echo $JAVA_HOME #检查配置
```