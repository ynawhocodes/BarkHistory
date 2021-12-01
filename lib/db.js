var mysql = require('mysql');
var db = mysql.createConnection({
    host     : '34.64.195.55',
    user     : 'sungmin',
    password : 'password!',
    database : 'barkhistory'
});
db.connect();
module.exports = db;