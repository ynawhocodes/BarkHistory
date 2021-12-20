var express = require('express');
var router = express.Router();
var db = require('../lib/db');
var auth = require('../lib/auth');
var req = require('express/lib/request');
var res = require('express/lib/response');
var template = require('../lib/detailTemplate.js');
var qs = require('querystring');

// 글 작성
router.get('/create', function (request, response) {
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

router.post('/create_process', function (request, response) {
    db.query('SELECT * FROM post where category_id=?',
        [request.params.category_id],
        function (error, result) {
            if (auth.isOwner(request, response) === false) {
                // 로그인 페이지 이동
                response.writeHead(302, {
                    Location: `/auth/signIn`
                });
                response.end();
                return false;
            }
            var post = request.body;
            db.query(
                `INSERT INTO post (post_title, post_detail, category_id, user_id) values(?,?,?,?)`,
                [post.post_title, post.post_detail, post.category, req.session.user_id],
                function (error, result2) {
                    if (error) {
                        throw error;
                    }
                    response.writeHead(302, {
                        //글 목록으로 이동
                        Location: `/board/${post.category}`
                    });
                    response.end();
                }
            );
        });
});

//글 목록 
router.get('/:category_id', (request, response) => {
            db.query(
                    "select post_id, post_title, post_detail, user_name,category_id,date_format(post_date, '%m/%d') as post_date, post_emotion_number from post left join user on post.user_id = user.user_id where category_id=? order by post_date desc",
                    [request.params.category_id],
                    function (error, posts) {
                        if (error) {
                            console.log(error);
                        }
                        db.query( //카테고리 이름, 설명 가져오기
                            "select category_name, category_detail from category left join post on category.category_id=post.category_id where category.category_id=? limit 1",
                            [request.params.category_id],
                            function (error, data) {
                                if (error) {
                                    console.log(error);
                                }
                                db.query( //실시간 인기글 가져오기 
                                    'select post_title, post_detail, post_date from post where post_date between date_add(now(), interval -1 week)and now() and category_id=? order by post_emotion_number desc limit 1',
                                    [request.params.category_id],
                                    function (error3, result2) {
                                        if (error3) {
                                            console.log(error);
                                        }
                                        response.render('post_list.html', {

                                            //실시간 인기글
                                            hot_post: result2,
                                            //카테고리 정보 
                                            cate: data,
                                            boardList: posts,
                                        });
                                    });
                                });
                            });
                            });

                        //글 조회
                        router.get('/:category_id/:postId', function (request, response) {
                            db.query(`SELECT * FROM post WHERE post_id=?`, [request.params.postId], function (error, post) {
                                if (error) {
                                    console.log(error);
                                }
                                db.query(`SELECT * FROM comment WHERE post_id=?`, [request.params.postId], function (error2, comments) {
                                    if (error2) {
                                        throw error2;
                                    }
                                    db.query(`SELECT COUNT(*) AS cmtcnt FROM comment WHERE post_id=?`, [request.params.postId], function (error3, commentsCount) {
                                        if (error3) {
                                            throw error3;
                                        }
                                        var postControl = template.postControl(true, request.params.postId, post)
                                        var commentList = template.commentList(comments)
                                        var reactionModal = template.reactionModal(request.params.postId)
                                        var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt, reactionModal);

                                        return response.send(html)
                                    });
                                });
                            });


                        });

                        //글 수정
router.get('/:category_id/:postId/post_update', function (request, response) {
    db.query(`SELECT * FROM post WHERE post_id=?`, [request.params.postId], function (error, post) {
        if (error) {
            console.log(error);
        }
        db.query(`SELECT * FROM comment WHERE post_id=?`, [request.params.postId], function (error2, comments) {
            if (error2) {
                                        throw error2;
                                    }
                                    db.query(`SELECT COUNT(*) AS cmtcnt FROM comment WHERE post_id=?`, [request.params.postId], function (error3, commentsCount) {
                                        if (error3) {
                                            throw error3;
                                        }
                                        var postControl = template.postFormControl(true, post);

                                        var commentList = template.commentList(comments)
                                        var reactionModal = template.reactionModal(request.params.postId)
                                        var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt, reactionModal);

                                        return response.send(html)
                                    });
                                })
                            });
                        });

                        //글 수정 처리
                        router.post('/:category_id/:postId/post_update_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var post = qs.parse(body);
                                var title = post.post_title;
                                var description = post.post_detail;

                                db.query(`UPDATE post SET post_title=?, post_detail=? WHERE post_id=?`, [title, description, request.params.postId], function (error, result) {
                                    response.redirect(`/${request.params.category_id}/${request.baseUrl}/${request.params.postId}`);
                                    response.end();
                                });
                            });
                        });

                        //글 삭제 처리
                        router.post('/:category_id/:postId/post_delete_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var post = qs.parse(body);

                                db.query('DELETE FROM post WHERE post_id=?', [request.params.postId], function (error, result) {
                                    if (error) {
                                        throw error;
                                    }
                                    response.redirect(`${request.baseUrl}`);
                                    response.end();
                                });
                            });
                        });

                        //댓글 생성
                        router.get('/:category_id/:postId/comment_create', function (request, response) {
                            db.query(`SELECT * FROM post WHERE post_id=?`, [request.params.postId], function (error, post) {
                                if (error) {
                                    console.log(error);
                                }
                                db.query(`SELECT * FROM comment WHERE post_id=?`, [request.params.postId], function (error2, comments) {
                                    if (error2) {
                                        throw error2;
                                    }
                                    db.query(`SELECT COUNT(*) AS cmtcnt FROM comment WHERE post_id=?`, [request.params.postId], function (error3, commentsCount) {
                                        if (error3) {
                                            throw error3;
                                        }
                                        var postControl = template.postControl(true, request.params.postId, post);

                                        var commentForm = `<form action="/board/comment_create_process" method="post">
                                    <div class="comment-box" id="comment-box__setBgColor">
                                        <div class="comment-box-top">
                                            <div class="comment-box-top__info">
                                            <span>익명</span>
                                            </div>
                                            <div class="comment-box-top__stuff">
                                                <input type="submit">
                                            </div>
                                        </div>
                                        <input name="comment">
                                    </div>
                                </form>`

                                        var commentList = template.commentList(comments)
                                        var reactionModal = template.reactionModal(request.params.postId)
                                        var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt, reactionModal);
                                        console.log(comments);

                                        response.send(html)
                                    });
                                });
                            });
                        });

                        // 댓글 생성 처리
                        router.post('/:category_id/:postId/comment_create_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var comment = qs.parse(body);
                                console.log(comment);
                                db.query(`INSERT INTO comment (comment_id, comment_detail, comment_date, user_id, emotion_id, post_id)
                VALUES(?, ?, NOW(), ?, ?, ?)`,
                                    [null, comment.comment, 1, 1, request.params.postId],
                                    function (error, result) {
                                        if (error) {
                                            throw error;
                                        }
                                        console.log(`${request.baseUrl}/${request.params.postId}`)
                                        response.redirect(`${request.baseUrl}/${request.params.postId}`);
                                        response.end();
                                    }
                                );
                            });
                        });

                        //댓글 수정
                        router.get('/:category_id/:postId/:commentId/comment_update', function (request, response) {
                            db.query(`SELECT * FROM post WHERE post_id=?`, [request.params.postId], function (error, post) {
                                if (error) {
                                    console.log(error);
                                }
                                db.query(`SELECT * FROM comment WHERE post_id=?`, [request.params.postId], function (error2, comments) {
                                    if (error2) {
                                        throw error2;
                                    }
                                    db.query(`SELECT COUNT(*) AS cmtcnt FROM comment WHERE post_id=?`, [request.params.postId], function (error3, commentsCount) {
                                        if (error3) {
                                            throw error3;
                                        }
                                        var commentList = template.commentFormList(comments);
                                        var postControl = template.postControl(true, request.params.postId, post);
                                        console.log(request.params.commentId);
                                        console.log(comments[request.params.commentId - 1]);
                                        console.log(comments[request.params.commentId - 1]);
                                        var commentForm = `<form action="/board/${request.params.postId}/${request.params.commentId}/comment_update_process" method="post">
                                    <div class="comment-box" id="comment-box__setBgColor">
                                        <div class="comment-box-top">
                                            <div class="comment-box-top__info">
                                                <span>익명</span>
                                                <span>2021-05-03</span>
                                            </div>
                                            <div class="comment-box-top__stuff">
                                                <input type="submit" value="수정 완료">
                                            </div>
                                        </div>
                                        <input type="hidden" name="id" value="${comments[request.params.commentId - 1].comment_id}">
                                        <input name="comment" value="${comments[request.params.commentId - 1].comment_detail}">
                                    </div>
                                </form>`
                                        var reactionModal = template.reactionModal(request.params.postId);
                                        var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt, reactionModal);
                                        return response.send(html)
                                    });
                                });
                            });
                        });

                        //댓글 수정 처리
                        router.post('/:category_id/:postId/:commentId/comment_update_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var comment = qs.parse(body);
                                console.log(comment);
                                db.query(`UPDATE comment SET comment_detail=?, emotion_id=? WHERE comment_id=?`,
                                    [comment.comment, 1, comment.id],
                                    function (error, result) {
                                        if (error) {
                                            throw error;
                                        }
                                        response.redirect(`${request.baseUrl}/${request.params.postId}`)
                                        response.end();
                                    }
                                );
                            });
                        });

                        //댓글 삭제 처리
                        router.post('/:category_id/:postId/comment_delete_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var comment = qs.parse(body);

                                db.query(`DELETE FROM comment WHERE comment_id=?`, [comment.id], function (error, result) {
                                    if (error) {
                                        throw error;
                                    }
                                    response.redirect(`${request.baseUrl}/${request.params.postId}`);
                                    response.end();
                                });
                            });

                        });

                        //스크랩
                        router.post('/:category_id/post_scrap_process', function (request, response) {
                            var body = '';
                            request.on('data', function (data) {
                                body = body + data;
                            });
                            request.on('end', function () {
                                var post = qs.parse(body);

                                db.query(`INSERT INTO scrap (user_id, post_id, category_id, scrap_date)
                VALUES(?, ?, ?, NOW())`,
                                    [1, post.scrap_post_id, 1, null],
                                    function (error, result) {
                                        if (error) {
                                            throw error;
                                        }
                                        response.redirect(`${request.baseUrl}/${request.params.postId}`);
                                        response.end();
                                    });
                            });
                        });
                        module.exports = router;