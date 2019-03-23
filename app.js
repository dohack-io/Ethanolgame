const express = require("express");
const app = express();
const router= require('./routes/router.js');

app.set("view engine", "ejs");
app.set("views", "views");

//Statischer Inhalt
app.use(express.static("public"));

// Router registrieren -> Der Router verwaltet jetzt Routen, die mit "/" (Standard) beginnen
// "/" könnte durch weitere Einschränkungen ergänzt werden, oder darf komplett entfallen
app.use("/", router);


app.listen(8040,function(){
    console.log("Server auf Port 8040 gestartet!");
});
