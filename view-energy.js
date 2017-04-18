(function (window, document) {
    function VE (options) { //---VE构造函数
        /**
         * options: {
         *  data: {
         *    key: value
         *  },
         *  methods: {
         *    fun1: function () {
         *    }
         *  }
         * }
         */

         //---虚拟dom
         this.__virtualDom = [];


        if (typeof options != 'object') {  throw new Error('not is an object'); }
        var data = options.data, methods = options.methods;
        if (typeof data == 'object') { //---处理data(model)
            for (var key in data) {
                Object.defineProperty(this, key, {
                    configurable: false,
                    enumerable: false,
                    get: function () {
                        return data[key];
                    },
                    set: function (newValue) {
                        console.time('view同步成功，共计用时：');
                        var that = this;
                        if (data[key] != newValue) {
                            data[key] = newValue;
                            console.log('set a newValue====', newValue);
                            if('undefined' != typeof that.__virtualDom[key] && that.__virtualDom[key].length > 0) {
                                that.__virtualDom[key].forEach(function(element) {
                                   if (!element.html) { //---使用指令绑定的情况
                                       element.node.innerHTML = newValue;
                                   } else { //---使用{{ javascript }}形式绑定的情况
                                       element.node.innerHTML = element.html.replace(/(\{\{\s*)(\S*)(\s*\}\})/, function (match, p1, p2, p3) {
                                            return that[p2];
                                       });
                                   }
                                });
                            }
                        }
                        console.timeEnd('view同步成功，共计用时：');
                    }
                });
            }
        }
        /**
         *  methods处理暂时写作匿名函数自调，防止变量污染
         *  以后将data和methods处理单独封装方法
         */
        (function () {
            var methods = options.methods;
            if (typeof methods == 'object') { //处理methods
                for (var key in methods) {
                    Object.defineProperty(this, key, {
                        configurable: false,
                        enumerable: false,
                        get: function () {
                            return methods[key];
                        },
                        set: function (newValue) {
                            console.error('目前不能直接为methods赋值');
                        }
                    });
                }
            }
        }).call(this);
        console.time('初次渲染共计用时：');
        autoRender.call(this);
        console.timeEnd('初次渲染共计用时：');
    }
    //end---VE构造函数

    VE.prototype.$reload = traversal;


    /**
     * 使用递归的方式先序遍历DOM树
     * @param node 根节点
     */
    function traversal(node) { //---第一次渲染时调用，将data和__virtualDom关联
        if ('undefined' == typeof node) { node = document.body; }
        var that = this;
        //对node的处理
        if(node && node.nodeType === 1) {
            var veBind = node.getAttribute('ve-bind'), html = node.innerHTML, reg = /(\{\{\s*)(\S*)(\s*\}\})/,
                veClick = node.getAttribute('ve-click');
            if (typeof veBind == 'string') { //---veBind
                var value = that[veBind];
                if (!that.__virtualDom[veBind]) {
                    that.__virtualDom[veBind] = [
                       { node: node }
                    ]
                } else {
                    that.__virtualDom[veBind].push({ node: node });
                }
                node.innerHTML = value;
            } else if (node.tagName != 'BODY' && reg.test(html)) { //--- {{ javascript }}
                html = html.replace(reg, function (match, p1, p2, p3) {
                    if (!that.__virtualDom[p2]) {
                        that.__virtualDom[p2] = [
                        { node: node, html: html }
                        ]
                    } else {
                        that.__virtualDom[p2].push({ node: node, html: html });
                    }
                    return that[p2];
                });
                node.innerHTML = html;
            }
            if (typeof veClick == 'string') { //---veClick
                var handleClick = that[veClick];
                //===添加事件，以及写入__virtualDom
                node.addEventListener('click', handleClick.bind(this), false);
            }
        }
        var i = 0, childNodes = node.childNodes,item;
        for(; i < childNodes.length ; i++){
            item = childNodes[i];
            if(item.nodeType === 1){
                //递归先序遍历子节点
                traversal.call(that, item);
            }
        }
    }

     //---视图层view, dom操作方法
    function autoRender() {
        var DOM = document.all, virtualDom = [], html = '', body = document.body;
        traversal.call(this, body);
    }

    return window.VE = VE;
})(window, document);