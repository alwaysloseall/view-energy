# view-energy
a view-model Driver

## 这个是什么？
* 没事的时候自己撸的一个小框架
* 设计思想来自avalon，采用了Object.defineProperty，使用方式跟vue类似
* 现在只做好了view跟view-model的绑定，空闲之间可以撸着玩做之后的内容

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
> Hello

> Hello