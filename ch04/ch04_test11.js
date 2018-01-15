var fs = require('fs');

var infile = fs.createReadStream("./output.txt", {file : "r"}); // 파일을 읽기 위한 스트림 객체를 만든다.
var outfile = fs.createWriteStream("./output2.txt", {filr : "w"}); // 파일을 쓰기 위헌 스트림 객체를 만든다.

infile.on("data", function(data) {
    console.log("읽어 들인 데이터", data);

    outfile.write(data);
});

infile.on("end", function() {
    console.log("파일 읽기 종료");

    outfile.end(function() {
        console.log("파일 쓰기 종료");
    });
});