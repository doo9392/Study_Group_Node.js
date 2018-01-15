var fs = require("fs");
var http = require("http");
var server = http.createServer(function(req, res) {
    var instream = fs.createReadStream("./output.txt");

    instream.pipe(res);
});

server.listen(7001, "127.0.0.1");

// 웹서버에서 클라이언트로부터 받은 요청을 먼저 output.txt.파일에서 스트립을 만든 후 클라이언트로 데이터를 보내게 한다.
// 코드에서 만든 스트림과 웹서버의 스트림 객체를 pipe() 메소드로 연결할 수 있다.