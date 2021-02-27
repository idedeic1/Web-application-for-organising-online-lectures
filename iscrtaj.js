

function iscrtajRaspored(div,dani,satPocetak,satKraj) {
    
    if( satPocetak >= satKraj || satPocetak < 0 || satKraj < 0 || satPocetak > 24 || satKraj >24){
        div.innerHTML = "Greška";

        return;
    }


    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    var zaglavlje = document.createElement("thead");

    
    for(i= 0; i<26; i++){

        var celija = document.createElement("td");

        if(i == 0) 
        celija.className = "satnica";
        else if(i == 25)
        celija.className = "satnica3"
        else 
        celija.className = "satnica2";

        zaglavlje.appendChild(celija);
    }

    var celijeZaglavlje = zaglavlje.childNodes;   
    var temp = 0;
    for(i=0; i<celijeZaglavlje.length; i+=2){

        if(i == 0){
            celijeZaglavlje[i].innerHTML = "0" + (temp + satPocetak); 
            celijeZaglavlje[i].style.textAlign = "right"
            celijeZaglavlje[i].nextSibling.innerHTML =  ":00";
            celijeZaglavlje[i].nextSibling.style.textAlign = "left"
        }

        else if(i == celijeZaglavlje.length-2 ||i == celijeZaglavlje.length - 1){
            celijeZaglavlje[i].innerHTML = ""; 
            
        }

        else {
            var prvoVrijeme = parseInt(celijeZaglavlje[0].innerHTML);
            var dodatak = prvoVrijeme + temp ;

            if((dodatak %2 == 0 && dodatak>=0 && dodatak<13 && dodatak<satKraj) || (dodatak%2 == 1 && dodatak >14  && dodatak<satKraj && dodatak < 24)){
                if(dodatak <10){
                    celijeZaglavlje[i].innerHTML = "0" + (dodatak); 
                    celijeZaglavlje[i].style.textAlign = "right"
                    celijeZaglavlje[i].nextSibling.innerHTML =  ":00";
                    celijeZaglavlje[i].nextSibling.style.textAlign = "left"
                }
                else{
                    celijeZaglavlje[i].innerHTML =  (dodatak); 
                    celijeZaglavlje[i].style.textAlign = "right"
                    celijeZaglavlje[i].nextSibling.innerHTML =  ":00";
                    celijeZaglavlje[i].nextSibling.style.textAlign = "left"
                    }
            }

        }
        temp ++ ;
    }
 
    let brojKolona = (satKraj-satPocetak)*2;

    for (var j = 0; j < dani.length; j++) {

        var red = document.createElement("tr");

        for (var i = 0; i < brojKolona; i++) {

          var celija = document.createElement("td");
         
          if(i == 0) {
            celija.innerHTML = dani[j];
            celija.className = "yOsa";
          }
          red.appendChild(celija);
        }
    
        tblBody.appendChild(red);
      }

    tbl.appendChild(tblBody);
    tbl.appendChild(zaglavlje);
    div.appendChild(tbl);

}



function dodajAktivnost(raspored, naziv, tip, vrijemePocetak, vrijemeKraj, dan){

    if(raspored == null || raspored.innerHTML === "Greška"){
        alert("Greška - raspored nije kreiran");
        return;
    } 

    if(vrijemePocetak < 0 || vrijemePocetak > 24 || vrijemePocetak >= vrijemeKraj ||  (vrijemePocetak%1 != 0.5 && vrijemePocetak%1 != 0)){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
    }
    

    if(vrijemeKraj < 0 || vrijemeKraj > 24  || (vrijemeKraj%1 != 0.5 && vrijemeKraj%1 != 0)){
        alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");
    }
    
    if(raspored.querySelector('table') === null || raspored.querySelector('thead') === null){
        alert("Greška - raspored nije kreiran");
        return;
    }

    
   var table = raspored.querySelector('table');
   var zaglavlje = table.querySelector('thead');
   var celijeZaglavlje = zaglavlje.childNodes; 
   var prvoVrijeme = parseInt(celijeZaglavlje[0].innerHTML);
   
   if(vrijemePocetak < prvoVrijeme || prvoVrijeme > vrijemeKraj)
   alert("Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin");


   let trajanje = vrijemeKraj - vrijemePocetak;
   let brojac = prvoVrijeme;
   let trajanjePocetni = trajanje;
   let sredina = ((trajanje /2)) + 0.5  ;
   if(trajanje == 1.5 || trajanje == 1)
   sredina = 1;

   let polaSata = false;
   if(trajanje == 0.5)
   polaSata = true;

   let sat = false;
   if(trajanje == 1)
   sat = true;

   if (provjeriAktivnost(table, dan, vrijemePocetak, vrijemeKraj, brojac) == true) {
       alert("Greška - već postoji termin u rasporedu u zadanom vremenu");
       return;
   }

   for(i =0; i< table.rows.length; i++){

        if(table.rows[i].cells[0].innerHTML == dan){
            
            for(j=1; j< table.rows[i].cells.length; j++){

                if(brojac === vrijemePocetak){
                    while(trajanje != 0){
                        
                        if(polaSata){
                        
                            let ime = document.createElement('p');
                            ime.className = "tekstRasporedVeci";
                            let vrsta = document.createElement('p');
                            vrsta.className = "tekstRasporedManji";
                            ime.innerHTML = naziv;
                            vrsta.innerHTML = tip;
                            table.rows[i].cells[j].appendChild (ime);
                            table.rows[i].cells[j].appendChild (vrsta);
                            table.rows[i].cells[j].className = "polaSata";
                            break;
                        }

                        if(sat){
                        
                            let ime = document.createElement('p');
                            ime.className = "tekstRasporedVeci";
                            let vrsta = document.createElement('p');
                            vrsta.className = "tekstRasporedManji";
                            ime.innerHTML = naziv;
                            vrsta.innerHTML = tip;
                            table.rows[i].cells[j].appendChild (ime);
                            table.rows[i].cells[j].appendChild (vrsta);
                            table.rows[i].cells[j].className = "predavanjaPocetak";
                            table.rows[i].cells[j].nextSibling.className = "predavanjaKraj";
                            break;
                        }


                        if(trajanje == trajanjePocetni)
                        table.rows[i].cells[j].className = "predavanjaPocetak";

                        else if(trajanje == 0.5)
                        table.rows[i].cells[j].className = "predavanjaKraj";

                        else if(trajanje == sredina){
                        let ime = document.createElement('p');
                        ime.className = "tekstRasporedVeci";
                        let vrsta = document.createElement('p');
                        vrsta.className = "tekstRasporedManji";
                        ime.innerHTML = naziv;
                        vrsta.innerHTML = tip;
                        table.rows[i].cells[j].appendChild (ime);
                        table.rows[i].cells[j].appendChild (vrsta);
                        table.rows[i].cells[j].className = "predavanja";
                        }

                        else{
                        table.rows[i].cells[j].className = "predavanja";
                        }
                        
                        trajanje -= 0.5;
                        j++;

                        
                    }    
                }
                

                brojac+=0.5;
            
            }
        }
   }

   

   

}

function provjeriAktivnost (table, dan, vrijemePocetak, vrijemeKraj, brojac){
    let temp = false;
    let trajanje = vrijemeKraj-vrijemePocetak;

    for(i =0; i< table.rows.length; i++){

        if(table.rows[i].cells[0].innerHTML == dan)

            for(j=1; j< table.rows[i].cells.length; j++){

                if(brojac == vrijemePocetak){
                    while(trajanje != 0){

                        
                        if(table.rows[i].cells[j].className == "polaSata" || table.rows[i].cells[j].className == "predavanjaPocetak" || table.rows[i].cells[j].className == "predavanja"  || table.rows[i].cells[j].className == "predavanjaKraj" ){
                            temp = true;
                            
                        }

                        trajanje -= 0.5;
                        j++;
                    }   
                }
                brojac+=0.5;
            }
        }

        return temp;

}