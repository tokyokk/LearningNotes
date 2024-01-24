---
# 当前页面内容标题
title: 玩转IDEA以及调优设置
# 分类
category:
  - idea
# 标签
tag: 
  - idea
  - 开发工具
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## 01、主题推荐

- Atom Material Icons 一款好看的图标库

- Cyan Light Theme

- Dracula Theme 吸血鬼主题

- Material Theme UI （推荐的主题，但是在2021.3版本之后就开始收费了）

```
解决方法：
https://plugins.jetbrains.com/plugin/8006-material-theme-ui/versions/stable

上面的是官网的地址，请先登录官网，然后下载6.10之前的版本，然后将该版本导入到idea中即可！
```

![](./images/2023-04-27-05-50-41-image.png)

> 注意点：这里导入的时候是导入zip压缩的，文件夹之类的不可以！

- One Dark Theme

- Vuesion Theme

- Xcode-Dark Theme

- Dark purple Theme

## 02、插件推荐

- Rainbow Brackets 彩色括号

- Maven Helper

- Tabnine AI Code 智能提示插件

- JPA Buddy 提供jpa的支持

- String Manipulation

- Free Mybatis Tool

- Alibaba Cloud Toolkit

- .ignore

- Alibaba Java Coding Guidelines

- CheckStyle-IDEA

- GenerateAllSetter

- GitToolBox

- maven-search

- MybatisX

- PlantUML Integration

- Vue.js 如果你喜欢idea写前端，支持vue语法

- Translation 翻译插件

- FindBugs 可以更加深入的去检测异常

- GsonFormat  代码生成插件。在类中使用，粘贴一段 Json 文本，能自动生成对象的嵌套结构代码。

- Key Promoter X 快捷键提示

- AiXcoder Code Completer（codeta貌似已经不可以使用了，推荐使用tabnine）

- Arthas idea（阿里开源的Java在线诊断工具）

- Auto filling Java call arguments 代码生成插件。通过快捷键自动补全函数的调用参数，针对包含大量参数的构造函数和方法非常有用！

- GenerateSerialVersionUID （代码生成插件。一键为实现 Serializable 接口的类生成 SerialVersionUID。）

- VisualVM Launcher （jvm调优插件。运行java程序的时候启动visualvm，方便查看jvm的情况 比如堆内存大小的分配。）

- MyBatisCodeHelperPro （mybatis代码帮助插件。最好的Mybatis代码提示，完整支持Mybatis动态sql代码提示，代码检测，写sql几乎所有地方都有代码提示。）

- lombok

- google-java-format 代码自动格式化

- RestfulToolkit （搜索URL，准确的说是搜索SpringMVC项目里，Controller层的@RequestMapping里的URL，通过URL匹配到相应的Controller层方法。）

- **Jclasslib Bytecode Viewer**（看类的字节码文件）

- **CamelCase**（在几种字符串格式之间来回切换）

- **Jrebel for Intellij**（热部署插件）

- **SequenceDiagram**（生成简单序列图）

- HighlghtBracketPair （代码开头和结尾高亮）

- Generate020（自动填充参数的值）

- File Expander （不仅可以反编译，而且可以打开tar.gz，zip等压缩文件）

- VisualGC（可以查看JVM堆栈可视化信工具）

- Grep Console（日志工具）

- yaml （yaml格式提示高亮）

- Markdown

- Gradle

- sonarLint 代码问题检查插件

- Bito （AI插件）

- [AI 代码工具大揭秘：提高编程效率的必备神器！ - 掘金 (juejin.cn)](https://juejin.cn/post/7226585879480188984)

- 。。。

## 03、调优设置

1. 显示工具条

![](./images/2023-04-27-06-28-02-image.png)

2. 自动导包

File | Settings | Editor | General | Auto Import

![](./images/2023-04-27-06-30-15-image.png)

3. 设置鼠标悬浮提示

![](./images/2023-04-27-06-31-00-image.png)

4. 代码忽略大小写

![](./images/2023-04-27-06-32-10-image.png)

5. 设置控制台大小

![](./images/2023-04-27-06-33-13-image.png)

6. 显示方法分割线，行号，特殊字符

File | Settings | Editor | General | Appearance

![image-20230427064007105](./images/image-20230427064007105.png)

7. 字体设置

![](./images/2023-04-27-06-34-44-image.png)

8. 启动软件可选择打开的项目

![](./images/2023-04-27-06-36-04-image.png)

9. 去除idea自动更新

File | Settings | Appearance & Behavior | System Settings | Updates

![](./images/2023-04-27-06-38-02-image.png)

10. 取消在同一行内显示tab

File | Settings | Editor | General | Editor Tabs

![image-20230427064133493](./images/image-20230427064133493.png)

11. 修改文件编码

File | Settings | Editor | File Encodings

![image-20230427064235885](./images/image-20230427064235885.png)

12. 双斜杠注释改成紧跟代码头

File | Settings | Editor | Code Style | Java

![image-20230427064446240](./images/image-20230427064446240.png)

13. idea代码大括号换行

![image-20230427064412268](./images/image-20230427064412268.png)

14. maven配置

![image-20230427064604186](./images/image-20230427064604186.png)

![image-20230427064822897](./images/image-20230427064822897.png)

> -Dmaven.wagon.http.ssl.insecure=true -Dmaven.wagon.http.ssl.allowall=true

15. 取消索引分享

File | Settings | Tools | Shared Indexes

这个设置是取消新版idea提示预加载jdk和maven等的索引，小项目没有什么意义的可以取消。但是大项目建议是要的。

![image-20230427064949249](./images/image-20230427064949249.png)

16. Editor-General

    设置鼠标滚轮滚动修改字体大小

![image-20230427065434952](./images/image-20230427065434952.png)

17. IDEA注释多行变单行

Editor-Code Style-Java–Other-Javadoc

![image-20230505233238195](./images/image-20230505233238195.png)

18. idea 注释格式化之后回到同一行

如上图一直勾选Editor-Code Style-Java–Other-Javadoc-将Preserve line feeds 选中

19. 个人的一些其他设置（纯属个人爱）

包括：格式化后注释与注入类一行，以及参数居中之类的！

![image-20230505235727822](./images/image-20230505235727822.png)

## 04、常用代码模版

- 创建类时添加注释信息

**setting->Editor->File and Code Templates->Includes->File Header**

```java
/**
 * @author ragnarok
 * @description
 * @create ${YEAR}-${MONTH}-${DAY} ${TIME}
 * @github https://github.com/Ragnarokoo
 * @version 1.0
 */
```

- tsleep/tmsleep睡眠时间模版

```java
try {  TimeUnit.SECONDS.sleep(time); } catch (InterruptedException e) { e.printStackTrace(); }
```

![image-20230427070129865](./images/image-20230427070129865.png)

```java
try {  TimeUnit.MILLISECONDS.sleep(time); } catch (InterruptedException e) { e.printStackTrace(); }
```

![image-20230427070423906](./images/image-20230427070423906.png)

- springboot启动类的快捷方式（mainboot）

```java
public static void main(String[] args)
{
    SpringApplication.run(.class, args);
}
```

![image-20230427070703095](./images/image-20230427070703095.png)

- 注释（IDEA添加代码模版）

1.创建时同时添加注释

![image-20230513231328951](./images/image-20230513231328951.png)

```java
#if (${PACKAGE_NAME} && ${PACKAGE_NAME} != "")package ${PACKAGE_NAME};#end
/**
 * @author ragnarok
 * @description
 * @create ${YEAR}-${MONTH}-${DAY} ${TIME}
 * @github https://github.com/Ragnarokoo
 * @version 1.0
 */
public class ${NAME} {
}
```

2.   方法注释

![image-20230514012525469](./images/image-20230514012525469.png)

![image-20230514013007613](./images/image-20230514013007613.png)

![image-20230514013034091](./images/image-20230514013034091.png)

```java
**
 * @description $description$
 * @author ragnarok
 * @date $date$ $time$
 * @version 1.0.0 
$param$ 
 * @return $return$ 
 */
```

param

```sh
groovyScript("def result=''; def params=\"${_1}\".replaceAll('[\\\\[|\\\\]|\\\\s]', '').split(',').toList(); result=' * @param ' + params[0]; for(i = 1; i < params.size(); i++) {result+='\\n     * @param ' + params[i] + ((i+1 < params.size() - 1) ? '\\n' : '')};return result", methodParameters())  
```

return

```
methodReturnType()
```



>   Skip if defind 可以跳过定义！–这里防止格式乱了!

![image-20230514015147623](./images/image-20230514015147623.png)

最后点击apply，ok即可！

![image-20230514015203129](./images/image-20230514015203129.png)

根据自己情况决定使用哪种！
