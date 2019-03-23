const mysql = require("mysql");
var con = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function gibRandomSpieler() {
    con.connect(function (err) {
        if (err) throw err;
        //console.log("Connected!");
    });

    var spieler = [];
    var x;
    con.query("SELECT Name FROM spieler", function (err, result) {
        if (err) throw err;
        spieler = result;
        x = (Math.floor(Math.random() * (spieler.length)));
        //console.log("X Wert Spieler: " + x);
        //console.log(spieler[x]);
        console.log(spieler[x].Name);
		return spieler[x].Name;
    });
    
    con.end();
    

    
}

module.exports.gibRandomSpieler = gibRandomSpieler;

