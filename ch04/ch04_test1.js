var url = require("url");
var curURL = url.parse('https://m.search.naver.com/search.naver?query=steve+jobs&where=m&m=mtp_hty'); // parse() : 주소 문자열을 파싱하여 url객체를 제작.
var curStr = url.format(curURL); // format() :  URL객체를 주소 문자열로 변환.

console.log("주소 문자열 : %s", curStr);
console.dir(curURL);

var querystring = require('querystring');
var param = querystring.parse(curURL.query);

console.log("요청 파라미터 중 query의 값 : %s", param.query); // 이곳 parse()는 요청 파라미터의 문자열을 파싱하여 파라미터 객체로 제작.
console.log("원본 요청 파라미터 : %s", querystring.stringify(param)); // stringify() : 요청 파라미터 객체를 문자열로 변환.