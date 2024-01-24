---
# 当前页面内容标题
title: 打造最舒适的vscode编辑器
# 分类
category:
  - vscode
# 标签
tag: 
  - vscode
  - 开发工具
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## Vscode配置setting.json文件

俗话说的好，工欲善其事，必先利其器。想要优雅且高效的编写代码，必须熟练使用一款前端开发工具。但前端开发工具数不胜数，像HBuilder、Sublime Text、WebStorm、Visual Studio Code......等等,其中VSCode以其轻量且强大的代码编辑功能和丰富的插件生态系统，独受前端工师的青睐。网上有很多vscode的配置以及使用博客，但都没有本篇那么详细且全面。

```json
{
    "search.followSymlinks": false,
    "editor.formatOnSave": false,
    "window.zoomLevel": 0.3,
    // #每次保存的时候将代码按eslint格式进行修复
    "eslint.autoFixOnSave": false,
    "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    "emmet.syntaxProfiles": {
        "javascript": "jsx",
        "vue": "html",
        "vue-html": "html"
    },
    "editor.tabSize": 4,
    "files.associations": {
        "*.vue": "vue",
        "*.js": "javascriptreact" //使得js默认使用react图标
    },
    "eslint.options": {
        "extensions": [
            ".js",
            ".vue"
        ]
    },
    "search.exclude": {
        "**/node_modules": true,
        "**/bower_components": true,
        "**/dist": true
    },
    "git.confirmSync": false,
    "javascript.implicitProjectConfig.experimentalDecorators": true,
    "editor.cursorBlinking": "smooth",
    "editor.minimap.enabled": true,
    "editor.minimap.renderCharacters": false,
    "window.title": "${dirty}${activeEditorMedium}${separator}${rootName}",
    "editor.codeLens": true,
    "editor.snippetSuggestions": "top",
    "editor.fontWeight": "normal",
    "editor.fontSize": 14,
    "editor.rulers": [
        //代码长度
        120
    ], //主题
    "workbench.iconTheme": "vscode-icons",
    "terminal.integrated.rendererType": "dom",
    "liveServer.settings.donotShowInfoMsg": true,
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": true
    },
    "git.autofetch": true,
    "git.enableSmartCommit": true, //图标
    // 左侧不折叠的标签，其余标签会折叠
    "volar.splitEditors.layout.left": [
        "template",
        "script",
        "scriptSetup"
    ],
    // 右侧不折叠的标签，其余标签会折叠
    "volar.splitEditors.layout.right": [
        "styles",
        "customBlocks"
    ],
    "volar.autoCompleteRefs": true,
    // #这个按用户自身习惯选择 ， html 使用 beautify
    "vetur.format.defaultFormatter.html": "js-beautify-html",
    // "javascript.format.insertSpaceBeforeFunctionParenthesis": true,
    // 设置下面这组会执行prettier格式
    // "vetur.format.defaultFormatter.html": "prettyhtml",
    "vetur.format.defaultFormatter.css": "prettier", //  css
    "vetur.format.defaultFormatter.postcss": "prettier", // postcss
    "vetur.format.defaultFormatter.scss": "prettier", // scss
    "vetur.format.defaultFormatter.less": "prettier", // less
    "vetur.format.defaultFormatter.stylus": "stylus-supremacy", //stylus
    "vetur.format.defaultFormatter.ts": "prettier", // ts
    "vetur.format.defaultFormatter.sass": "sass-formatter", // sass
    "vetur.validation.template": false, //vscode中关于vue的一个语法检查插件，v-for的错可以解决
    "vetur.format.defaultFormatterOptions": {
        "wrap_attributes": "force-aligned",
        "js-beautify-html": {
            // - auto: 仅在超出行长度时才对属性进行换行。
            // - force: 对除第一个属性外的其他每个属性进行换行。
            // - force-aligned: 对除第一个属性外的其他每个属性进行换行，并保持对齐。
            // - force-expand-multiline: 对每个属性进行换行。
            // - aligned-multiple: 当超出折行长度时，将属性进行垂直对齐。
            "wrap_attributes": "force-aligned"
            // #vue组件中html代码格式化样式,可选
            // "wrap_line_length": 200,
            // "end_with_newline": false,
            // "semi": true,
            // "singleQuote": true
        },
        "prettier": {
            //设置分号
            "semi": false,
            //双引号变成单引号
            "singleQuote": true,
            //禁止随时添加逗号,这个很重要。找了好久
            "trailingComma": "none"
        }
    },
    "[jsonc]": {
        "editor.defaultFormatter": "vscode.json-language-features"
    },
    "[javascript]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "[javascriptreact]": {
        "editor.defaultFormatter": "vscode.typescript-language-features"
    },
    "editor.formatOnPaste": true,
    "editor.unicodeHighlight.allowedLocales": {
        "zh-hant": true
    },
    "[typescript]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[json]": {
        "editor.defaultFormatter": "HookyQR.beautify"
    },
    // prettier配置
    "prettier.printWidth": 120, // 超过最大值换行
    "prettier.tabWidth": 4, // 缩进字节数
    "prettier.useTabs": false, // 缩进不使用tab，使用空格
    "prettier.semi": false, // 句尾添加分号
    "prettier.singleQuote": true, // 使用单引号代替双引号
    "prettier.proseWrap": "preserve", // 默认值。因为使用了一些折行敏感型的渲染器（如GitHub comment）而按照markdown文本样式进行折行
    "prettier.arrowParens": "avoid", // (x) => {} 箭头函数参数只有一个时是否要有小括号。avoid：省略括号
    "prettier.bracketSpacing": true, // 在对象，数组括号与文字之间加空格 "{ foo: bar }"
    "prettier.endOfLine": "auto", // 结尾是 \n \r \n\r auto
    "prettier.eslintIntegration": false, //不让prettier使用eslint的代码格式进行校验
    "prettier.htmlWhitespaceSensitivity": "ignore",
    "prettier.ignorePath": ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
    "prettier.jsxBracketSameLine": false, // 在jsx中把'>' 单独放一行
    "prettier.jsxSingleQuote": false, // 在jsx中使用单引号代替双引号
    "prettier.parser": "babylon", // 格式化的解析器，默认是babylon
    "prettier.requireConfig": false, // Require a 'prettierconfig' to format prettier
    "prettier.stylelintIntegration": false, //不让prettier使用stylelint的代码格式进行校验
    "prettier.trailingComma": "es5", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
    "prettier.tslintIntegration": false, // 不让prettier使用tslint的代码格式进行校验
    "trailingComma": "none", // 函数最后不需要逗号
    "editor.detectIndentation": false,
    "editor.insertSpaces": false,
    "[vue]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "editor.defaultFormatter": "esbenp.prettier-vscode",
    "vue3snippets.tabWidth": 4,
    "vue3snippets.semi": true,
    "vue3snippets.useTabs": true,
    "vue3snippets.trailingComma": "none", //  prettier-在对象，数组括号与文字之间加空格 "{ foo: bar }"
    // #让vue中的js按"prettier"格式进行格式化
    "vetur.format.defaultFormatter.js": "prettier",
    "[html]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "[css]": {
        "editor.defaultFormatter": "esbenp.prettier-vscode"
    },
    "search.collapseResults": "auto",
    "bracket-pair-colorizer-2.depreciation-notice": false,
    "[markdown]": {
        "editor.unicodeHighlight.ambiguousCharacters": false,
        "editor.unicodeHighlight.invisibleCharacters": false,
        "diffEditor.ignoreTrimWhitespace": false,
        "editor.wordWrap": "on",
        "editor.quickSuggestions": {
            "comments": "off",
            "strings": "off",
            "other": "off"
        },
        "cSpell.fixSpellingWithRenameProvider": true,
        "cSpell.advanced.feature.useReferenceProviderWithRename": true,
        "cSpell.advanced.feature.useReferenceProviderRemove": "/^#+\\s/"
    },
    "redhat.telemetry.enabled": true,
    // sass配置
    "liveSassCompile.settings.formats": [
        {
            /*
                    :nested:嵌套风格
                    :expanded:展开格式
                    :compact:紧凑格式
                    :compressed:压缩格式
            */
            "format": "expanded", // 可定制的出口css样式（expanded，compact，compressed，nested）
            "extensionName": ".css", 
            "savePath": "~/../css/"  // 为null表示当前目录
        },
    ],
    /* 是否生成对应的map   */
    "liveSassCompile.settings.generateMap": true,
    /* 是否添加兼容前缀 例如：-webkit- -moz-  ...等*/
    "liveSassCompile.settings.autoprefix": [
        "ie >= 6", //ie6以上
        "firefox >= 8",
        "chrome >= 24",
        "Opera>=10"
    ],
    /* 排除目录 */
    "liveSassCompile.settings.excludeList": [
        "/**/node_modules/**",
        "/.vscode/**"
    ],
    "[sass]": {
        "editor.defaultFormatter": "michelemelluso.code-beautifier"
    },
    "editor.bracketPairColorization.independentColorPoolPerBracketType": true,
    "tabnine.experimentalAutoImports": true,
    "security.workspace.trust.untrustedFiles": "open",
    "Codegeex.Privacy": true,
}
```

## vscode插件

- Vibrancy Continued  +  Fix VSCode Checksums（重点推荐）
