// VE.config = {
//     DEBUG: false
// }
var vem1 = new VE({
    el: '#Ve',
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