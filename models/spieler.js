const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function gibAlleSpieler(callback) {
    var erg = [];

    connection.query("SELECT Name FROM spieler", function (err, result) {
        result.forEach(element => {
            erg.push(element.Name);
        });
        callback(erg);
    });
}

function Spieler(name, bildurl) {
    this.name = name;
    this.bildurl = bildurl;
}

function gibAlleSpielerMitStatus(callback) {
    var erg = [];

    connection.query("SELECT name,bildurl FROM spieler", function (err, result) {
        result.forEach(element => {
            erg.push(new Spieler(element.name, element.bildurl));
        });
        callback(erg);
    });
}

function spielerLoeschen(spielername) {
    connection.query("DELETE FROM spieler WHERE Name = '" + spielername + "'");
}

function alleSpielerLoeschen() {
    connection.query("DELETE FROM spieler");
}

function spielerAufnehmen(spielername) {
    connection.query("INSERT INTO spieler(Name) VALUES('" + spielername + "')");
}

module.exports.gibAlleSpieler = gibAlleSpieler;
module.exports.spielerAufnehmen = spielerAufnehmen;
module.exports.alleSpielerLoeschen = alleSpielerLoeschen;
module.exports.gibAlleSpielerMitStatus = gibAlleSpielerMitStatus;


