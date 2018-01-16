var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var expressErrorHandler = require('express-error-handler'), errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser'), expressSession = require('express-session');
var multer = require('multer');
var fs = require('fs');
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use('/public', static(path.join(__dirname, 'public')));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

app.use(cookieParser());
app.use(expressSession({
    secret : 'my key',
    resave : true,
    saveUninitialized : true
}));
app.use(cors());

var storage = multer.diskStorage({
    destination : (req, file, callback) => {
        callback(null, 'uploads');
    },
    filename : (req, file, callback) => {
        callback(null, file.originalname + Date.now());
    }
});

var upload = multer({
    storage : storage,
    limits : {
        files : 10,
        fileSize : 1024 * 1024 * 1024
    }
});

var router = express.Router();

router.route('/process/photo').post(upload.array('photo', 1), (req, res) => {
    console.log('/process/photo');

    try {
        var files = req.files;

        console.dir('#===== 업로드된 첫번째 파일 정보 =====#');
        console.dir(req.files[0]);
        console.dir('#==========#');

        var originalname = '', filename = '', mimetype = '', size = 0;

        if(Array.isArray(files)) {
            console.log('배열에 들어있는 파일의 갯수 : %d', files.length);

            for(var i = 0; i <files.length; i++) {
                originalname = files[i].originalname;
                filename = files[i].filename;
                mimetype = files[i].mimetype;
                size = files[i].size;
            }
        } else {
            console.log('파일의 갯수 : 1');

            originalname = files[i].originalname;
            filename = files[i].filename;
            mimetype = files[i].mimetype;
            size = files[i].size;
        }

        console.log('현재 파일 정보 : ' + originalname + ', ' + filename + ', ' + mimetype + ', ' + size);

        res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});
        res.write('<h3>파일 업로드 성공</h3>');
        res.write('<p>원본 파일의 이름 : ' + originalname + ' -> 저장 파일명 : ' + filename + '</p>');
        res.write('<p>MIME TYPE : ' + mimetype + '</p>');
        res.write('<p>파일 크기 : ' +  size + '</p>');

        res.end();
    } catch(err) {
        console.dir(err.stack);
    }
});
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