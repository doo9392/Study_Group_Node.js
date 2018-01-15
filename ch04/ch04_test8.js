var fs = require("fs");

fs.open("./output.txt", "w", function(err, fd) { // 파일 열기.
    // r : 읽기에 사용하는 플래그. 파일이 없으면 예외 처리
    // w : 쓰기에 사용하는 플래그. 파일에 없으면 파일이 만들어지고 파일이 있으면 이전의 내용은 모두 삭제.
    // w+ : 읽기와 쓰기에 사용하는 플래그. 파일이 없으면 만들어지고 파일이 있으면 이전의 내용은 모두 삭제.
    // a+ : 읽기와 추가에 사용하는 플래그. 파일이 없으면 만들어지고 파일이 있으면 이전의 내용에 새롭게 추가.

    if(err) throw err;

    var buf = new Buffer("안녕!\n");

    fs.write(fd, buf, 0, buf.length, null, function(err, written, buffer) { // 데이터 쓰기.
        if(err) throw err;

        console.log(err, written, buffer);

        fs.close(fd, function() { // 파일 닫기.
            console.log("파일 열고 데이터 쓰고 파일 닫기 완료");
        });
    });
});