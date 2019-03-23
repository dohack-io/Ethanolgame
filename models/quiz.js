const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "dohack19js",
    password: "vGMqKkBtI6XRbZhs",
    database: "dohack19js"
});

function bestimmeFrage(callback) {
    var fragen = [];
    var spielerarr = [];
    var erg = [];
    
    connection.query("SELECT Name FROM spieler", function (err, result) {
        if (err) throw err;
        console.log(result);
        spielerarr = result;
        var x = (Math.floor(Math.random() * (spielerarr.length)));
        //console.log("X Wert Spieler: " + x);
        //console.log(spieler[x]);
        console.log(spielerarr[x].Name);
		erg[0] = spielerarr[x].Name;
    });
    
    connection.query(
    	"SELECT frage, aw1, aw2, aw3, aw4 FROM quiz LEFT JOIN spiel_frage ON quiz.id = spiel_frage.idfrage " +
    	"WHERE spiel_frage.idfrage IS NULL ",
    	function (err, result) {
    	    if (err) throw err;
        	var y = (Math.floor(Math.random() * (result.length)));
    		erg[1] = result[y].frage;
    		erg[2] = result[y].aw1;
    		erg[3] = result[y].aw2;
    		erg[4] = result[y].aw3;
    		erg[5] = result[y].aw4;
    	
    		console.log(erg);
    		callback(erg);
    	}
    );
}

module.exports.bestimmeFrage = bestimmeFrage;

