const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function bestimmeFrage() {
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    var fragen = [];
    con.query("SELECT * FROM quiz", function (err, result, fields) {
        if (err) throw err;
        fragen = fields;
    });

    //var x = (Math.random() * (max - min)) + min;

    console.log(fragen);
    console.log("Test");

    return fragen;
}

module.exports.inhalt = bestimmeFrage;

