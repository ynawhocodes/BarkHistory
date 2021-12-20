var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var path = require('path');
var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth');
var mypageRouter = require('./routes/mypage');
var campusRouter = require('./routes/campus');
var boardRouter = require('./routes/board');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'cotton candy',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

//static
app.use(express.static(path.join(__dirname, './public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/mypage', mypageRouter);
app.use('/board', boardRouter);
app.use('/campus', campusRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});
app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(3000, function() {
    console.log('success!!');
});

// app.listen(80, function() {
//     console.log('listening on port 80!')
// });