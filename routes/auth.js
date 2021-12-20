var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/signIn', function(request, response) {
    response.render('signIn.html')
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
    response.render('signUp.html')
});


router.post('/signUp_process', function(request, response) {
    var post = request.body;
    db.query(`SELECT COUNT(*) AS nameCount FROM user WHERE user_name=?`, [post.name_input],
        function(error, result) {
            if(error) {
                throw error;
            }
            console.log(result[0].nameCount);
            if(result[0].nameCount == 0) { //아이디 중복여부 확인
                if(post.pw_input === post.pw_check_input) { //비밀번호 동일하게 입력했는지 확인
                    db.query(`INSERT INTO user (user_name, user_pw) VALUES(?, ?)`, [post.name_input, post.pw_input],
                        function(error, result) {
                            if(error) {
                                throw error;
                            }
                            response.send("<script>alert('회원가입 성공! 로그인해주세요.');location.href='/auth/signIn';</script>");
                    });
                }
                else {
                    response.send("<script>alert('비밀번호를 확인해주세요.');location.href='/auth/signUp';</script>");
                }
            }
            else {
                response.send("<script>alert('이미 존재하는 아이디입니다. 다른 아이디를 입력해주세요.');location.href='/auth/signUp';</script>");
            }
    });
    
    
});

router.get('/logout', function (request, response) {
    request.session.destroy(function(err) {
        response.redirect('/');
    });
});


module.exports = router;