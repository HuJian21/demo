var event = require('events');
var EventEmitter = new event.EventEmitter();
// 可以定义多个监听器
EventEmitter.on('test', function (ele1, ele2) {
    console.log('Listen1 ' + ele1 + ', ' + ele2);
});
EventEmitter.on('test', function (ele1, ele2) {
    console.log('Listen2 ' + ele1 + ', ' + ele2);
});

EventEmitter.emit('test','Jian',2016);