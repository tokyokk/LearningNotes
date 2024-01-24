---
# 当前页面内容标题
title: Zepto.js_移动端
# 分类
category:
  - jquery
# 标签
tag: 
  - jquery
  - zepto
  - javascript
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: true
# 是否将该文章添加至时间线中
timeline: true
---

## Zopto 入门

- 什么是zepto: 一个轻量的js库，专为移动端定制，与jQuery有着类似的API
- zepto的特点:
  - 针对移动端
  - 轻量级
  - 响应快
  - 语法与jQuery类似

## 与[jQuery](https://jquery.com/)相同的API

- zepto与jQuery同样适用`$`,`$`对象的方法，`$`实例的方法

- 与jQuery相同的事件绑定函数==??==
  
  - on() 绑定事件处理程序
    
    - off() 方法移除用目标元素on绑定的事件处理程序。
    
    - bind() 为每个匹配元素的特定事件绑定事件处理函数，可同时绑定多个事件，也可以自定义事件。
    
    - one() 为每一个匹配元素的特定事件（像click）绑定一个一次性的事件处理函数。只执行一次。
    
    - trigger() 触发有bind定义的事件（通常是自定义事件）
    
    - unbind() bind的反向操作，删除匹配元素所绑定的bind事件。

## 与jQuery相同的[API](https://so.csdn.net/so/search?q=API&spm=1001.2101.3001.7020)

- `attr`与`prop`
  
  - `prop` 多用于固定的属性(href,class…)，布尔属性
  
  - `attr` 多用在自定义属性上
  
  - `prop` 在读取属性的时候优先级高于`attr`所以读取bool的时候有限prop
  
  - 在jQuery中使用prop获取bool属性并且bool属性在标签内没有定义会得到undefined，有定义(因为是bool)会返回属性值，例如`$obj.prop("selected")`会返回`undefined`/`selected`
  
  - 在zepto中会返回`false/selected`
  
  - 在zepto中1.2+才支持`removeProp()`,但是1.0就支持 `removeAttr()`

- 配置对象
  
  - 在jQuery中在文档加载之后通过js加入的元素是没有绑定事件的(eg:`$obj.append("<p>132</p>")`)
  
  - 在zepto中是支持这个操作的，我们希望对加入的元素加以修饰，加上例如id等(虽然可能还是不能绑定事件)

```js
    $obj.append("<p>132</p>",{
        id:"insert"
    });
```

- each
  
  - 在jQuery中each可以遍历数组(index-elemwnt)，对象(key-value)，不可以遍历字符串
  
  - zepto三者全部支持，字符串是按照字符数组遍历的，还可以以"纯字符串"的形式遍历json

- width()、height()
  
  - 在jQuery中
    
    - width()/height()获取的是元素content区的宽高，没有px
    
    - .css(“width”),.css(“height”)是content区的宽高有px
    
    - `innerHeight()`,`outerWidth()`一个不包含padding一个包含
    
    - 可以获取隐藏元素的宽高，数值来自css设置
  
  - 在zepto中
    
    - width()/height()根据compute的盒模型取值，没有px
    
    - 没有`innerHeight()`,`outerWidth()`
    
    - .css(“width”)可以获取内容区的宽高有px
    
    - zepto无法获取隐藏元素的宽高

- 事件委托
  
  - 将子元素的事件委托给父元素,利用的是冒泡的原理,实现了创建对象绑定事件
  
  - 在jQuery中可以使用live/delegate/on函数实现事件委托,但是live在jQuery1.7+废除了

```js
  $("#box").on("click",'.a',function(){
    alert("a类元素触发");
    console.log(this);
  });
  $("#box").delegate("click",'.a',function(){
    alert("a类元素触发")
    console.log(this);
  });
```

两个this都是子元素(".a")

- 在zepto中,准备废弃delegate,最好使用on

- zepto大坑:
  
  - zepto执行的时候会将所有的委托放到一个队列里面(顺序是在代码中出现的顺序)
  
  - 当一个委托事件被触发,这个元素会出队,执行完成后会向后看,后面符合以下条件的事件都会被执行
  
  - 两个事件委托给了同一个元素,或者前面的委托是后面的子元素
  
  - 委托事件是相同的
  
  - 操作类进行关联(例如.a的回调函数中修改.a为.b,同时.b也有委托)
  
  - 顺序在之后

例如

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div>div{
            width: 100px;
            height: 100px;
            background-color: #bfa;
        }
        .b{
            background-color: #f00;
        }
    </style>
</head>
<body>
    <div id="OUT">
        <div class="a">A</div>
        <div class="b">B</div>
        <div class="a">C</div>
    </div>
</body>
<script src="./js/zepto.js"></script>
<script>
    $("#OUT").on("touchstart",".a",function(){
        alert("A on");
        $(this).removeClass("a").addClass("b");
    });
    $("#OUT").on("touchstart",".b",function(){
        alert("B on");
        $(this).removeClass("b").addClass("a");
    });
</script>
</html> 
```

被委托元素是另一个的子元素

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        div>div{
            width: 100px;
            height: 100px;
            background-color: #bfa;
        }
        .b{
            background-color: #f00;
        }
    </style>
</head>
<body>
    <div id="OUT">
        <div class="a">A</div>
        <div class="b">B</div>
        <div class="a">C</div>
    </div>
</body>
<script src="./js/zepto.js"></script>
<script>
    $("#OUT").on("touchstart",".a",function(){
        alert("A on");
        $(this).removeClass("a").addClass("b");
    });
    $("body").on("touchstart",".b",function(){
        alert("B on");
        $(this).removeClass("b").addClass("a");
    });
</script>
</html> 
```

但是如果我们点击第一个按钮会发现他虽然关联到了b,执行了b的委托,但是在两个alert之间并没有看到b样式,这涉及到了网页的重绘与重排,第一个alert执行结束,js准备开始重排,但是js是单线程,于是分线程开始重排,主线程继续查找委托,主线程更快,直接发现了b的alert,通过alert阻塞了分线程,之后有重新叫了分线程,让他重排成a

- touchstart与click
  
  - jQuery是click
  
  - zepto是touchstart
  
  - click在移动端可用但是有300ms的延迟

- zepto touch方法
  
  - tap() 点击事件 利用在document上绑定touch事件来模拟tap事件的，并且tap事件会冒泡到document上
  
  - singleTap() 点击事件
  
  - doubleTap() 双击事件
  
  - longTap() 当一个元素被按住超过750ms触发。
  
  - swipe, swipeLeft, swipeRight, swipeUp, swipeDown, 当元素被划过（同一个方向大于30px）时触发。(可选择给定的方向)在一个方向滑动大于30px即为滑动。否则算点击。
  
  - 为了使用上面的函数可能需要禁止元素的默认行为,可以在css中写下touch-action:none禁止

## 网页的重绘与重排

- 重绘是重新渲染(背景色,透明度…)
- 重排是文档结构进行变化

## [表单](https://so.csdn.net/so/search?q=%E8%A1%A8%E5%8D%95&spm=1001.2101.3001.7020)机制

- `$obj.serialize()`可以将$obj表单编译成提交的时候的字符串,例如

```js
  console.log($("form).serialize());
```

其中不可选的元素会直接忽略,没有选中的checkbox,buttons会直接忽略

- $obj.serializeArray()将上述获得的内容转化为Array存储

- $obj.submit(),为submit事件绑定一个处理函数,或者触发元素的submit事件,当function没有给出的时候会触发submit,执行默认的提交行为

```js
$("form").submit();
```

会持续不断的一直提交表单,因为()没有处理函数,没有取消默认行为,一般这么用

```js
$("form").submit(function(e){
  e.preventDefault();
  alert("我准备处理点别的东西");
  ...
  ajax函数...
});
```

## ajax

没学过,先占坑

- 如何取消一个ajax请求 ----abort()方法–取消当前请求。
  
  - 场景：点击获取验证码的按钮，用户十秒时候可以再次获取，当十秒过后第一次请求没有返回，用户再次点击获取
  
  - 然后因为网速好或者其他原因，两次请求同时返回，该怎么解决
    //需求用户可以再次点击的时候取消之前的请求。
  
  - disabled 禁止用户点击，操作按钮，表单项的时候只是针对click事件，并没有对touch事件作出处理。

## 移动端实例

```js
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no" />
  <title>尚硅谷_zepto实战_练习</title>
  <link rel="stylesheet" href="css/reset.css">
  <link rel="stylesheet" href="./css/style.css">
</head>
<body>

<div id="container">
  <div class="page page-1-1" style="z-index:1">
    <img class="img_1 pt-page-moveFromTop" src="./img/cover.png">
    <img class="img_2 pt-page-moveFromLeft" src="./img/wording_cover.png">
    <img class="img_3 icon-up arrow_img" src="./img/icon_up.png">
  </div>

  <div class="page page-2-1 hide">
    <img class="img_1 pt-page-moveFromBottom" src="img/wording.png" />
    <img class="img_2 moveCircle" src="img/circle.png" />
    <img class="img_3 pt-page-moveFromLeft" src="img/people.png" />
    <img class="img_4 " src="img/dot1.png" />
    <img class="img_5 textScale" src="img/check_develop.png" />
    <img class="img_6 icon-up arrow_img" src="img/icon_up.png" />
    <img class="img_7 " src="img/floating_develop.png" />
  </div>

  <div class="page page-2-2 hide">
    <img class="img_1 " src="img/introduction.png" />
    <img class="img_2 " src="img/btn_develop.png" />
    <img class="img_3 " src="img/dot2.png" />
    <img class="img_6 icon-up arrow_img" src="img/icon_up.png" />
  </div>
</div>

<script type="text/javascript" src="./js/zepto.js"></script>
<script type="text/javascript" src="./js/touch.js"></script>
<script src="./js/script.js"></script>
</body>
</html>
```

```js
*{
    touch-action: none;
}

#container{
    // 公共样式
    width: 100%;
    height: 100%;
    .page{
        z-index: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        img[class^=img]{
            height: auto;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
        }
        .arrow_img{
            height: auto;
            width: 25px;
            top: 90%;
        }
    }  

    .page-1-1{background: #083846;}
    .page-2-1{background: #9261BF;}
    .page-2-2{background: #9261BF;}

    // 局部样式
    .page-1-1{
        .img_1{
            top: 1%;
            width: 248px;
        }
        .img_2{
            width: 185px;
            top: 62%;
        }
    }

    .page-2-1{
        .img_1{
            width: 158px;
            top: 2%;
            z-index:2;
        }
        .img_2{
            width: 240px;
            top: 28%;
        }
        .img_3{
            width: 241px;
            top: 36%;
        }
        .img_4{
            width: 20px;
            top: 87%;
        }
        .img_5{
            width: 142px;
            top: 82%;
        }
        .img_7{
            width: 248px;
            top: 8%;
        }
    }

    .page-2-2{ 
        .img_1 {
            width:293px;
            left:50%;
        }
        .img_2 {
            width:260px;
            top:75%;
        }
        .img_3 {
            width:20px;
            top:87%;
        }
        .img_6 {
            width:25px;
            top:92%;
        }
    }
}

.hide{
    display: none;
}

.currpage{
    z-index: 1;
}

// animation

.pt-page-moveToTop{
    animation: moveToTop 0.6s ease both;
}

.pt-page-moveFromBottom{
    animation: moveFromBottom 0.6s ease both;
}

.pt-page-moveToBottom{
    animation: moveToBottom 0.6s ease both;
}

.pt-page-moveFromTop{
    animation: moveFromTop 0.6s ease both;
}

.pt-page-moveToLeft{
    animation: moveToLeft 0.6s ease both;
}

.pt-page-moveFromRight{
    animation: moveFromRight 0.6s ease both;
}

.pt-page-moveToRight{
    animation: moveToRight 0.6s ease both;
}

.pt-page-moveFromLeft{
    animation: moveFromLeft 0.6s ease both;
}

.moveCircle{
    animation: moveCircle 1s ease both;
}

.textScale{
    animation: textScale 1s ease both;
}

.page-2-2>*{
    transform-origin: 0% 0%;
    animation: fanzhuan 1s ease both;
}

.icon-up{
    animation: iconUp 2s ease both infinite;
}

.pt-page-pageMoveToTop{
    animation: pageMoveToTop  2s ease both;
}

.pt-page-pageMoveFromBottom{
    animation: pageMoveFromBottom  2s ease both;
}

.pt-page-pageMoveToBottom{
    animation: pageMoveToBottom  2s ease both;
}

.pt-page-pageMoveFromTop{
    animation: pageMoveFromTop  2s ease both;
}

.pt-page-pageMoveToLeft{
    animation: pageMoveToLeft  2s ease both;
}

.pt-page-pageMoveFromRight{
    animation: pageMoveFromRight  2s ease both;
}

.pt-page-pageMoveToRight{
    animation: pageMoveToRight  2s ease both;
}

.pt-page-pageMoveFromLeft{
    animation: pageMoveFromLeft  2s ease both;
}

@keyframes moveToTop{
    from{}
    to{transform: translate(-50%,-100%);}
}

@keyframes moveFromBottom{
    from{transform: translate(-50%,100%);}
    to{}
}

@keyframes moveToBottom{
    from{}
    to{transform: translate(-50%,100%);}
}

@keyframes moveFromTop{         
    from{transform: translate(-50%,-100%);}
    to{}
}

@keyframes moveToLeft{
    from{}
    to{transform: translateX(-100%);}
}

@keyframes moveFromRight{
    from{transform: translateX(100%);}
    to{}
}

@keyframes moveToRight{
    from{}
    to{transform: translateX(100%);}
}

@keyframes moveFromLeft{
    from{left:0;transform: translateX(-100%);}
    to{}
}

@keyframes iconUp{
    0%{
        transform: translate(-50%,100%);
        opacity: 0;
    }
    50%{
        opacity: 1;
    }
    100%{
        transform: translate(-50%,-100%);
        opacity: 0;
    }
}

@keyframes moveCircle{
    0%{
        transform: translate(-50%,20%);
        opacity: 0;
    }
    20%{
        transform: translate(-50%,-16%);
    }
    40%{
        transform: translate(-50%,12%);
    }
    60%{
        transform: translate(-50%,-9%);
    }
    80%{
        transform: translate(-50%,7.2%);
    }
    100%{}
}

@keyframes textScale{
    0%{
        transform: scale(0.4);
        opacity: 0;
    }
    100%{}
}

@keyframes fanzhuan{
    from{
        transform: rotateY(-90deg);
    }
    to{}
}

@keyframes pageMoveToTop{
    from{}
    to{transform: translate(0,-100%);}
}

@keyframes pageMoveFromBottom{
    from{transform: translate(0,100%);}
    to{}
}

@keyframes pageMoveToBottom{
    from{}
    to{transform: translate(0,100%);}
}

@keyframes pageMoveFromTop{         
    from{transform: translate(0,-100%);}
    to{}
}

@keyframes pageMoveToLeft{
    from{}
    to{transform: translateX(-100%);}
}

@keyframes pageMoveFromRight{
    from{transform: translateX(100%);}
    to{}
}

@keyframes pageMoveToRight{
    from{}
    to{transform: translateX(100%);}
}

@keyframes pageMoveFromLeft{
    from{left:0;transform: translateX(-100%);}
    to{}
}
```

```js
$(function(){
    var now={x:1,y:1};
    var lst={x:0,y:0};
    var tmp={x:0,y:0};
    var direction={up:1,right:2,down:3,left:4}
    function movePage(dir){
        tmp.x=lst.x;
        tmp.y=lst.y;
        lst.x=now.x;
        lst.y=now.y;
        var inClass="",outClass="";
        switch (dir){
            case direction.up:
                outClass="pt-page-pageMoveToTop";
                inClass="pt-page-pageMoveFromBottom";
                now.x+=1;
                break;
            case direction.right:
                outClass="pt-page-pageMoveToRight";
                inClass="pt-page-pageMoveFromLeft";
                now.y-=1;
                break;
            case direction.down:
                outClass="pt-page-pageMoveToBottom";
                inClass="pt-page-pageMoveFromTop";
                now.x-=1;
                break;
            case direction.left:
                outClass="pt-page-pageMoveToLeft";
                inClass="pt-page-pageMoveFromRight";
                now.y+=1;
                break;
        }
        var lastPage=".page-"+lst.x+"-"+lst.y,nowPage=".page-"+now.x+"-"+now.y;
        if($(nowPage).length==0){
            now.x=lst.x;
            now.y=lst.y;
            lst.x=tmp.x;
            lst.y=tmp.y;
        }
        $(nowPage).css("zIndex",$(lastPage).css("zIndex")+1)
        $(nowPage).removeClass("hide").addClass(inClass);
        $(nowPage).children().addClass("hide")
        $(lastPage).removeClass("hide").addClass(outClass);
        setTimeout(function(){
            $(nowPage).removeClass("hide").removeClass(inClass);
            $(lastPage).addClass("hide").removeClass(outClass);
            $(nowPage).children().removeClass("hide")
        },2000)
    }

    $(".page").swipeUp(function(){
        movePage(direction.up);
    })

    $(".page").swipeDown(function(){
        movePage(direction.down);
    })

    $(".page").swipeRight(function(){
        movePage(direction.right);
    })

    $(".page").swipeLeft(function(){
        movePage(direction.left);
    })

});
```
