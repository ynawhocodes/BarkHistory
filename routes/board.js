var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var auth = require('../lib/auth');
var req = require('express/lib/request');
var res = require('express/lib/response');

// 글 작성
router.get('/create', function (req, res) {
    db.query('SELECT * FROM category',
        function (error, result) {
            if (error) {
                console.log(error);
            } else {
                console.log(result);
                res.render('write.html', {
                    writeDB_result: result
                })
            }
        })
});

router.post('/create_process', function (req, res) {
    db.query('SELECT * FROM post where category_id=?',
        [req.params.category_id],
        function (error, result) {
            if (auth.isOwner(req, res) === false) {
                // 로그인 페이지 이동
                res.writeHead(302, {
                    Location: `/auth/signIn`
                });
                res.end();
                return false;
            }
            var post = req.body;
            db.query(
                `INSERT INTO post (post_title, post_detail, category_id, user_id) values(?,?,?,?)`,
                [post.post_title, post.post_detail, post.category, req.session.user_id],
                function (error, result2) {
                    if (error) {
                        throw error;
                    }
                    res.writeHead(302, {
                        //글 목록으로 이동
                        Location: `/board/${post.category}`
                    });
                    res.end();
                }
            );
        });
});

//글 목록 
router.get('/:category_id', (req, res) => {
        db.query( //카테고리 이름, 설명 가져오기
            "select category_name, category_detail from category left join post on category.category_id=post.category_id where category.category_id=? limit 1",
            [req.params.category_id],
            function (error, data) {
                if (error) {
                    console.log(error);
                }
                db.query( //글 목록 가져오기
                    "select post_title, post_detail, user_name, date_format(post_date, '%m/%d') as post_date, post_emotion_number from post left join user on post.user_id=user.user_id where category_id=? order by post_date desc",
                    [req.params.category_id],
                    function (error2, results) {
                        if (error2) {
                            throw error2;
                        }
                        db.query( //실시간 인기글 가져오기 
                            'select post_title, post_detail, post_date from post where post_date between date_add(now(), interval -1 week)and now() and category_id=? order by post_emotion_number desc limit 1',
                            [req.params.category_id],
                            function (error3, result2) {
                                if (error3) {
                                    console.log(error);
                                } else {
                                    console.log(results);
                                    res.render('post_list.html', {
                                        //글 목록
                                        boardDB_results: results,
                                        //실시간 인기글
                                        hot_post: result2,
                                        //카테고리 정보 
                                        cate: data,
                                    })
                                }
                            })
                    })
            })
    })
module.exports = router;