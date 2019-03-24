const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function gibAlleSpielerNamen(callback) {
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

function gibAlleSpielerAlsSpieler(callback) {
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

//Wählt einen beliebigen Spieler und speichert diesen in spiel_spieler
function gibRandomSpielerEinzel(callback) {
    spielerProSpielLoeschen();
    connection.query("SELECT id, name FROM spieler", function (err, result) {
        var spielerarr = [];
        result.forEach(element => {
            spielerarr.push(new Spieler(element.id, element.name));
        });

        //bestimmen eines zufälligen Spielers
        var rdnspieler = spielerarr[(Math.floor(Math.random() * (spielerarr.length)))];

        connection.query("INSERT INTO spiel_spieler VALUES(1, " + rdnspieler.id + ")");

        callback(rdnspieler.name);
    })
}

function gibRandomSpielerDuell(callback) {
    spielerProSpielLoeschen();
    connection.query("SELECT id, name FROM spieler", function (err, result) {
        var spielerarr = [];
        result.forEach(element => {
            spielerarr.push(new Spieler(element.id, element.name));
        });

        //bestimmen 2 unterschiedlicher zufälliger Spieler
        var rdnspieler = [];
        rdnspieler[0] = spielerarr[(Math.floor(Math.random() * (spielerarr.length)))];
        rdnspieler[1] = spielerarr[(Math.floor(Math.random() * (spielerarr.length)))];
        while(rdnspieler[0] == rdnspieler[1]){
            rdnspieler[1] = spielerarr[(Math.floor(Math.random() * (spielerarr.length)))];
        }

        connection.query("INSERT INTO spiel_spieler VALUES(1, " + rdnspieler.id + ")");

        callback(rdnspieler.name);
    })
}

function spielerProSpielLoeschen() {
    connection.query("DELETE FROM spiel_spieler");
}

function bildsetzen(callback) {
    //console.log("bilder setzen");
    gibAlleSpielerAlsSpieler(function (erg) {
        console.log(erg);
        erg.forEach(element => {
            connection.query("SELECT punkte FROM spieler WHERE id =" + element.id , function (err, resultpunkte) {
                switch (resultpunkte[0].punkte) {
                    case 0:
                        connection.query("UPDATE spieler SET bildurl = 'Glas0.png' WHERE id = " + element.id );
                        //console.log("Bild gesetzt: 0 ")

                        break;
                    case 1:
                        connection.query("UPDATE spieler SET bildurl = 'Glas1.png' WHERE id = " + element.id );
                        //console.log("Bild gesetzt: 1 ")

                        break;
                    case 2:
                        connection.query("UPDATE spieler SET bildurl = 'Glas2.png' WHERE id = " + element.id );
                        //console.log("Bild gesetzt: 2 ")

                        break;
                    case 3:
                        connection.query("UPDATE spieler SET bildurl = 'Glas3.png' WHERE id = " + element.id );
                        //console.log("Bild gesetzt: 3 ")

                        break;
                }
            });
            console.log("before end");
        })
        console.log("sdasd");
        setTimeout(function(){
            callback(erg);
        },200);
        
    })

}

module.exports.gibAlleSpielerNamen = gibAlleSpielerNamen;
module.exports.spielerAufnehmen = spielerAufnehmen;
module.exports.alleSpielerLoeschen = alleSpielerLoeschen;
module.exports.gibAlleSpielerAlsSpieler = gibAlleSpielerAlsSpieler;
module.exports.gibRandomSpielerEinzel = gibRandomSpielerEinzel;
module.exports.gibRandomSpielerDuell = gibRandomSpielerDuell;
module.exports.spielerProSpielLoeschen = spielerProSpielLoeschen;
module.exports.bildsetzen = bildsetzen;


