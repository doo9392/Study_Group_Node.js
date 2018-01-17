var express = require('express'),
  http = require('http'),
  path = require('path');
var bodyParser = require('body-parser'), static = require('serve-static');
var expressErrorHandler = require('express-error-handler');

var app = express();

var errorHandler = expressErrorHandler({
    static: {
        '404': './public/404.html'
    }
});

app.set('port', process.env.PORT || 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public',static(path.join(__dirname, 'public')));

var router = express.Router();

router.route('/process/user/:id').get((req, res) => {
  console.log('/process/user/:id 처리함.');

  var paramId = req.params.id;
  
  res.writeHead('200', {
    'Content-Type': 'text/html; charset=utf8',
  });
  res.write('<h1>Express 서버에서 응답한 결과입니다.</h1>');
  res.write('<div><p>Param id : ' + paramId + '</p></div>');
  res.end();
});

app.use('/', router);
app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

http.createServer(app).listen(3000, function() {
  console.log('Express 서버가 3000번 포트에서 시작됨.');
});
