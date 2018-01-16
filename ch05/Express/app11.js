var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var expressErrorHandler = require('express-error-handler');
var cookieParser = require('cookie-parser');

var app = express();
var router = express.Router();

app.use(express.cookieParser);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));

router.route('/process/showCookie').get((req, res) => {
    console.log('/process/showCookie');

    res.send(req.cookies);
});
router.route('/process/setUserCookie').get((req, res) => {
    console.log('/process/setUserCookie');

    res.cookie('user', {
        id : 'bob',
        name : '소녀시대',
        authorized : true
    });

    res.redirect('/process/showCookie');
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