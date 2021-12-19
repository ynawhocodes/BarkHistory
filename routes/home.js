const express = require('express');
const path = require('path');
const { sequelize } = require('../models');
const router = express.Router();



router.get('/', async function(request, response, next) {
    console.log('a');
    let list = [];
    for (let k=1; k<=7; k++) {
        [result, meta] =  await sequelize.query(`select post_title, post_scrap_number, post_detail from post where post_date between date_add(now(), interval -1 week)and now() and category_id='${k}' order by post_emotion_number desc limit 1;`);
        list.push(result[0]);
    };
    console.log(list);
    response.render('home',{'list':list});
});

module.exports = router;


