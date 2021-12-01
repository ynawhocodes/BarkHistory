var db = require('./db');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

exports.signIn = function(request, response) {
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Sign UP</title>
            <meta charset="utf-8">
        </head>
        <body>
            <form action="/member/signIn_process" method="post">
                <div class="container-inner">
                    <div class="sign-in-input">
                        <input type="text" class="id-input" name="id-input" placeholder="아이디"> <br>
                        <input type="password" class="pw-input" name="pw-input" placeholder="비밀번호">
                    </div>
                    
                    <div class="sign-btn">
                        <button type="button" class="sign-in-btn" onclick="alert('로그인 성공')">로그인</button> <br>
                        <button type="button" class="sign-up-btn" onclick="alert('회원가입 가기')">회원가입</button>
                    </div>
                </div>
            </form>
        </body>
    </html>
    
    `;
    response.writeHead(200);
    response.end(template);
}

exports.signIn_process = function(request, response) {
    var body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        var post = qs.parse(body);
        let pw = post.pw-input;
        console.log(pw);
        db.query(
            `SELECT user_pw FROM user WHERE user_name=?`, 
            [post.id-input],
            function(error, result) {
                if(error) {
                    throw error;
                }
                if(result != pw) {
                    alert("로그인 실패");
                    response.writeHead(302, {Location: '/member/signIn'});
                    response.end();
                }
                alert("로그인 성공");
                response.writeHead(302, {Location: '/member/signUp'});
                response.end();
            }
        );
    });
}

exports.signUp = function(request, response) {
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Sign UP</title>
            <meta charset="utf-8">
        </head>
        <body>
            <form action="/member/signUp_process" method="post">        
                <div class="sign-up-input">
                    <input type="text" class="id-input" name="id_input" placeholder="아이디"> <br>
                    <input type="password" class="pw-input" name="pw_input" placeholder="비밀번호"> <br>
                    <input type="password" class="pw-check-input" name="pw-check-input" placeholder="비밀번호 확인">
                </div>
                
                <div class="sign-btn">
                    <button type="submit" class="sign-up-btn">회원가입 하기</button>
                </div>
            </form>
        </body>
    </html>
    `;
    response.writeHead(200);
    response.end(template);
}


exports.signUp_process = function(request, response) {
    var body = '';
    request.on('data', function(data) {
        body = body + data;
    });
    request.on('end', function() {
        var post = qs.parse(body);
        db.query(`INSERT INTO user (user_name, user_pw) VALUES(?, ?)`, [post.id_input, post.pw_input],
            function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: '/member/signIn'});
                response.end();
            }
        );
    });
}
