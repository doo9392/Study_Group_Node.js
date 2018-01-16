var express = require('express'), http = require('http');

var app = express();

app.use((req, res, next) => {
    console.log('첫번째 미들웨어에서 요청을 처리함.');

    res.redirect('http://google.co.kr');
});
http.createServer(app).listen(3000, () => {
    console.log('Express 서버가 3000port에서 시작됨');
});