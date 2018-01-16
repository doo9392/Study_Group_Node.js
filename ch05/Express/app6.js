var express = require('express'), http = require('http');

var app = express();

app.use((req, res, next) => {
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    var userAgent = req.header('User-Agent');
    var paramName = req.query.name;

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>User-Agent : ' + userAgent + '</p></div>');
    res.write('<div><p>Param name : ' + paramName + '</p></div>');

    res.end();
});
http.createServer(app).listen(3000, () => {
    console.log('Express 서버가 3000port에서 시작됨');
});