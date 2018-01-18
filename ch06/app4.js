const express = require('express'), http = require('http'), path = require('path');
const bodyParser = require('body-parser'), cookieParser = require('cookie-parser'), static = require('serve-static'), errorHandler = require('errorhandler');
const expressErrorHandler = require('express-error-handler');
const expressSession = require('express-session');
const mongoose = require('mongoose');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
	secret:'my key',
	resave:true,
	saveUninitialized:true
}));

var DataBase;
var UserSchema;
var UserModel;

// DB연결.
function connectDB() {
	var databaseUrl = 'mongodb://localhost:27017/local';

	console.log('데이터베이스 연결을 시도합니다.');

	mongoose.Promise = global.Promise;

	mongoose.connect(databaseUrl);

	DataBase = mongoose.connection;

	DataBase.on('error', console.error.bind(console, 'mongoose connection error.'));
	DataBase.on('open', () => {
		console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);

// ====================== //
		UserSchema = mongoose.Schema({
		    id : {type : String, required : true, unique : true}, //unique 이용시 자동으로 index 생성.
		    password : {type : String, required : true},
		    name : {type : String, index : 'hashed'},
		    age : {type : Number, 'default' : -1},
		    created_at : {type : Date, index : {unique : false}, 'default' : Date.now},
		    updated_at : {type : Date, index : {unique : false}, 'default' : Date.now}
		});
// ====================== //

		UserSchema.static('findById', (id, callback) => {
			return this.find({id : id}, callback);
		});

		UserSchema.static('findAll', (callback) => {
			return this.find({}, callback);
		});

		console.log('UserSchema 정의함.');

		UserModel = mongoose.model("users2", UserSchema);

		console.log('UserModel 정의함.');
	});

	DataBase.on('disconnected', () => {
		console.log('연결이 끊어졌습니다. 5초 후 재연결합니다.');

        setInterval(connectDB, 5000);
    });
}

var router = express.Router();

// 로그인.
router.route('/process/login').post((req, res) => {
	console.log('/process/login 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword);

	if (DataBase) {
		authUser(DataBase, paramId, paramPassword, (err, docs) => {
			if(err) {
                console.error('로그인 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>로그인 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');

				res.end();

                return;
			}

			if(docs) {
				console.dir(docs);

				var username = docs[0].name;

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h1>로그인 성공</h1>');
				res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
				res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");

				res.end();
			} else {
				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h1>로그인  실패</h1>');
				res.write('<div><p>아이디와 패스워드를 다시 확인하십시오.</p></div>');
				res.write("<br><br><a href='/public/login.html'>다시 로그인하기</a>");

				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

		res.write('<h2>데이터베이스 연결 실패</h2>');
		res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');

		res.end();
	}
});

// 사용자 추가.
router.route('/process/adduser').post((req, res) => {
	console.log('/process/adduser 호출됨.');

    var paramId = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;
    var paramName = req.body.name || req.query.name;

	console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

	if(DataBase) {
		addUser(DataBase, paramId, paramPassword, paramName, (err, addedUser) => {
			if(err) {
                console.error('사용자 추가 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 추가 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');

				res.end();

                return;
			}

			if(addedUser) {
				console.dir(addedUser);

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 추가 성공</h2>');

				res.end();
			} else {
				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 추가  실패</h2>');

				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

		res.write('<h2>데이터베이스 연결 실패</h2>');

		res.end();
	}
});

router.route('/process/listuser').post((req, res) => {
	console.log('/process/listuser 호출됨.');

	if(DataBase) {
		UserModel.findAll((err, results) => {
			if(err) {
                console.error('사용자 리스트 조회 중 에러 발생 : ' + err.stack);

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 리스트 조회 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');

				res.end();

                return;
            }

			if(results) {
				console.dir(results);

				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 리스트</h2>');
				res.write('<div><ul>');

				for(var i = 0; i < results.length; i++) {
					var curId = results[i]._doc.id;
					var curName = results[i]._doc.name;

					res.write('<li>#' + i + ' : ' + curId + ', ' + curName + '</li>');
				}

				res.write('</ul></div>');

				res.end();
			} else {
				res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

				res.write('<h2>사용자 리스트 조회  실패</h2>');

				res.end();
			}
		});
	} else {
		res.writeHead('200', {'Content-Type' : 'text/html;charset=utf8'});

		res.write('<h2>데이터베이스 연결 실패</h2>');

		res.end();
	}
});

app.use('/', router);

// 로그인 함수.
var authUser = (DataBase, id, password, callback) => {
	console.log('authUser 호출됨 : ' + id + ', ' + password);

	UserModel.find({"id" : id, "password" : password}, (err, results) => {
		if(err) {
			callback(err, null);

			return;
		}

		console.log('아이디 [%s]로 사용자 검색결과', id);
		console.dir(results);

		if(results.length > 0) {
			console.log('아이디와 일치하는 사용자 찾음.');

			if(results[0]._doc.password === password) {
				console.log('비밀번호 일치함');

				callback(null, results);
			} else {
				console.log('비밀번호 일치하지 않음');

				callback(null, null);
			}

		} else {
			console.log("아이디와 일치하는 사용자를 찾지 못함.");

	    	callback(null, null);
	    }
	});
}

// 사용자 추가 함수.
const addUser = (DataBase, id, password, name, callback) => {
	console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

	var user = new UserModel({"id" : id, "password" : password, "name" : name});

	user.save((err, addedUser) => {
		if(err) {
			callback(err, null);

			return;
		}

		console.log("사용자 데이터 추가함.");

	    callback(null, addedUser);
	});
};

var errorHandler404 = expressErrorHandler({
 static : {
   '404' : './public/404.html'
 }
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler404);

process.on('SIGTERM', () => {
	console.log("프로세스가 종료됩니다.");

    app.close();
});

app.on('close', () => {
	console.log("Express 서버 객체가 종료됩니다.");

	if(DataBase) {
		DataBase.close();
	}
});

http.createServer(app).listen(app.get('port'), () => {
  console.log('서버가 시작되었습니다. 포트 : ' + app.get('port'));

  connectDB();
});