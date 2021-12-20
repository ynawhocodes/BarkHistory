var template = require('../lib/detailTemplate.js');
var express = require('express');
var app = express();
var router = express.Router();
var qs = require('querystring');
var db = require('../lib/db');


//글 조회
router.get('/:postId', function (request, response) {
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
                var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt, request.params.postId);
                
                return response.send(html)
            });
        });
    });
});


//글 수정
router.get('/:postId/post_update', function (request, response) {
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
                var html = template.HTML(postControl, commentList, "", commentsCount[0].cmtcnt, request.params.postId);
                    
                return response.send(html)
            });
        })
    });
});

//글 수정 처리
router.post('/:postId/post_update_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.post_title;
        var description = post.post_detail;

        db.query(`UPDATE post SET post_title=?, post_detail=? WHERE post_id=?`, [title, description, request.params.postId], function (error, result) {
            response.redirect(`${request.baseUrl}/${request.params.postId}`);
            response.end();
        });
    });
});

//글 삭제 처리
router.post('/post_delete_process', function (request, response) {
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
            response.redirect(`${request.baseUrl}`);
            response.end();
        });
    });
});

//댓글 생성
router.get(':categoryId/:postId/comment_create', function (request, response) {
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
                                    <input type="hidden" name="emoji_id" value="emotion_id">
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
                var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt, request.params.postId);
                console.log(comments);
                    
                response.send(html)
            });
        });
    });
});

// 댓글 생성 처리
router.post('/:postId/comment_create_process', function (request, response) {
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
                console.log(`${request.baseUrl}/${request.params.postId}`)
                response.redirect(`${request.baseUrl}/${request.params.postId}`);
                response.end();
            }
        );
    });
});

//댓글 수정
router.get('/:postId/:commentId/comment_update', function (request, response) {
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
                var commentForm = `<form action="/${request.params.postId}/${request.params.commentId}/comment_update_process" method="post">
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
                var html = template.HTML(postControl, commentList, commentForm, commentsCount[0].cmtcnt, request.params.postId);
                return response.send(html)
            });
        });
    });
});

//댓글 수정 처리
router.post('/:postId/:commentId/comment_update_process', function (request, response) {
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
router.post('/:postId/comment_delete_process', function (request, response) {
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
router.post('/post_scrap_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);

        db.query(`INSERT INTO scrap (user_id, post_id, category_id, scrap_date)
                VALUES(?, ?, ?, NOW())`,
                [1, post.scrap_post_id, 1, null], function (error, result) {
                if (error) {
                    throw error;
                }
            response.redirect(`${request.baseUrl}/${request.params.postId}`);
            response.end();
        });
    });
});
module.exports = router;
