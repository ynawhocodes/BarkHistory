var db = require('./db');
var template = require('./detailTemplate.js');
var express = require('express');
var app = express();
var qs = require('querystring');
var path = require('path');

// 글 작성
app.get('/board/create', function (request, response) {
    db.query('SELECT * FROM category',
        function (error, result) {
            if (error) {
                throw error;
            }
            response.render('write.html', {
                writeDB_result: result
            })

        })
});

app.post('/board/create_process', function (request, response) {
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
                [post.post_title, post.post_detail, post.category, request.session.user_id],
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
app.get('/board/1', (request, response) => {
    db.query(
        "select post_id, post_title, post_detail, user_name,category_id,post_date, post_emotion_number from post left join user on post.user_id = user.user_id where category_id=? order by post_date desc",
        [1],
        function (error, result) {
            if (error) {
                throw error;
            }
            db.query( //카테고리 이름, 설명 가져오기
                "select category_name, category_detail from category left join post on category.category_id=post.category_id where category.category_id=? limit 1",
                [1],
                function (error, result2) {
                    if (error)
                        throw error;

                    db.query( //실시간 인기글 가져오기 
                        'select post_title, post_detail, post_date from post where post_date between date_add(now(), interval -1 week)and now() and category_id=? order by post_emotion_number desc limit 1',
                        [1],
                        function (error3, result3) {
                            if (error3)
                                throw error;
                            response.render('post_list.html', {

                                //실시간 인기글
                                hot_post: result3,
                                //카테고리 정보 
                                cateList: result2,
                                boardList: result,
                            });
                        });
                });
        });
});
//글 목록(test)
/*app.get('/board/1', function (req, res) {
    return res.send('/board/1')
});*/

//글 조회
app.get('/board/1/:postId', function (request, response) {
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
app.get('/board/1/:postId/post_update', function (request, response) {
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
app.post('/board/1/:postId/post_update_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var post = qs.parse(body);
        var title = post.post_title;
        var description = post.post_detail;

        db.query(`UPDATE post SET post_title=?, post_detail=? WHERE post_id=?`, [title, description, request.params.postId], function (error, result) {
            response.redirect(`/board/1/${request.params.postId}`);
            response.end();
        });
    });
});

//글 삭제 처리
app.post('/board/1/post_delete_process', function (request, response) {
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
            response.redirect(`/board/1`);
            response.end();
        });
    });
});

//댓글 생성
app.get('/board/1/:postId/comment_create', function (request, response) {
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
app.post('/board/1/:postId/comment_create_process', function (request, response) {
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
                response.redirect(`/board/1/${request.params.postId}`);
                response.end();
            }
        );
    });
});

//댓글 수정
app.get('/board/1/:postId/:commentId/comment_update', function (request, response) {
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
                var commentForm = `<form action="/board/1/${request.params.postId}/${request.params.commentId}/comment_update_process" method="post">
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
app.post('/board/1/:postId/:commentId/comment_update_process', function (request, response) {
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
                response.redirect(`/board/1/${request.params.postId}`)
                response.end();
            }
        );
    });
});

//댓글 삭제 처리
app.post('/board/1/:postId/comment_delete_process', function (request, response) {
    var body = '';
    request.on('data', function (data) {
        body = body + data;
    });
    request.on('end', function () {
        var comment = qs.parse(body);
        var postId = request.params.postId;

       db.query(`DELETE FROM comment WHERE comment_id=?`, [comment.id], function (error, result) {
            if (error) {
                throw error;
            }
            response.redirect(`/board/1/${postId}`);
            response.end();
        });
    });
});
//스크랩
app.post('/post_scrap_process', function (request, response) {
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

app.use(express.static(path.join(__dirname, './public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, function() {
    console.log('listening on port 80!')
});