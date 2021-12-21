var express = require('express');
var router = express.Router();
var db = require('../lib/db');

router.get('/', function (request, response) {
    // 실시간 인기글
    db.query(`select post_title, post_detail, post_date, post_scrap_number from post where post_date between date_add(now(), interval -1 week)and now() and category_id=? order by post_emotion_number desc limit 1`,
        [request.params.category_id],
        function (error, result) {
            if (error) {
                throw error;
            }
            response.render('home.html', {
                hot_post: result,
            });
        });
});
module.exports=router;