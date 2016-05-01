var fs = require('fs');

fs.readFile('file.json', 'utf-8', function (err, data) {
	if (err) throw err;
	console.log(data);
});

console.log('end');