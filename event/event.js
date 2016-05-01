// 声明事件对象
var EventEmitter = require('events').EventEmitter;
var event = new EventEmitter();
// 注册事件
var i = 0;
event.on('some_event', function () {
	i++;
	console.log('这是一个自定义事件对象' + i);
});
//触发事件
setInterval(function () {
	event.emit('some_event');
}, 1000);
