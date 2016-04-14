var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'nodejs',
    port: '3306'
});

conn.connect();
conn.query('SELECT  1 + 1 AS solution', function (err, rows, fileds) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

conn.end();