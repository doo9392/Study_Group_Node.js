const express = require('express'),
  http = require('http'),
  path = require('path');
const bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  static = require('serve-static'),
  errorHandler = require('errorhandler');
const expressErrorHandler = require('express-error-handler');
const expressSession = require('express-session');
const mongoose = require('mongoose');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extendd: false }));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  expressSession({
    secret: 'my key',
    resave: true,
    saveUninitialized: true,
  })
);

// mongodb
const database;

const connectDB = () => {
  const databaseUrl = 'mongodb://localhost:27017/local';

  MongoClient.connect(databaseUrl, (err, db) => {
    if (err) throw err;

    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl);
    database = db;
  });
} 


// router
const router = express.Router();

// /process/login
router.route('/process/login').post((req, res) => {
  console.log('/process/login 호출됨.');
  const paramId = req.body.id || req.query.id;
  const paramPassword = req.body.password || req.query.password;

  if (database) {
    authUser(database, paramId, paramPassword, (err, docs) => {
      if (err) throw err;

      if (docs) {
        console.dir(docs);

        const username = docs[0].name;

        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        
        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>사용자 아이디 : ' + paramId + '</p></div>');
        res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
        res.srite("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        
        res.end();
      } else {
        res.writeHead('200', {
          'Content-Type': 'text/html;charset=utf8',
        });

        res.write('<h1>로그인 실패</h1>');
        res.write('<div><p>아이디와 비밀번호를 다시 확인하십시오.</p></div>');
        res.srite("<br><br><a href='/public/login.html'>다시 로그인하기</a>");
        
        res.end();
      }
    });
  } else {
    res.writeHead('200', {
      'Content-Type': 'text/html;charset=utf8',
    });

    res.write('<h1>데이터베이스 연결 실패</h1>');
    res.write('<div><p>데이터베이스에 연결하지 못했습니다.</p></div>');
    
    res.end();
  }
});

router.route('/process/adduser').post((req, res) => {
    console.log('/process/adduser 호출됨.');

    const paramId = req.body.id || req.query.id;
    const paramPassword = req.body.password || req.query.password;
    const paramName = req.body.name || req.query.name;

    console.log('요청 파라미터 : ' + paramId + ', ' + paramPassword + ', ' + paramName);

    if (database) {
        addUser(database, paramId, paramPassword, paramName, (err, result) => {
            if (err) throw err;

            if (result && result.insertedCount > 0) {
                console.dir(result);

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 성공</h2>');
                res.end();
            } else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
                res.write('<h2>사용자 추가 실패</h2>');
                res.end();
            }
        });
    } else {
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'});
        res.write('<h2>데이터베이스 연결 실패</h2>');
        res.end();
    }
});

app.use('/', router);  


// authUser
const authUser = (database, id, password, callbak) => {
  console.log('authUser 호출됨.');
  const users = database.collection('users');
  users
    .find({
      "id" : id,
      "password" : password,
    })
    .toArray((err, docs) => {
      if (err) {
        callback(err, null);
        return;
      }
      if (docs.length > 0) {
        console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
        callback(null, docs);
      } else {
        console.log('일치하는 사용자를 찾지 못함.');
        callback(null, null);
      }
    });
};


// addUser
const addUser = (database, id, password, name, callback) => {
    console.log('addUser 호출됨 : ' + id + ', ' + password + ', ' + name);

    const users = database.collection('users');

    users.insertMany([{"id" : id, "password" : password, "name" : name}], (err, result) => {
        if (err) {
            callback(err, null);
            return;
        }

        if (result.insertedCount > 0) {
            console.log("사용자 레코드 추가됨 : " + result.insertedCount);
        } else {
            console.log("추가된 레코드가 없음.");
        }

        callbak(null, result);
    });
}


// errorHandler
const errorHandler = expressErrorHandler({
  static: { '404': './public/404.html' },
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(app.get('port'), () => {
  console.log('서버가 시작되었습니다. 포트 :' + app.get('port'));
  connectDB();
});
