(function (window, document) {
    function VE (options) { //---VE构造函数
        /**
         * options: {
         *  data: {
         *    key: value
         *  }
         * }
         */

         //---虚拟dom
         this.__virtualDom = [];


        if (typeof options != 'object') {  throw new Error('not is an object'); }
        var data = options.data;
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

        autoRender.call(this);
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
            var veBind = node.getAttribute('ve-bind'), html = node.innerHTML, reg = /(\{\{\s*)(\S*)(\s*\}\})/;
            if (typeof veBind == 'string') {
                var value = that[veBind];
                if (!that.__virtualDom[veBind]) {
                    that.__virtualDom[veBind] = [
                       { node: node }
                    ]
                } else {
                    that.__virtualDom[veBind].push({ node: node });
                }
                node.innerHTML = value;
            } else if (node.tagName != 'BODY' && reg.test(html)) {
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