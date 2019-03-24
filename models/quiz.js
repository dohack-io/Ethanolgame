const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function bestimmeFrage(callback) {
    var erg = [];

    connection.query("SELECT name FROM spieler JOIN spiel_spieler ON spieler.id=spiel_spieler.idspieler", function (err, result) {
        erg[0] = result[0].name;
    });

    connection.query(
        "SELECT id, frage, aw1, aw2, aw3, aw4 FROM quiz LEFT JOIN spiel_frage ON quiz.id = spiel_frage.idfrage " +
        "WHERE spiel_frage.idfrage IS NULL ",
        function (err, result) {
            if (err) throw err;
            var y = (Math.floor(Math.random() * (result.length)));
            var aktuelleId = result[y].id;
            connection.query("UPDATE quiz SET aktiv = 1 WHERE ID = " + aktuelleId);
            erg[1] = result[y].frage;
            erg[2] = result[y].aw1;
            erg[3] = result[y].aw2;
            erg[4] = result[y].aw3;
            erg[5] = result[y].aw4;

            //console.log(erg);
            callback(erg);
        }
    );
}

function antwortpruefen(antwort) {
    connection.query("SELECT richtig FROM quiz WHERE aktiv = 1", function (err, result) {
        connection.query("SELECT idspieler from spiel_spieler", function (err, resultid) {
            console.log(resultid);
            connection.query("SELECT punkte FROM spieler WHERE id = " + resultid[0].idspieler, function (err, resultpunkte) {
                let rsp = resultpunkte[0].punkte +1;
                let rsm = resultpunkte[0].punkte -1;

                console.log(result);
                console.log(result[0].richtig);
                console.log(antwort);
                if (result[0].richtig == antwort) {
                    console.log("Punkte für " + resultid[0].idspieler + " erhöht");
                    connection.query(
                        "UPDATE spieler SET punkte = " + rsp + " WHERE id = (?) ",resultid[0].idspieler);
                }
                else {
                    if (resultpunkte[0].punkte != 0) {
                        console.log("Punkte für " + resultid[0].idspieler + " verringert");
                        connection.query(
                            "UPDATE spieler SET punkte =" + rsm + " WHERE id = "+ resultid[0].idspieler);
                    }
                }
                connection.query("UPDATE quiz SET aktiv = 0 WHERE aktiv = 1");
            })
        })


    })
}

module.exports.bestimmeFrage = bestimmeFrage;
module.exports.antwortpruefen = antwortpruefen;

