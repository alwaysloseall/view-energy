// VE.config = {
//     DEBUG: false
// }
var ele = document.querySelector('#Ve');
var vem1 = new VE({
    el: ele,
    data: {
        a: 'this is a',
        b: Date(),
        c: 'asdasdsad'
    },
    methods: {
        showHello: function () {
            alert('hello!');
            console.log(this);
        }
    },
    watch: {
        a: function (oldValue, newValue) {
            console.log('watch a!!!');
        }
    }
});