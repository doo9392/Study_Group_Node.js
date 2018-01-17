const express = require('express'), http = require('http'), path = require('path');
const bodyParser = require('body-parser'), cookieParser = require('cookie-parser'), static = require('serve-static'), errorHandler = require('errorhandler');
const expressErrorHandler = require('express-error-handler');
const expressSession = require('express-session');

const app = express();

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));

const MongoClient = require('mongodb').MongoClient;

var dataBase;

const connectDB = () => {
    const dbURL = 'mongodb://localhost:27017/local';

    MongoClient.connect(dbURL, (err, db) => {
        if(err) throw err;

        console.log('DB에 연결되었습니다. : ' + dbURL);

        dataBase = db;
    });
}

const router = express.Router();

router.route('/process/login').post((req, res) => {
    var paramID = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(dataBase) {
        authUser(dataBase, paramID, paramPassword , (err, docs) => {
            if(err) throw err;

            if(docs) {
                console.dir(docs);

                const username = docs[0].name;

                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

                res.write('<h1>로그인 성공</h1>');
                res.write('<div><p>ID : ' + paramID + '</p></div>');
                res.write('<div><p>Password : ' + paramPassword + '</p></div>');
                res.write('<a href="/public/login.html">다시 로그인하기</a>');

                res.end();
            } else {
                res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

                res.write('<h1>로그인 실패</h1>');
                res.write('<div><p>아이디와 비밀번호를 확인해주세요.</p></div>');
                res.write('<a href="/public/login.html">다시 로그인하기</a>');

                res.end();
            }
        });
    } else {
        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

        res.write('<h1>데이터베이스 연결 실패</h1>');
        res.write('<div><p>데이터 베이스를 연결하지 못했습니다.</p></div>');

        res.end();
    }
});

app.use('/', router);

const authUser = (db, id, password, callback) => {
    console.log('authUser : ' + id + ', ' + password);

    const users = db.collection('users');

    users.find({"id" : id, "password" : password}).toArray((err, docs) => {
        if(err) {
            callback(err, null);

            return;
        }

        if(docs.length > 0) {
            console.log('ID [%s], PASSWORD [$s]가 일치하는 이용자를 찾았습니다.', id, password);

            callback(null, docs);
        } else {
            console.log('일치하는 이용자가 없습니다.');

            callback(null, null);
        }
    });
}

const errorHandler404 = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler404);

http.createServer(app).listen(app.get('port'), () => {
    console.log('서버가 시작되었습니다. PORT : ' + app.get('port'));

    connectDB();
});