var mysql = require('mysql');
var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'barkhistory',
    database : 'barkhistory'
});
db.connect();
module.exports = db;
