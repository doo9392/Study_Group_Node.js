var fs = require("fs");

var inname = "./output.txt";
var outname = "./output2.txt";

fs.exists(outname, function(exists) {
    if(exists) {
        fs.unlink(outname, function(err) { // unlink() : 기존 파일 삭제.
            if(err) throw err;

            console.log("기존 파일 ['" + outname + "'] 삭제함.");
        });
    }

    var infile = fs.createReadStream(inname, {file : "r"});
    var outfile = fs.createWriteStream(outname, {file : "w"});

    infile.pipe(outfile); // pipe를 이용해서 복사.

    console.log("파일 복사 ['" + inname + "'] -> [" + outname + "]");
});