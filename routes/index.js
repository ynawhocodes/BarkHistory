var express = require('express');
var router = express.Router();
var auth = require('../lib/auth');

//메인 페이지로 수정 필요. 로그인/회원 가입 주소 있으면 됨!
router.get('/', function(request, response) {
    
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Main Page</title>
            <meta charset="utf-8">
        </head>
        <body>
            ${auth.statusUI(request, response)} 
        </body>
    </html>
    
    `;
    response.send(template);
});

module.exports = router;