console.dir(process.env); // 이 속성만으로 OS와 같은 시스템 환경변수에 접근 불가능.
console.log('OS 환경 변수의 값 : ' + process.env[OS]);