# view-energy
a view-model Driver

## 这个是什么？
* 没事的时候自己撸的一个小框架
* 设计思想来自avalon，采用了Object.defineProperty，使用方式跟vue类似
* 现在只做好了view跟view-model的绑定，空闲之间可以撸着玩做之后的内容
* API 文档：[API Reference](https://github.com/alwaysloseall/view-energy#api-reference)

## Getting Started

```html
    <!DOCTYPE html>
    <html>
    <head lang="en">
        <meta charset="UTF-8">
        <title>view-energy</title>
    </head>
    <body>
        <div>{{ hello }}</div>
        <div ve-bind="hello"></div>
        <script src="view-energy.js"></script>
    </body>
    </html>
```

```javascript
    var Vem = new VE({
        data: {
           hello: 'Hello World'
        }
    });
```
### Result
> Hello World

> Hello World

### Try Change
```javascript
    Vem.hello = 'Hello!';
```

### Result
> Hello！

> Hello！


## API Reference
### VE(options)
> VE构造函数创建一个VE实例,options为一个对象
- ```options``` Object
    - ```el``` String | HTMLElement - 一个检索元素的字符串，或者一个已存在的DOM元素，在实例挂载之后可以通过```vem.$el```访问。
    - ```data``` Object-
    实例内的model数据，每个键都可以被```vem[key]```所访问，修改值会触发view的同步
    - ```methods``` Object-
    实例内的方法，每个键都可以通过```vem[key]()```调用，也可以在html上面调用
    - ```watch``` Object-
    监听实例上的model变化
### VE.config
> 全局配置项
```javascript
    VE.config = {
        DEBUG: false //关闭debug，默认为开启
    }
```
### 哇我要哭出来了 以后再写！！