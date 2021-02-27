
var okvir = document.getElementById('prviDiv');

iscrtajRaspored(okvir,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],8,21);

dodajAktivnost(okvir, "WT", "predavanje", 9, 12, "Ponedjeljak");
dodajAktivnost(okvir, "WT", "vježbe", 12, 13.5, "Ponedjeljak");
dodajAktivnost(okvir, "RMA", "predavanje", 14, 17, "Ponedjeljak");
dodajAktivnost(okvir, "WT", "vježbe", 12.5, 14, "Utorak");
dodajAktivnost(okvir, "DM", "tutorijal", 14, 16, "Utorak");
dodajAktivnost(okvir, "DM", "predavanje", 16, 19, "Utorak");
dodajAktivnost(okvir, "OI", "predavanje", 12, 15, "Srijeda");



var okvir2 = document.getElementById('drugiDiv');

iscrtajRaspored(okvir2,['Utorak','Srijeda','Četvrtak'], 8, 21);

dodajAktivnost(okvir2, "IM1", "predavanja", 12, 14, "Utorak");
dodajAktivnost(okvir2, "OE", "vježbe", 14, 16, "Srijeda");
dodajAktivnost(okvir2, "OS", "predavanja", 17, 19, "Četvrtak");




