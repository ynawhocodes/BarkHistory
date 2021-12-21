var express = require('express');
var router = express.Router();
var path = require('path');
var auth = require('../lib/auth');
var db = require('../lib/db');
var mypage = require('../lib/mypage');
var qs = require('querystring');

//정보 변경
router.get('/', function(request, response) {
    if (auth.isOwner(request, response) === false) {
        // 로그인 페이지 이동
        response.writeHead(302, {
            Location: `/auth/signIn`
        });
        response.end();
        return false;
    }
    
    response.render('account_info.html', {
        userName: request.session.user_name
    })
});

router.post('/change_process', function(request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(
            'UPDATE user SET user_name=?, user_pw=? WHERE user_id=?', [post.name_change, post.pw_change, request.session.user_id],
            function(error, result) {
                try { //수정 성공
                    console.log("성공");
    
                    //세션에 로그인 여부, 아이디 저장
                    request.session.is_logined = true;
                    request.session.user_name = post.name_change;
    
                    request.session.save(function() {
                        response.send("<script>alert('정보를 수정했습니다.');location.href='/mypage';</script>");
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
    
});

//내가 쓴 글 목록
router.get('/mypost', function(request, response) {
    if (auth.isOwner(request, response) === false) {
        // 로그인 페이지 이동
        response.writeHead(302, {
            Location: `/auth/signIn`
        });
        response.end();
        return false;
    }
    db.query(
        'SELECT * FROM post WHERE user_id=?', [request.session.user_id],
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                response.render('myPost.html', {
                    myPostList: result
                })
            }
        }
    );

});

//내가 스크랩한 글
router.get('/myscrap', function(request, response) {
    if (auth.isOwner(request, response) === false) {
        // 로그인 페이지 이동
        response.writeHead(302, {
            Location: `/auth/signIn`
        });
        response.end();
        return false;
    }
    db.query( //조인-scrap과 post
        'SELECT * FROM scrap LEFT JOIN post ON scrap.post_id=post.post_id WHERE scrap.user_id=?', [request.session.user_id],
        function(error, scrapResult) {
            if (error) {
                console.log(error);
            } else {
                console.log(scrapResult);
                response.render('myScrap.html', {
                    scrapList: scrapResult
                })
            }
        }
    );

});

router.get('/eraser', function(request, response) {
    if (auth.isOwner(request, response) === false) {
        // 로그인 페이지 이동
        response.writeHead(302, {
            Location: `/auth/signIn`
        });
        response.end();
        return false;
    }
    response.render('eraser_list.html')
});

//지우개 글 목록 + 삭제 여부 판단 및 삭제
router.get('/eraserList', async(request, response) => {
    var date_color = Array.from({length: 10000}, () => 3); //지우개 글 색 변화
    db.query(
        'SELECT * FROM eraser WHERE user_id=?', [request.session.user_id],
        async function(error, eraserResult) {
            async function checkDelete() {
                eraserResult.forEach(async function(eraser) {
                    var date = new Date(eraser.eraser_date); //지우개 글 시간
                    var eraser_date = date.getTime();

                    var curr = new Date(); // 현재시간
                    var current_time = curr.getTime();

                    var delete_time = current_time - eraser_date;
                    if(delete_time >= 1000 * 30) {
                        //10초가 지나면 삭제
                        db.query('DELETE FROM eraser WHERE eraser_id=?', [eraser.eraser_id],
                        async function(error, result){
                            if(error) {
                                console.log(error);
                            } else {
                                console.log("지우개 글 삭제 성공");
                            }
                        });
                    }
                    if(delete_time > 0 && delete_time <= 1000 * 10) {
                        date_color[eraser.eraser_id] = 1;
                    } else if(delete_time > 1000 * 10 && delete_time <= 1000 * 20) {
                        date_color[eraser.eraser_id] = 2;
                    } else if(delete_time > 1000 * 20 && delete_time <= 1000 * 30) {
                        date_color[eraser.eraser_id] = 3;
                    }
                });
            }
            if (error) {
                console.log(error);
            } else {
                console.log(eraserResult);
                //삭제 여부 판단
                await checkDelete();

                //글 목록 띄우기
                response.render('eraser_list_iframe.html', {
                    eraserList: eraserResult, date_color: date_color
                })
                
                
            }
        }
    );

});

//지우개 글 상세보기
router.get('/eraser/detail/:pageId', function(request, response) {
    var filteredId = path.parse(request.params.pageId).base;
    db.query(
        'SELECT * FROM eraser WHERE eraser_id=?', [filteredId],
        function(error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                response.render('eraser_detail.html', {
                    eraserPost: result
                })
            }
        }
    );

});

//지우개 글 작성하기
router.get('/eraser/create', function(request, response) {
    if (auth.isOwner(request, response) === false) {
        // 로그인 페이지 이동
        response.writeHead(302, {
            Location: `/auth/signIn`
        });
        response.end();
        return false;
    }
    response.render('eraser_write.html')
});

router.post('/eraser/create_process', function(request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        db.query(`INSERT INTO eraser (eraser_title, eraser_date, eraser_detail, user_id) VALUES(?, ?, ? ,?)`, [post.title_input, new Date(), post.desciption_input, request.session.user_id],
            function(error, result) {
                if(error) {
                    throw error;
                }
                response.writeHead(302, {Location: `/mypage/eraser/detail/${result.insertId}`});
                response.end();
            }
        );
    });
});

module.exports = router;