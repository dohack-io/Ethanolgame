let name;
let url;
let add = document.querySelector("#add");
add.addEventListener("click", function(){
   name = prompt("Bitte einen Titel eingeben:");
   url = prompt("Bitte eine URL eingeben: ");

   let neueKachel = document.createElement("a");
   neueKachel.href = url;
   let div = document.createElement("div");
   div.id = name;
   div.append(document.createTextNode(name));
   neueKachel.append(div);

   add.before(neueKachel);
});