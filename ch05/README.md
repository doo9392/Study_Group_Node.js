# Study_Gruop_node.js

> ch05 웹 서버 만들기

## Folder Structure

```
ch05/
	README.md
	package.json
	package-lock.json
	ch05_test1.js
	ch05_test2.js
	ch05_test3.js
	ch05_test4.js
	ch05_test5.js
	ch05_test6.js
	ch05_test7.js
	ch05_test8.js
	Express/
		...
	test_img.jpg
```

### `ch05_test1.js`
웹서버 만들어보기.

### `ch05_test2.js`
웹서버를 만들어서 클라이언트 접속 확인.

### `ch05_test3.js`
웹서버를 만들어서 클라이언트에게 응답페이지를 전송.

### `ch05_test4.js`
ch05_test3.js파일과 같은 기능이나 serverCreate로 전송.

### `ch05_test5.js`
파일을 불러와 뿌려주기.

### `ch05_test6.js`
ch05_test5.js와 같은 기능이지만 스트림과 pipe를 이용하여 더 간결하게 작성. <br>
파일의 크기를 체크하여 파일을 다 로드 하였을때 클러이언트에게 전송.

### `ch05_test7.js`
GET 방식의 서버구동.

### `ch05_test8.js`
POST 방식의 서버구동.

### `Express`
이전까지는 http만을 이용하였으나 이 후로는 Express도 활용.

### `test_img.jpg`
ch05_test5.js를 구현하기 위한 테스트 이미지.