var result = 0;

console.time('duration_sum'); // 시작시간 기록

for(var i = 1; i <= 1000; i++) {
    result += i;
}

console.timeEnd('duration_sum'); // 끝 시간 기록
console.log('1부터 1000까지 더한 결과물 : %d', result);

console.log('현재 실행한 파일의 이름 : $s', __filename); // 현재 실행한 파일의 이름 : $s D:\Study_Group_Node.js\Intro\ch02_test1.js
console.log('현재 실행한 파일의 패스 : $s', __dirname); // 현재 실행한 파일의 패스 : $s D:\Study_Group_Node.js\Intro

var Person = {name : "소녀시대", age : 20}; // { name: '소녀시대', age: 20 }

console.dir(Person);