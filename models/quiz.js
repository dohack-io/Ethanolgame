const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  });

var fragen = [];
con.query("SELECT * FROM quiz", function (err, result, fields) {
   if (err) throw err;
   fragen = fields;
});

console.log(fragen);
module.exports.inhalt = fragen;

