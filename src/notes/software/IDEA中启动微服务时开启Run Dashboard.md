---
# 当前页面内容标题
title: IDEA中启动微服务时开启Run Dashboard
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

## 一、为什么要添加Run Dashboard？

微服务项目的开发过程中，工程会非常多，经常要启动很多个服务，才能完成一项测试。启动的多了，容易开发者带来错乱的感觉，很不方便管理。在idea作为开发工具时，推荐一个很好用的功能--Run Dashboard。

## 二、如何设置？

View->Tool Window-> Run Dashboard

> 这里注意：如果你使用的是2021或其他版本可能已经更名为`Services`

### 三、问题存在？

如果idea中没有Run Dashboard选项，添加下面的配置

在工程目录下找.idea文件夹下的workspace.xml，在其中增加如下组件

```xml
<component name="RunDashboard">
    <option name="configurationTypes">
      <set>
        <option value="SpringBootApplicationConfigurationType" />
      </set>
    </option>
    <option name="ruleStates">
      <list>
        <RuleState>
          <option name="name" value="ConfigurationTypeDashboardGroupingRule" />
        </RuleState>
        <RuleState>
          <option name="name" value="StatusDashboardGroupingRule" />
        </RuleState>
      </list>
    </option>
  </component>
```

