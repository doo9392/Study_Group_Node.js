# Study_Gruop_node.js

> ch04 노드의 기본 기능

## Folder Structure

```
ch04/
  README.md
  package.json
  package-lock.json
  calc.js
  ch04_test1.js
  ch04_test2.js
  ch04_test3.js
  ch04_test4.js
  ch04_test5.js
  ch04_test6.js
  ch04_test7.js
  ch04_test8.js
  ch04_test9.js
  ch04_test10.js
  ch04_test11.js
  ch04_test12.js
  ch04_test13.js
  ch04_test14.js
  ch04_test15.js
  output.txt
  output2.txt
```

### `calc.js`
ch04_test4.js를 위한 이벤트와 모듈.

### `ch04_test1.js`
url을 이용한 query확인.

### `ch04_test2.js`
process를 활용한 EventEmitter의 on.

### `ch04_test3.js`
process를 활용한 EventEmitter의 emit.

### `ch04_test4.js`
module로 분리된 EventEmitter. calc.js의 파일 이용.

### `ch04_test5.js`
파일 읽기.

### `ch04_test6.js`
파일 읽기. 콜백함수를 이용한 err와 data.

### `ch04_test7.js`
파일에 쓰기.

### `ch04_test8.js`
파일 읽기, 쓰기, 추가, 열기, 닫기 등 파일에 관한 메소드 및 플래그.

### `ch04_test9.js`
파일 읽기. 버퍼 타입과 읽고 나서 파일 닫기.

### `ch04_test10.js`
버퍼 사용하기.

### `ch04_test11.js`
파일의 데이터를 받아 다른 파일에 쓰기.

### `ch04_test11.js`
파일의 데이터를 받아 다른 파일에 쓰기.

### `ch04_test12.js`
중복되는 기존의 파일을 지우고 새롭게 파일을 복사하여 생성. pipe, unlink

### `ch04_test13.js`
파일에서 만든 스트림과 웹서버의 스트림 객체를 pipe() 메소드로 연결.

### `ch04_test14.js`
폴더를 생성하고, 제거.

### `ch04_test15.js`
로그 파일 남기기.

### `output.txt`
ch04_test7.js에 의해서 생성된 txt 파일.<br>
ch04_test8.js에 의해서 변형된 txt 파일.

### `output2.txt`
ch04_test11.js에 의해서 output.txt에 복사된 데이터를 입력한 파일.<br>
ch04_test12.js에 의해서 output.txt에 복사 파일.