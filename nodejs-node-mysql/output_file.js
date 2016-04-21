var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'testbank'
});

var selectQuery = 'SELECT * FROM user';
var selectRows = require('fs');
var arr = [];
conn.query(selectQuery, function (err, rows) {
    if (err) {
        console.log(err);
    }
    else {
        for (var i in rows) {
            console.log(rows[i]);
            arr.push(JSON.stringify(rows[i]));
        }
        // 输出json格式文件（数据持久化）
        selectRows.writeFile('../api_json/user.json',arr, function (err) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('wrote data to user.json');
            }
        });
    }
});