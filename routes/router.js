const express = require("express");
const router = express.Router();

//Dashboard
router.get('/',function(req,res,next){
    res.render("dashboard");
});

router.get('/fragen',function(req,res,next){
    res.render("quiz");
});

//404
router.use(function(req,res,next){
    res.status = 404;
    res.render("404");
});


// Router zugreifbar machen
module.exports = router;
