var express = require('express'), http = require('http'), path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var expressErrorHandler = require('express-error-handler');

var app = express();
var router = express.Router();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());
app.use(static(path.join(__dirname, 'public')));

router.route('/process/users/:id').get((req, res) => {
    console.log('/process/users/:id 처리함');

    var paramID = req.params.id;

    res.writeHead(200, {'Content-Type' : 'text/html; charset=utf8'});

    res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
    res.write('<div><p>Param ID : ' + paramID + '</p></div>');

    res.end();
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