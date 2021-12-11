var express = require('express');
var router = express.Router();
var db = require('../lib/db');

//정보 변경
router.get('/', function(request, response) {
    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Mypage - Info</title>
            <meta charset="utf-8">
        </head>
        <body>
            <a href="/mypage">정보 변경</a> <br>
            <a href="/mypage/mypost">내가 쓴 글</a> <br>
            <a href="/mypage/myscrap">내가 스크랩한 글</a> <br>
            <a href="/mypage/eraser">지우개</a> <br> 
            <form action="/mypage/change_process" method="post">
                <div class="container-inner">
                    <span class="page-title">아이디 / 비밀번호 변경</span> <br>
                    <div class="account-change">
                        <input type="text" class="name-change" name="name_change" value="${request.session.user_name}">
                        <input type="password" class="pw-change" name="pw_change" placeholder="****">
                        <button type="submit" class="change-btn" name="change_btn">변경</button>
                    </div>            
                </div>
            </form>
        </body>
    </html>
    
    `;
    response.writeHead(200);
    response.end(template);
});

router.post('/change_process', function(request, response) {
    var post = request.body;
    let pw = post.pw_change;
    db.query(
        'UPDATE user SET user_name=?, user_pw=? WHERE user_id=?', [post.name_change, post.pw_change, request.session.user_id],
        function(error, result) {
            try { //수정 성공
                console.log("성공");

                //세션에 로그인 여부, 아이디 저장
                request.session.is_logined = true;
                request.session.user_name = post.name_change;

                request.session.save(function() {
                    response.redirect('/mypage');
                })
            }
            catch(err) { //수정 실패
                console.log("실패");
                response.writeHead(302, {Location: '/mypage'});
                response.end();
            }
        }
    );
});

//내가 쓴 글
router.get('/mypost', function(request, response) {
    var list = '<ul>';
    db.query(
        'SELECT * FROM post WHERE user_id=?', [request.session.user_id],
        function(error, result) {
            try {
                console.log("글 목록 가져오기 성공");
                var  i = 0;
                while(i < result.length){
                    list = list + `<li><a href="/?id=${result[i].post_id}">${result[i].post_title}</a></li>`;
                    i = i+1;
                }
                list = list + '</ul>';
            }
            catch(err) {
                console.log("실패");
                response.writeHead(302, {Location: '/mypage'});
                response.end();
            }
        }
    );


    var template = `
    <!doctype html>
    <html>
        <head>
            <title>Mypage - Info</title>
            <meta charset="utf-8">
        </head>
        <body>
            <a href="/mypage">정보 변경</a> <br>
            <a href="/mypage/mypost">내가 쓴 글</a> <br>
            <a href="/mypage/myscrap">내가 스크랩한 글</a> <br>
            <a href="/mypage/eraser">지우개</a> <br> 
            
            <div class="myPost-box">
                ${list}
            </div>
        </body>
    </html>
    
    `;
    response.writeHead(200);
    response.end(template);
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