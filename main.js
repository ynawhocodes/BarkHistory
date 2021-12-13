var http = require('http');
var url = require('url');
var qs = require('querystring');
var db = require('./lib/db.js');
var member = require('./lib/member.js');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    if(pathname === '/') {
        member.signIn(request, response);
    }  else if(pathname === '/member/signIn') {
        member.signIn(request, response);
    } else if(pathname === '/member/signUp') {
        member.signUp(request, response);
    } else if(pathname === '/member/signIn_process') {
        member.signIn_process(request, response);
    } else if(pathname === '/member/signUp_process') {
        member.signUp_process(request, response);
    } else {
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);