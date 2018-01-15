// var http = require("http");
// var server = http.createServer();
// var port = 3000;

// server.listen(port, function() { // listen() : 서버를 실행시켜 대기시킨다. <-> close() 서버를 종요시킨다.
//     console.log('웹 서버가 시작되었습니다. : %d', port);
// });

var host = '192.168.0.80'; // ipconif를 이용하여 자신의 pc ip를 넣을 것.
var server = http.createServer();
var port = 3000;

server.listen(port, function() { // listen() : 서버를 실행시켜 대기시킨다. <-> close() 서버를 종요시킨다.
    console.log('웹 서버가 시작되었습니다. : %d', port);
});
