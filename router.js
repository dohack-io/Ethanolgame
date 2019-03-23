const express = require("express");
const router = express.Router();
const rooms = require("./../models/rooms");


//Dashboard
router.get('/',function(req,res,next){
    res.render("dashboard");
});

//Raumliste
router.get("/raumliste",function(req,res,next){
   res.render("raumliste",{
    raeume: rooms.raumArray
    });
});

//Raumdetails
router.get("/raumdetails",function(req,res,next){
    res.render("raumdetails");
});

//Buchungdetails
router.get("/buchungdetails",function(req,res,next){
    res.render("buchungdetails");
});

//neueBuchung
router.get("/neuebuchung",function(req,res,next){
    res.render("neuebuchung");
});

//404
router.use(function(req,res,next){
    res.status = 404;
    res.render("404");
});


// Router zugreifbar machen
module.exports = router;
