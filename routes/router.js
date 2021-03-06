const express = require("express");
const router = express.Router();
const quiz = require("./../models/quiz");
const spieler = require("./../models/spieler");
const spiel = require("./../models/spiel");


//Startseite
router.get('/', function (req, res, next) {
    res.render("Startbildschirm");
});


//Zwischenseite
router.get("/zwischenseite", function (req, res, next) {
    spieler.spielerProSpielLoeschen();
    console.log("test");
    spieler.bildsetzen(function (erg) {
        console.log(erg);
        res.render("Zwischenseite", {
            spielerarray: erg,
            spielstatus: spiel.bestimmeSpielstatus()
        })

    });

});


//Benutzer hinzufügen
router.post("/spielereingabe", function (req, res, next) {
    spieler.spielerAufnehmen(req.body.spielername);
    res.redirect('back');
});

router.get("/spielereingabe", function (req, res, next) {
    spieler.gibAlleSpielerNamen(function (erg) {
        res.render("Spielereingabe", {
            spielerarray: erg
        });
    });
});


//Benutzer löschen
router.post("/spielerloeschen", function (req, res, next) {
    spieler.alleSpielerLoeschen();
    res.redirect("/spielereingabe");
});


//Quiz
router.get("/quiz", function (req, res, next) {
    quiz.bestimmeFrage(function (erg) {
        res.render("Einzel/quiz", {
            quiz: erg
        });
    });
});

//Quiz-Antwort prüfen
router.post("/quiz/antwortpruefen", function (req, res) {
    quiz.antwortpruefen(req.body.antwort, function () {
        res.redirect("/zwischenseite");
    });

});


//Spielstatus Einzel
router.get("/einzel", function (req, res, next) {
    spieler.gibRandomSpielerEinzel(function (erg) {
        res.render("Einzel/Einzelauswahl", {
            spieler: erg
        });
    })

});


//Spielstatus Duell
router.get("/duell", function (req, res, next) {
    res.render("Duell/Duellauswahl");
});


//Spielstatus Alle
router.get("/alle", function (req, res, next) {
    res.render("Alle/Auswahl");
});


//404
router.use(function (req, res, next) {
    res.status = 404;
    res.render("404");
});


// Router zugreifbar machen
module.exports = router;
