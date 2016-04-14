#node-mysql-connect
如App2.js，先引入mysql包，当然要先npm install --
使用mysql.createConnection()函数建立数据库连接。填上host,user,password,port和database。一个连接就建立成功了。
在11行注释中有conn.connect()函数，我们这样写了以后却发现执行报错了。
<code>Cannot enqueue Handshake after invoking quit</code>
搜索后在stack overflow上找到了解答[连接](http://stackoverflow.com/questions/14087924/cannot-enqueue-handshake-after-invoking-quit)
