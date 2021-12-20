var db = require('../lib/db');
var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/signIn', function(request, response) {
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Sign In</title>
            <meta charset="utf-8">
        </head>
        <body>
            <form action="/auth/signIn_process" method="post">
                <div class="container-inner">
                    <div class="sign-in-input">
                        <input type="text" class="name-input" name="name_input" placeholder="아이디"> <br>
                        <input type="password" class="pw-input" name="pw_input" placeholder="비밀번호">
                    </div>
                    
                    <div class="sign-btn">
                        <button type="submit" class="sign-in-btn">로그인</button> <br>
                        <button type="button" class="sign-up-btn">회원가입</button>
                    </div>
                </div>
            </form>
        </body>
    </html>
    
    `;
    response.writeHead(200);
    response.end(template);
});

router.post('/signIn_process', function(request, response) {
    var post = request.body;
    let pw = post.pw_input;
    db.query(
        `SELECT * FROM user WHERE user_name=?`, [post.name_input],
        function(error, result) {
            try {
                if (!result.length) //id 입력 오류 -> catch로 이동
                    console.log("등록된 유저 없음");

                if(result[0].user_pw === pw) { //로그인 성공
                    console.log("성공");

                    //세션에 로그인 여부, 이름, 아이디 저장
                    request.session.is_logined = true;
                    request.session.user_name = result[0].user_name;
                    request.session.user_id = result[0].user_id;

                    request.session.save(function() {
                        response.redirect('/');
                    })
                }
                else { //로그인 실패
                    console.log("실패");
                    response.writeHead(302, {Location: '/auth/signIn'});
                    response.end();
                }
            }
            catch(err) {
                response.writeHead(302, {Location: '/auth/signIn'});
                response.end();
            }
        }
    );
});

router.get('/signUp', function(request, response) {
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Sign Up</title>
            <meta charset="utf-8">
        </head>
        <body>
            <form action="/auth/signUp_process" method="post">        
                <div class="sign-up-input">
                    <input type="text" class="name-input" name="name_input" placeholder="아이디"> <br>
                    <input type="password" class="pw-input" name="pw_input" placeholder="비밀번호"> <br>
                    <input type="password" class="pw-check-input" name="pw_check_input" placeholder="비밀번호 확인">
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
});


router.post('/signUp_process', function(request, response) {
    var post = request.body;
    db.query(`INSERT INTO user (user_name, user_pw) VALUES(?, ?)`, [post.name_input, post.pw_input],
        function(error, result) {
            if(error) {
                throw error;
            }
            response.writeHead(302, {Location: '/auth/signIn'});
            response.end();
        }
    );
});

router.get('/logout', function (request, response) {
    request.session.destroy(function(err) {
        response.redirect('/');
    });
});


module.exports = router;