var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'barkhistory',
    database : 'barkhistory'
});

var template = require('../lib/detailTemplate.js');
var express = require('express');
var router = express.Router();
var qs = require('querystring');

//글 목록(test)
router.get('/campus', function (req, res) {
    return res.send('/campus')
});

//글 조회
router.get('/campus/:postId', function (request, response) {
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
                console.log(commentsCount);
                var commentList = template.commentList(comments)
                var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt);
                console.log(comments);
                
                return response.send(html)
            });
        });
    });
});


//글 수정
router.get('/campus/:postId/post_update', function (request, response) {
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
                var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt);
                console.log(comments);
                    
                return response.send(html)
            });
        })
    });
});

//글 수정 처리
router.post('/campus/:postId/post_update_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.post_title;
        var description = post.post_detail;

        db.query(`UPDATE post SET post_title=?, post_detail=? WHERE post_id=?`, [title, description, request.params.postId], function (error, result) {
            response.redirect(`/campus/${request.params.postId}`);
            response.end();
        });
    });
});

//글 삭제 처리
router.post('/campus/post_delete_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);

        db.query(`DELETE FROM post WHERE post_id=?`, [post.post_id], function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect(`/campus`);
            response.end();
        });
    });
});

//댓글 생성
router.get('/campus/:postId/comment_create', function (request, response) {
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

                var commentForm = `<form action="comment_create_process" method="post">
                                    <div class="comment-box comment-box__blue">
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
                var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt);
                console.log(comments);
                    
                response.send(html)
            });
        });
    });
});

// 댓글 생성 처리
router.post('/campus/:postId/comment_create_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var comment = qs.parse(body);
        console.log(comment);
        db.query(`INSERT INTO comment (comment_id, comment_detail, comment_date, user_id, emotion_id, post_id)
                VALUES(?, ?, NOW(), ?, ?, ?)`,
                [null, comment.comment, 1, 1, request.params.postId], function (error, result) {
                if (error) {
                    throw error;
                }
                response.redirect(`/campus/${request.params.postId}`);
                response.end();
            }
        );
    });
});

//댓글 수정
router.get('/campus/:postId/comment_update', function (request, response) {
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
                var commentList = template.commentList(comments);
                var postControl = template.postControl(true, request.params.postId, post);

                var commentForm = `<form action="comment_update_process" method="post">
                                    <div class="comment-box comment-box__blue">
                                        <div class="comment-box-top">
                                            <div class="comment-box-top__info">
                                                <span>익명</span>
                                                <span>2021-05-03</span>
                                            </div>
                                            <div class="comment-box-top__stuff">
                                                <input type="submit" value="수정 완료">
                                            </div>
                                        </div>
                                        <input type="hidden" name="id" value="${comments[0].comment_id}">
                                        <input name="comment" value="${comments[0].comment_detail}">
                                    </div>
                                </form>`
                var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt);
                return response.send(html)
            });
        });
    });
});
router.post('/campus/:postId/comment_update_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var comment = qs.parse(body);
        db.query(`UPDATE comment SET comment_detail=?, emotion_id=? WHERE comment_id=?`,
            [comment.comment, 1, comment.comment_id],
            function (error, result) {
                if (error) {
                    throw error;
                }
                response.redirect(`/campus/${request.params.postId}`)
                response.end();
            }
        );
    });
});
router.post('/campus/comment_update_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var comment = qs.parse(body);

       db.query(`DELETE FROM comment WHERE comment_id=?`, [comment.comment_id], function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect(`/campus/${request.params.postId}`);
            response.end();
        });
    });
});


module.exports = router;