var mysql = require('mysql');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'nodejs',
    port: '3306'
});

// conn.connect();

var insertSQL = 'INSERT INTO t_user(name) VALUES ("conan"),("Jian")';
var selectSQL = 'SELECT * FROM t_user limit 10';
var deleteSQL = 'DELETE FROM t_user';
var updateSQL = 'UPDATE t_user SET name="HuJian" WHERE name="conan"';

// 删除SQL
conn.query(deleteSQL, function (err0,res0) {
    if (err0) console.log(err0);
    console.log("DELETE Return =>");
    console.log(res0);
    // 插入SQL
    conn.query(insertSQL, function (err1,res1) {
        if (err1) console.log(err1);
        console.log('INSERT Return =>');
        console.log(res1);
        // 查询SQL
        conn.query(selectSQL, function (err2, rows) {
            console.log('SELECT Return =>');
            for (var i in rows) {
                console.log(rows[i]);
            }
            // 更新SQL
            conn.query(updateSQL, function (err3,res3) {
                if (err3) console.log(err3);
                console.log('UPDATE Return =>');
                console.log(res3);
                // 查询SQL
                conn.query(selectSQL, function (err4, rows) {
                    if (err4) console.log(err4);
                    console.log('UPDATE Return =>');
                    for (var i in rows) {
                        console.log(rows[i]);
                    }
                });
            });
        });  
    });
});


// conn.end();