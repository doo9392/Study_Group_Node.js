var http = require('http');

var option = {
    host : 'www.google.com',
    port : 80,
    path : '/'
};
var req = http.get(option, (res) => {
    var resData = '';

    res.on('data', (chunk) => {
        resData += chunk;
    });

    res.on('end', () => {
        console.log(resData);
    });
});

req.on('error', (err) => {
    console.log('Error : ' + err.message);
});