process.on("exit", function() { //process 객체는 node에서 언제든지 사용가능. 이미 내부적으로 EventEmitter을 상속받도록 만들어져 있다.
    console.log("exit 이벤트 발생");
});

setTimeout(function() {
    console.log("2초 후 시스템 종료 시도함");

    process.exit();
}, 2000);