var fs = require('fs');
var html = require('html');
var mysql = require('mysql');
var express = require('express');
var app = express();
const res = require('express/lib/response');
var bodyParser = require('body-parser');
var http = require('http');
const { Router } = require('express');
const path = require('path');
const { Http2ServerResponse } = require('http2');
const searchRounter = require('./routes/search');
const homeRouter = require('./routes/home');
const boardRouter = require('./routes/board');
const mypageRouter = require('./routes/mypage');
app.use(express.static(path.join(__dirname, 'css'))); 
const { sequelize } = require('./models');


sequelize.sync({ force: false }) // db 연결 
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html'); 
//app.set('views', './views');
//app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',homeRouter);
app.use('/search',searchRounter);
app.use('/board', boardRouter);
app.use('/mypage', mypageRouter);




app.listen(3000, function () {
    console.log('server running at http://127.0.0.1:3306');
});

