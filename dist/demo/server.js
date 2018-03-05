var express = require('express');
var multer = require('multer');
express()
    .use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
    .get('/', function (req, res) { return res.send({ message: 'upload here' }); })
    .post('/', multer({ dest: './build/uploads/' }).any(), function (req, res) { return res.send({ message: 'ok', files: req.files }); })
    .listen(8000, function () { return console.log("upload server listening on localhost:8000"); });
//# sourceMappingURL=server.js.map