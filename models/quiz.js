const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "dohackjs19",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohackjs19"
});


var fragen = [];
con.connect(function (err) {
    if (err) throw err;
    con.query("SELECT * FROM quiz", function (err, result, fields) {
        if (err) throw err;
        fragen = fields;
    });
});

console.log(fragen);
module.exports.inhalt = inhalt;

