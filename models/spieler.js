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

function Spieler(id, name, bildurl) {
    this.id = id;
    this.name = name;
    this.bildurl = bildurl;
}

function gibAlleSpielerMitStatus(callback) {
    var erg = [];

    connection.query("SELECT id,name,bildurl FROM spieler", function (err, result) {
        result.forEach(element => {
            erg.push(new Spieler(element.id, element.name, element.bildurl));
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

function gibRandomSpieler(callback) {
    connection.query("SELECT id, name FROM spieler", function (err, result) {
        var spielerarr = [];
        result.forEach(element => {
            spielerarr.push(new Spieler(element.id, element.name));
        });

        var rdnspieler = spielerarr[(Math.floor(Math.random() * (spielerarr.length)))];

        connection.query("INSERT INTO spiel_spieler VALUES(1, " + rdnspieler.id + ")");

        callback(rdnspieler.name);
    })
}

function spielerProSpielLoeschen() {
    connection.query("DELETE FROM spiel_spieler");
}

function bildsetzen() {
    gibAlleSpielerMitStatus(function (erg) {
        erg.forEach(element => {
            connection.query("SELECT punkte FROM spieler WHERE id =" + element.id , function (err, resultpunkte) {
                switch (resultpunkte.punkte) {
                    case 0:
                        connection.query("UPDATE spieler SET bildurl = 'Glas0.png' WHERE id = " + element.id );
                        break;
                    case 1:
                        connection.query("UPDATE spieler SET bildurl = 'Glas1.png' WHERE id = " + element.id );
                        break;
                    case 2:
                        connection.query("UPDATE spieler SET bildurl = 'Glas2.png' WHERE id = " + element.id );
                        break;
                    case 3:
                        connection.query("UPDATE spieler SET bildurl = 'Glas3.png' WHERE id = " + element.id );
                        break;
                }
            });
        })
    })

}

module.exports.gibAlleSpieler = gibAlleSpieler;
module.exports.spielerAufnehmen = spielerAufnehmen;
module.exports.alleSpielerLoeschen = alleSpielerLoeschen;
module.exports.gibAlleSpielerMitStatus = gibAlleSpielerMitStatus;
module.exports.gibRandomSpieler = gibRandomSpieler;
module.exports.spielerProSpielLoeschen = spielerProSpielLoeschen;
module.exports.bildsetzen = bildsetzen;


