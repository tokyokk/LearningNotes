---
# 当前页面内容标题
title: Homebrew遇到的问题
# 分类
category:
  - Homebrew
# 标签
tag: 
  - mac
  - Homebrew
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## MAC终端 Error: The following directories are not writable by your user

```bash
brew install node
```

- 报权限错误

```bash
Error: The following directories are not writable by your user:
/usr/local/share/man/man8
You should change the ownership of these directories to your user.
sudo chown -R $(whoami) /usr/local/share/man/man8
```

- 解决办法

收回权限后，即可正常下载

```bash
sudo chown -R `whoami`:admin /usr/local/bin
sudo chown -R `whoami`:admin /usr/local/share
```

