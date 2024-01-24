---
# 当前页面内容标题
title: Typora主题调优设置
# 分类
category:
  - 终端
# 标签
tag: 
  - mac
  - tmux
  - 终端
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true

---

这里推荐使用vue主题：

```css
@import 'vue/fonts.css';

:root {
    --side-bar-bg-color: #fff;
    --control-text-color: #777;
    --font-sans-serif: 'Ubuntu', 'Source Sans Pro', sans-serif !important;
    --font-monospace: 'Fira Code', 'Roboto Mono', monospace !important;
}

html {
    font-size: 16px;
}

body {
    font-family: var(--font-sans-serif);
    color: #34495e;
    -webkit-font-smoothing: antialiased;
    line-height: 1.6rem;
    letter-spacing: 0;
    margin: 0;
    overflow-x: hidden;
}

#write {
    max-width: 860px;
    margin: 0 auto;
    padding: 20px 30px 100px;
}

#write p {
    line-height: 1.6rem;
    word-spacing: .05rem;
}

#write ol li {
    padding-left: 0.5rem;
}

#write > ul:first-child,
#write > ol:first-child {
    margin-top: 30px;
}

body > *:first-child {
    margin-top: 0 !important;
}

body > *:last-child {
    margin-bottom: 0 !important;
}

a {
    color: #42b983;
    font-weight: 600;
    padding: 0 2px;
    text-decoration: none;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    position: relative;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-weight: bold;
    line-height: 1.4;
    cursor: text;
}

h1:hover a.anchor,
h2:hover a.anchor,
h3:hover a.anchor,
h4:hover a.anchor,
h5:hover a.anchor,
h6:hover a.anchor {
    text-decoration: none;
}

h1 tt,
h1 code {
    font-size: inherit !important;
}

h2 tt,
h2 code {
    font-size: inherit !important;
}

h3 tt,
h3 code {
    font-size: inherit !important;
}

h4 tt,
h4 code {
    font-size: inherit !important;
}

h5 tt,
h5 code {
    font-size: inherit !important;
}

h6 tt,
h6 code {
    font-size: inherit !important;
}

h2 a,
h3 a {
    color: #34495e;
}

h1 {
    padding-bottom: .4rem;
    font-size: 2.2rem;
    line-height: 1.3;
}

h2 {
    font-size: 1.75rem;
    line-height: 1.225;
    margin: 35px 0 15px;
    padding-bottom: 0.5em;
    border-bottom: 1px solid #ddd;
}

h3 {
    font-size: 1.4rem;
    line-height: 1.43;
    margin: 20px 0 7px;
}

h4 {
    font-size: 1.2rem;
}

h5 {
    font-size: 1rem;
}

h6 {
    font-size: 1rem;
    color: #777;
}

p,
blockquote,
ul,
ol,
dl,
table {
    margin: 0.8em 0;
}

li > ol,
li > ul {
    margin: 0 0;
}

hr {
    height: 2px;
    padding: 0;
    margin: 16px 0;
    background-color: #e7e7e7;
    border: 0 none;
    overflow: hidden;
    box-sizing: content-box;
}

body > h2:first-child {
    margin-top: 0;
    padding-top: 0;
}

body > h1:first-child {
    margin-top: 0;
    padding-top: 0;
}

body > h1:first-child + h2 {
    margin-top: 0;
    padding-top: 0;
}

body > h3:first-child,
body > h4:first-child,
body > h5:first-child,
body > h6:first-child {
    margin-top: 0;
    padding-top: 0;
}

a:first-child h1,
a:first-child h2,
a:first-child h3,
a:first-child h4,
a:first-child h5,
a:first-child h6 {
    margin-top: 0;
    padding-top: 0;
}

h1 p,
h2 p,
h3 p,
h4 p,
h5 p,
h6 p {
    margin-top: 0;
}

li p.first {
    display: inline-block;
}

ul,
ol {
    padding-left: 30px;
}

ul:first-child,
ol:first-child {
    margin-top: 0;
}

ul:last-child,
ol:last-child {
    margin-bottom: 0;
}

blockquote {
    border-left: 4px solid #42b983;
    padding: 10px 15px;
    color: #777;
    background-color: rgba(66, 185, 131, .1);
}

table {
    padding: 0;
    word-break: initial;
}

table tr {
    border-top: 1px solid #dfe2e5;
    margin: 0;
    padding: 0;
}

table tr:nth-child(2n),
thead {
    background-color: #fafafa;
}

table tr th {
    font-weight: bold;
    border: 1px solid #dfe2e5;
    border-bottom: 0;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
}

table tr td {
    border: 1px solid #dfe2e5;
    text-align: left;
    margin: 0;
    padding: 6px 13px;
}

table tr th:first-child,
table tr td:first-child {
    margin-top: 0;
}

table tr th:last-child,
table tr td:last-child {
    margin-bottom: 0;
}

#write strong {
    padding: 0 1px;
}

#write em {
    padding: 0 5px 0 2px;
}

#write table thead th {
    background-color: #f2f2f2;
}

#write .CodeMirror-gutters {
    border-right: none;
}

#write .md-fences {
    border: 1px solid #F4F4F4;
    -webkit-font-smoothing: initial;
    margin: 0.8rem 0 !important;
    padding: 0.3rem 0 !important;
    line-height: 1.43rem;
    background-color: #F8F8F8 !important;
    border-radius: 2px;
    font-family: var(--font-monospace);
    font-size: 0.85rem;
    word-wrap: normal;
}

#write .CodeMirror-wrap .CodeMirror-code pre {
    padding-left: 12px;
}

#write code, tt {
    padding: 2px 4px;
    border-radius: 2px;
    font-family: var(--font-monospace);
    font-size: 0.92rem;
    color: #e96900;
    background-color: #f8f8f8;
}

tt {
    margin: 0 2px;
}

#write .md-footnote {
    background-color: #f8f8f8;
    color: #e96900;
}

/* heighlight. */
#write mark {
    background-color: #EBFFEB;
    border-radius: 2px;
    padding: 2px 4px;
    margin: 0 2px;
    color: #222;
    font-weight: 500;
}

#write del {
    padding: 1px 2px;
}

.cm-s-inner .cm-link,
.cm-s-inner.cm-link {
    color: #22a2c9;
}

.cm-s-inner .cm-string {
    color: #22a2c9;
}

.md-task-list-item > input {
    margin-left: -1.3em;
}

@media print {
    html {
        font-size: 13px;
    }

    table,
    pre {
        page-break-inside: avoid;
    }

    pre {
        word-wrap: break-word;
    }
}

.md-fences {
    background-color: #f8f8f8;
}

.md-diagram-panel {
    position: static !important;
}

#write pre.md-meta-block {
    padding: 1rem;
    font-size: 85%;
    line-height: 1.45;
    background-color: #f7f7f7;
    border: 0;
    border-radius: 3px;
    color: #777777;
    margin-top: 0 !important;
}

.mathjax-block > .code-tooltip {
    bottom: .375rem;
}

#write > h3.md-focus:before {
    left: -1.5625rem;
    top: .375rem;
}

#write > h4.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write > h5.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

#write > h6.md-focus:before {
    left: -1.5625rem;
    top: .285714286rem;
}

.md-image > .md-meta {
    border-radius: 3px;
    font-family: var(--font-monospace);
    padding: 2px 0 0 4px;
    font-size: 0.9em;
    color: inherit;
}

.md-tag {
    color: inherit;
}

.md-toc {
    margin-top: 20px;
    padding-bottom: 20px;
}

.sidebar-tabs {
    border-bottom: none;
}

#typora-quick-open {
    border: 1px solid #ddd;
    background-color: #f8f8f8;
}

#typora-quick-open-item {
    background-color: #FAFAFA;
    border-color: #FEFEFE #e5e5e5 #e5e5e5 #eee;
    border-style: solid;
    border-width: 1px;
}

#md-notification:before {
    top: 10px;
}

/** focus mode */

.on-focus-mode blockquote {
    border-left-color: rgba(85, 85, 85, 0.12);
}

header,
.context-menu,
.megamenu-content,
footer {
    font-family: var(--font-sans-serif);
}

.file-node-content:hover .file-node-icon,
.file-node-content:hover .file-node-open-state {
    visibility: visible;
}

.mac-seamless-mode #typora-sidebar {
    background-color: var(--side-bar-bg-color);
}

.md-lang {
    color: #b4654d;
}

.html-for-mac .context-menu {
    --item-hover-bg-color: #E6F0FE;
}




.md-fences{margin-left:0!important}
.outline-item-active{background:#6fd18d;color:#fff;}
.outline-content li, .outline-content ul{margin:5px 0!important; }
.ul-list{margin:0!important}
.blockquote{margin:10px 0!important;padding:10px!important;border-color:#6fd047!importnat;}
img{padding:15px!important;background:#f8f8f8!important;}

#write{max-width:1120px!important;}
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6{color:##5fb93a!important;font-weight:700!important;}
#write h1:before{content:"🏆";padding-right:4px;display:inline-block;}
#write h2:before{content:"📚";padding-right:4px;display:inline-block;}
#write h3:before{content:"🍎";padding-right:4px;display:inline-block;}
#write h4:before{content:"🍊";padding-right:4px;display:inline-block;}
#write h5:before{content:"🍭";padding-right:4px;display:inline-block;}
#write h6:before{content:"🍉";padding-right:4px;display:inline-block;}

```

优化设置

首先打开你要优化的主题设置，然后选择需要的css文件，将以下内容放入最下方即可！

```css
.md-fences{margin-left:0!important}
.outline-item-active{background:#6fd18d;color:#fff;}
.outline-content li, .outline-content ul{margin:5px 0!important; }
.ul-list{margin:0!important}
.blockquote{margin:10px 0!important;padding:10px!important;border-color:#6fd047!importnat;}
img{padding:15px!important;background:#f8f8f8!important;}

#write{max-width:1120px!important;}
#write h1, #write h2, #write h3, #write h4, #write h5, #write h6{color:##5fb93a!important;font-weight:700!important;}
#write h1:before{content:"🍁";padding-right:4px;display:inline-block;}
#write h2:before{content:"🌳";padding-right:4px;display:inline-block;}
#write h3:before{content:"🌷";padding-right:4px;display:inline-block;}
#write h4:before{content:"🌼";padding-right:4px;display:inline-block;}
#write h5:before{content:"🌻";padding-right:4px;display:inline-block;}
#write h6:before{content:"🥦";padding-right:4px;display:inline-block;}
```

