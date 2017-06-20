// VE.config = {
//     DEBUG: false
// }
var ele = document.querySelector('#Ve');
var vem1 = new VE({
    el: ele,
    data: {
        a: 'this is a',
        b: Date(),
        c: 'asdasdsad',
        d: {
            d1: 'd1d1d1',
            d2: 'd2d2d2'
        }
    },
    methods: {
        showHello: function (data, test) { 
            alert('hello!');
            console.log(data);
            console.log(test);
        }
    },
    watch: {
        a: function (oldValue, newValue) {
            console.log('watch a!!!');
        }
    }
});