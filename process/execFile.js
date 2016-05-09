var child_process = require('child_process');
child_process.execFile('../util/inspect.js', function (err, stdout, stderr) {
    console.log(stdout);
});