var http = require('http');
var server = http.createServer();
var port = 3000;

server.listen(port, function() {
    console.log('웹 서버가 시작되었습니다. : %d', port);
});

server.on('connection', function(socket) {
    var addr = socket.address();

    console.log('클라이언트가 접속했습니다. : %s, %d', addr.address, addr.port);
});

server.on('request', function(req, res) {
    console.log('클라이언트 요청이 들어왔습니다.');

    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});  // 응답으로 보낼 헤더를 제작.
    res.write("<!DOCTYPE html>");  // write() : 본문을 보내는 메소드. 여러번 중복하여 쓸 수 있다.
    res.write("<html>");
    res.write(" <head>");
    res.write("  <title>응답 페이지</title>");
    res.write(" </head>");
    res.write(" <body>");
    res.write("  <h1>node.js로부터 응답 페이지</h1>");
    res.write(" </body>");
    res.write("</html>");
    res.end(); // end() : 클라이언트로 응답을 전송. 데이터가 있다면 데이터를 포함하여 전달한다.
});

server.on('close', function() {
    console.log('서버가 종료되었습니다.');
});