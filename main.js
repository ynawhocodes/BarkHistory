var express = require('express');
var app = express();

var categoryRouter = require('./routes/campus');

app.use('/campus', categoryRouter);

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!');
});

app.use(function (err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(80, function() {
    console.log('listening on port 80!')
});
