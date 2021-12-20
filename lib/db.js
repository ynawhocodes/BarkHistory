var mysql = require('mysql');
// var db = mysql.createConnection({
//     host     : 'localhost',
//     user     : 'root',
//     password : 'barkhistory',
//     database : 'barkhistory'
// });
var db = mysql.createConnection({
    host     : '34.64.195.55',
    user     : 'sungmin',
    password : 'password!',
    database : 'barkhistory',
    dateStrings: "date"
});
db.connect();
module.exports = db;
