var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');

var app = express();

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

var router = express.Router();

router.route('/process/login').post((req, res) => {
    console.log('/process/login');

    var paramID = req.body.id || req.query.id;
    var paramPassword = req.body.password || req.query.password;

    if(req.session.user) {
        console.log('이미 로그인이 되어 있습니다.');

        res.redirect('/public/product.html');
    } else {
        req.session.user = {
            id : paramID,
            name : '소녀시대',
            autorized : true
        };

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

        res.write('<h1>로그인 성공</h1>');
        res.write('<div><p>Param ID : ' + paramID + '</p></div>');
        res.write('<div><p>Param Password : ' + paramPassword + '</p></div>');
        res.write('<a href="/process/product">상품페이지로 이동</a>');

        res.end();
    }
});
router.route('/process/logout').get((req, res) => {
    console.log('/process/logout');

    if(req.session.user) {
        console.log('로그아웃 합니다.');

        req.session.destroy((err) => {
            if(err) throw err;

            console.log('로그아웃 되었습니다.');

            res.redirect('/public/login2.html');
        });
    } else {
        console.log('로그인되어 있지 않습니다.');

        res.redirect('/public/login2.html');
    }
})

router.route('/process/product').get((req, res) => {
    console.log('/process/product');

    if(req.session.user) {
        res.redirect('/public/product.html');
    } else {
        res.redirect('/public/login2.html');
    }
});

var erroeHandler = expressErrorHandler({
    static : {
        '404' : './public/404.html'
    }
});

app.use('/', router);
app.use(expressErrorHandler.httpError(404));
app.use(erroeHandler);

http.createServer(app).listen(3000, () => {
    console.log('Express 서버가 3000port에서 시작됨');
});