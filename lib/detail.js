var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'barkhistory',
    database : 'barkhistory'
});

var http = require('http');
var url = require('url');
var qs = require('querystring');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

var template = require('./detailTemplate.js');

var express = require('express');
var app = express();
app.use(express.static('public'));


var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    if (pathname === '/detail') {
        db.query('SELECT * FROM comment', function (error, comments) {
            if (error) {
                console.log(error);
            }
            var title = 'title is title!!!!!!!!';
            var description = 'description';
            var commentList = template.commentList(comments)
            var html = template.HTML(title, description, commentList);
            console.log(comments);
                
            response.writeHead(200);
            response.end(html);      
        })
    }
    else if (pathname === '/detail/create') {
        db.query('SELECT * FROM comment', function (error, comments) {
            if (error) {
                console.log(error);
            }
            var title = 'title is title!!!!!!!!';
            var description = 'description';
            var commentList = template.commentList(comments)
            var form = `<form action="/detail/comment_create_process" method="post">
                            <div class="comment-container">
                                <div class="comment-box comment-box__pink">
                                <p><textarea name="comment" placeholde="댓글을 입력해주세요"></textarea></p>
                            </div>
                            <input type="submit">
                        </form>`
            var html = template.HTML(title, description, commentList, form);
            console.log(comments);
                
            response.writeHead(200);
            response.end(html);      
        })
    }
    else if (pathname == '/detail/comment_create_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var comment = qs.parse(body);
            db.query(`
                INSERT INTO comment (comment_id, comment_detail, comment_date, user_id, emotion_id, post_id)
                    VALUES(?, ?, NOW(), ?, ?, ?)`,
                [null, comment.comment,  1, 1, 1], function(error, result) {
                    if(error) {
                        throw error;
                    }
                    response.writeHead(302, {Location: `/detail`});
                    response.end();
                }
            );
        });
    } else if(pathname === '/detail/update') {
        db.query('SELECT * FROM post', function(error, posts) {
            if(error) {
                throw error;
            }//JOIN 필요
            db.query(`SELECT * FROM comment WHERE post_id=?`, 1, function(error2, comments) {
                if(error2) {
                    throw error2;
                }
                var commentList = template.commentList(comments);
                var html = template.HTML(posts[0].post_title, posts[0].post_detail, commentList,
                    `
                    <form action="/update_process" method="post">
                        <input type="hidden" name="id" value="${comments[0].comment_id}">
                        <p>
                            <textarea name="comment" placeholder="댓글을 입력해주세요">${comments[0].comment_detail}</textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                    <a href="/detail/comment_update?id=${comments[0].id}">update</a>`
                );
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if(pathname === 'detail/comment_update_process') {
        var body = '';
        request.on('data', function(data) {
            body = body + data;
        });
        request.on('end', function() {
            var post = qs.parse(body);
            db.query(`
            INSERT INTO comment (comment_id, comment_detail, comment_date, user_id, emotion_id, post_id)
            VALUES(?, ?, NOW(), ?, ?, ?)`,
            [null, comment.comment,  1, 1, 1],
                function(error, result) {
                    if(error) {
                        throw error;
                    }
                    response.writeHead(302, {Location: `/detail`});
                    response.end();
                }
            );
        });
    } else if (pathname === 'detail/comment_delete_process') {
        var body = '';
        request.on('data', function (data) {
            body = body + data;
        });
        request.on('end', function () {
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function (error) {
                response.writeHead(302, { Location: `/` });
                response.end();
            });
        });
    }
    else {
        response.writeHead(404);
        response.end('Not found!!!!');
    }
        
    
});

app.listen(80, function () {
    console.log('80 port!')
});
