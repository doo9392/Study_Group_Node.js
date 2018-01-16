var express = require('express'), http = require('http');

var app = express();

// set(name, value) : 서버 설정을 위한 속성 지정. set()으로 지정한 속성은 get()으로 꺼내어 확인이 가능.
// get(name) : 서버 설정을 위해 지정한 속성을 확인.
// use([path], function, [function...]) : 미들웨어 함수를 사용. *
// get([path], function) : 특정 패스로 요청된 정보를 처리합니다.


app.set('port', process.env.PORT || 3000); // precess.env 안에 PORT 속성이 있으면 그 속성을 사용하고 없으면 3000port를 사용.
http.createServer(app).listen(app.get('port'), () => {
    console.log('익스프레스 서버를 시작했습니다. : ' + app.get('port'));
});