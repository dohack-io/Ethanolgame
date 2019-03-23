const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function bestimmeSpielstatus(){
    var staten = [];
    staten[0] = "einzel";
    staten[1] = "duell";
    staten[2] = "alle";

    var status = staten[(Math.floor(Math.random() * (staten.length)))];
    connection.query("UPDATE spiel SET status = '" + status + "' WHERE id = 1");
    return status;
}

function spielerHinzufuegen(spielername){
    
}

module.exports.bestimmeSpielstatus = bestimmeSpielstatus;
