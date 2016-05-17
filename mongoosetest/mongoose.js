var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test');
db.connection.on('open', function () {
    console.log('数据库连接成功');
});
db.connection.on('error', function (error) {
    console.log('数据库链接失败' + error);
});

var testSchema = new mongoose.Schema({
    name: {type: String},
    age: {type: Number, default: 18},
    gender: {type: Boolean, default: true},
    email: {type: String, default: ''},
    time: {type: Date, default: Date.now}
});