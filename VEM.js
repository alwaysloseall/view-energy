// VE.config = {
//     DEBUG: false
// }
var vem1 = new VE({
    data: {
        a: 'this is a',
        b: Date(),
        c: 'asdasdsad'
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