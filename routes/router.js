const express = require("express");
const router = express.Router();
const quiz = require("./../models/quiz");
const spieler = require("./../models/spieler");

//Startseite
router.get('/',function(req,res,next){
    res.render("Startbildschirm");
});

//Zwischenseite
router.get("/zwischenseite",function(req,res,next){
    spieler.gibAlleSpielerMitStatus(function(erg){
        res.render("Zwischenseite",{
            spielerarray: erg
        })
    })
    
});

//Benutzer hinzufügen
router.post("/spielereingabe",function(req,res,next){
    spieler.spielerAufnehmen(req.body.spielername);
    res.redirect('back');
});


router.get("/spielereingabe",function(req,res,next){
    spieler.gibAlleSpieler(function(erg){
        console.log(erg);
        res.render("Spielereingabe",{
            spielerarray: erg
        });
    });
});


//Benutzer löschen
router.post("/spielerloeschen",function(req,res,next){
    spieler.alleSpielerLoeschen();
    res.redirect("/spielereingabe");
});

//quiz
router.get('/fragen',function(req,res,next){
	quiz.bestimmeFrage(function(erg) {
	res.render("Einzel/quiz",{
        quiz: erg
	});
});
});

//Spiel beginnen
router.get("/zwischenseite",function(req,res,next){
    res.render("Zwischenseite");
});

//404
router.use(function(req,res,next){
    res.status = 404;
    res.render("404");
});


// Router zugreifbar machen
module.exports = router;
