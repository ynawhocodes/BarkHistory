const express = require('express');
const path = require('path');
const { sequelize } = require('../models');
const router = express.Router();
const {Op} = require("sequelize");
const db = require('../models');
const res = require('express/lib/response');


router.get('/', function(request, response) {
    console.log('a');
    response.render('search');
});


router.get('/:searchString', async function(request, response, next) {
    console.log('a');
    let list_1=[];
    try{
    const searchString = request.params.searchString;
    [result, meta] = await sequelize.query(`select post_title, post_detail, post_detail from post where post_title like '%${searchString}%' or post_detail like '%${searchString}%'`);
    list_1.push(result[0]);
    console.log(result);
 }
    catch {

    }
    console.log(list_1);
    response.render('search',{'list_1':list_1});
});

router.post('/', async(request, response, next) => {
    try{
        console.log('a');
        const { searchString } = request.body;
        console.log(searchString);
        let result, metadata;
        request.session.message = result;
    }
    catch(err){
        console.log(err);
    }
    res.redirect(`/search/${searchString}`);

});


module.exports = router;
