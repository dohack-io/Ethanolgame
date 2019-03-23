const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function bestimmeFrage() {
    console.log("Test1");
    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");
    });

    var fragen = [];
    con.query("SELECT * FROM quiz", function (err, result) {
        if (err) throw err;
        fragen = result;
        console.log(result);
    });

    //var x = (Math.random() * (max - min)) + min;

    console.log(fragen);
    return fragen;
}

module.exports.bestimmeFrage = bestimmeFrage;

