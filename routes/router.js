const express = require("express");
const router = express.Router();
const quiz = require("./../models/quiz");
const spieler = require("./../models/spieler");

//Dashboard
router.get('/',function(req,res,next){
    res.render("dashboard");
});

//quiz
router.get('/fragen',function(req,res,next){
	quiz.bestimmeFrage(function(erg) {
	res.render("Einzel/quiz",{
        quiz: erg
	});
});
});

//404
router.use(function(req,res,next){
    res.status = 404;
    res.render("404");
});


// Router zugreifbar machen
module.exports = router;
