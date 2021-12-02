var db = require('./db');
var qs = require('querystring');
var url = require('url');
var sanitizeHtml = require('sanitize-html');

// 상세글 보는 화면
exports.boardDetail = function(request, response) {
    var template = `
    
    `;
    response.writeHead(200);
    response.end(template);
}

// 댓글 보는 화면
exports.comment = function(request, response) {
    var template = `
    
    `;
    response.writeHead(200);
    response.end(template);
}