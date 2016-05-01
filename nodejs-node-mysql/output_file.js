var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    port: '3306',
    database: 'testbank'
});

// var http = require('http');
// http.createServer(function (req, res) {
//     res.writeHead(301, {
//         'Location': 'http://www.sina.com'
//     });
//     res.end();
// }).listen(3001, '127.0.0.1');
// console.log('server running at port 3001');

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