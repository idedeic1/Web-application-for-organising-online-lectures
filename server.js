//ZADATAK1 - SPIRALA3
var express = require('express');
app = express();
port = process.env.PORT || 3000;

app.use(express.static(__dirname ));

//ZADATAK2-SPIRALA3
const fs = require('fs');
const bodyParser = require('body-parser');
const { Console, group } = require('console');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/v1/predmeti', function (req, res) {

    fs.readFile('predmeti.txt', (error, contents) => {
        if(error){
            res.writeHead(504, {'Content-Type': 'application/json'});
            throw error;
        }

        let spisak = contents.toString().split("\n");
        let niz = [];

        for(i=0; i<spisak.length; i++){
            let p = spisak[i];
            let novi_predmet = {naziv : p.replace(/\n|\r/g, '')};
            niz.push(novi_predmet);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));

    })

})


app.get('/v1/aktivnosti', function (req, res) {

    fs.readFile('aktivnosti.txt', (error, contents) => {
        if(error){
            res.writeHead(504, {'Content-Type': 'application/json'});
            throw error;
        }
        
        let spisak = contents.toString().split("\n");
        let niz = [];
        for(let i = 0; i < spisak.length; i++){
            let p = spisak[i].split(",");
            let nova_aktivnost = {naziv : p[0], tip : p[1], pocetak : p[2], kraj : p[3], dan : p[4].replace(/\n|\r/g, '')};
            niz.push(nova_aktivnost);
        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));

    })

})

app.get('/v1/predmet/:naziv/aktivnost/', function (req, res) {

    let zadatiNaziv = req.params.naziv
    let niz = [];
    fs.readFile('aktivnosti.txt', (error, contents) => {
        if(error){
            res.writeHead(504, {'Content-Type': 'application/json'});
            throw error;
        }
        
        let spisak = contents.toString().split("\n");

        for(let i = 0; i < spisak.length; i++){
            let p = spisak[i].split(",");
            if(p[0] == zadatiNaziv){
                let nova_aktivnost = {naziv : p[0], tip : p[1], pocetak : p[2], kraj : p[3], dan : p[4].replace(/\n|\r/g, '')};
                niz.push(nova_aktivnost);
            }

        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify(niz));

    })

})

app.post('/v1/predmet', function (req, res) {

    let tijelo = req.body;
    let novaLinija =  "\n" + tijelo['naziv'] ;
    let vecPostoji = false;
    let spisak = fs.readFileSync('predmeti.txt').toString().split("\n");
    let novi_predmet = tijelo['naziv'];

    if(spisak.includes(novi_predmet))
        vecPostoji=true;
        
    if( vecPostoji){
        res.json({message:"Naziv predmeta postoji!"});
    }
    else{
        fs.appendFile('predmeti.txt', novaLinija, function(error){
            if(error){
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw error;
            }
            res.json({message:"Uspješno dodan predmet!", data:novaLinija});
        });
               
    }

});

app.post('/v1/aktivnost', function (req, res) {

    let tijelo = req.body;
    let vecPostoji = false;
    let novaLinija = "\n"+tijelo['naziv']+","+tijelo['tip']+","+tijelo['pocetak']+","+tijelo['kraj']+","+tijelo['dan'];
    let spisak = fs.readFileSync('aktivnosti.txt').toString().split("\n");

    if(spisak.includes(tijelo['naziv']+","+tijelo['tip']+","+tijelo['pocetak']+","+tijelo['kraj']+","+tijelo['dan']))
        vecPostoji=true;

    if(vecPostoji){
        res.json({message:"Aktivnost nije validna!"});
    }
    else{
        fs.appendFile('aktivnosti.txt', novaLinija, function(error){
            
            if(error){
                res.writeHead(504, {'Content-Type': 'application/json'});
                throw error;
            }

        res.json({message:"Uspješno dodana aktivnost!", data:novaLinija});
        });
    }

});

app.delete('/v1/all', function (req, res) {

    fs.writeFile('predmeti.txt', '', function(error){
        if(error){
            res.json({message: 'Greška - sadržaj datoteka nije moguće obrisati!'});
            throw error;
        }
        else{
            fs.writeFile('aktivnosti.txt', '', function(error){
                if(error){
                    res.json({message: 'Greška - sadržaj datoteka nije moguće obrisati!'});
                    throw error;
                } 
                else{
                    res.json({message: "Uspješno obrisan sadržaj datoteka!"});
                }
            })           
        }
    });
})

app.delete('/v1/aktivnost/:naziv', function(req, res){
    let spisak = fs.readFileSync('aktivnosti.txt').toString().split("\n");
    let zadatiNaziv = req.params.naziv;
    let novi_spisak = [];
    let moguce = false;
    for (let i = 0; i < spisak.length; i++) {
        let naziv = spisak[i].split(",")[0];
        
        if (naziv != zadatiNaziv) {
            novi_spisak.push(spisak[i]);
        }
        else moguce = true;
    }


    if(!moguce){
        res.json({message: "Greška - aktivnost nije obrisana!"});
    }
    else{
        let novaLinija = "";
        for(let i=0; i<novi_spisak.length; i++){
            if(i == novi_spisak.length-1) novaLinija +=novi_spisak[i];
            else novaLinija += novi_spisak[i] + "\n";
        }
            

        fs.writeFile('aktivnosti.txt', '', function(error){});
        fs.writeFile('aktivnosti.txt', novaLinija, function(error){});
        res.json({message: "Uspješno obrisana aktivnost!"});
    }

})

app.delete('/v1/predmet/:naziv', function(req, res){

    let spisak = fs.readFileSync('predmeti.txt').toString().split("\n");
    let zadatiNaziv = req.params.naziv;
    let novi_spisak = [];
    let moguce = false;
    for (let i = 0; i < spisak.length; i++) {
        spisak[i] = spisak[i].replace(/\n|\r/g, '');
        if (spisak[i] != zadatiNaziv) {
            novi_spisak.push(spisak[i]);
        }
        else moguce = true;
    }


    if(!moguce){
        res.json({message: "Greška - predmet nije obrisan!"});
    }
    else{
        let novaLinija = "";
        for(let i=0; i<novi_spisak.length; i++){
            novaLinija += "\n" + novi_spisak[i];
        }
           

        fs.writeFile('predmeti.txt', '', function(error){});
        fs.writeFile('predmeti.txt', novaLinija, function(error){});
        res.json({message: "Uspješno obrisan predmet!"});
    }
})

//Spirala4 - Zadatak 1 (CRUD)

const sequelize = require('sequelize');
const db = require('./baza.js');

//post
app.post('/v2/student', function (req, res)  {
    const studentObj = {
        id : req.body.id,
        ime : req.body.ime,
        index: req.body.index
    }

    db.student.findOne({
        where: {
            ime: req.body.ime,
            index: req.body.index
        }

    }).then((pronadeni) => {
        if(!pronadeni){
            db.student.create(studentObj).then((student) => {
                if(!student){
                    res.status(504).json({message: 'Greška pri dodavanju studenta ' + req.body.id })
                }
                else{
                    res.status(200).json(student);
                }
            })
        }
        else{
            res.status(504).json({message: 'Vec postoji student ' + req.body.ime + ' sa brojem indeksa ' + req.body.index })
        }
    })


});

app.post('/v2/tip', function (req, res)  {
    const tipObj = {
        id : req.body.id,
        naziv : req.body.naziv
    }
    db.tip.create(tipObj).then((tip) => {
        if(!tip){
            res.status(504).json({message: 'Greška pri dodavanju tipa ' + req.body.id })
        }
        else{
            res.status(200).json(tip);
        }
    })

});

app.post('/v2/dan', function (req, res)  {
    const danObj = {
        id : req.body.id,
        naziv : req.body.naziv
    }
    db.dan.create(danObj).then((dan) => {
        if(!dan){
            res.status(504).json({message: 'Greška pri dodavanju dana ' + req.body.id })
        }
        else{
            res.status(200).json(dan);
        }
    })

});

app.post('/v2/grupa', function (req, res)  {
    const grupaObj = {
        id : req.body.id,
        naziv : req.body.naziv
    }
    db.grupa.create(grupaObj).then((grupa) => {
        if(!grupa){
            res.status(504).json({message: 'Greška pri dodavanju grupe ' + req.body.id })
        }
        else{
            res.status(200).json(grupa);
        }
    })

});

app.post('/v2/predmet', function (req, res)  {
    const predmetObj = {
        id : req.body.id,
        naziv : req.body.naziv
    }
    db.predmet.create(predmetObj).then((predmet) => {
        if(!predmet){
            res.status(504).json({message: 'Greška pri dodavanju predmeta ' + req.body.id })
        }
        else{
            res.status(200).json(predmet);
        }
    })

});

app.post('/v2/aktivnost', function (req, res)  {
    const aktivnostObj = {
        id: req.body.id,
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj,
        grupa_id: req.body.grupa,
        predmet_id : req.body.predmet,
        dan_id: req.body.dan,
        tip_id: req.body.tip
    }
    db.aktivnost.create(aktivnostObj).then((aktivnost) => {
        if(!aktivnost){
            res.status(504).json({message: 'Greška pri dodavanju aktivnosti ' + req.body.id })
        }
        else{
            res.status(200).json(aktivnost);
        }
    })

});


//get
app.get('/v2/predmet', function (req, res) {

    db.predmet.findAll({attributes: ['id', 'naziv']}).then((predmeti) =>{
        if(!predmeti){
            res.status(504).json({message: 'Greška pri pretraživanju predmeta' })
        }
        else{
            res.status(200).json(predmeti);
        }
    })
});
app.get('/v2/tip', function (req, res) {

    db.tip.findAll({attributes: ['id', 'naziv']}).then((tipovi) =>{
        if(!tipovi){
            res.status(504).json({message: 'Greška pri pretraživanju tipova' })
        }
        else{
            res.status(200).json(tipovi);
        }
    })
});
app.get('/v2/grupa', function (req, res) {

    db.grupa.findAll({attributes: ['id', 'naziv']}).then((grupe) =>{
        if(!grupe){
            res.status(504).json({message: 'Greška pri pretraživanju grupa' })
        }
        else{
            res.status(200).json(grupe);
        }
    })
});
app.get('/v2/dan', function (req, res) {

    db.dan.findAll({attributes: ['id', 'naziv']}).then((dani) =>{
        if(!dani){
            res.status(504).json({message: 'Greška pri pretraživanju dana' })
        }
        else{
            res.status(200).json(dani);
        }
    })
});
app.get('/v2/aktivnost', function (req, res) {

    db.aktivnost.findAll({attributes: ['id', 'naziv', 'pocetak', 'kraj', 'grupa_id', 'predmet_id', 'dan_id', 'tip_id']}).then((aktivnosti) =>{
        if(!aktivnosti){
            res.status(504).json({message: 'Greška pri pretraživanju aktivnosti' })
        }
        else{
            res.status(200).json(aktivnosti);
        }
    })
});
app.get('/v2/student', function (req, res) {

    db.student.findAll({attributes: ['id', 'ime', 'index']}).then((studenti) =>{
        if(!studenti){
            res.status(504).json({message: 'Greška pri pretraživanju studenata' })
        }
        else{
            res.status(200).json(studenti);
        }
    })
});

//update
app.put('/v2/student/:id', (req, res) => {

    const studentObj = {
        ime: req.body.ime,
        index: req.body.index
    }
    db.student.update(studentObj, {
        where: {
            id: req.params.id
        }
    }).then((student) => {
        if(!student){
            res.status(404).json({message: 'Greška prilikom ažuriranja studenta' + req.body.ime})
        }
        else{
            res.status(200).json(student)
        }
    }).catch((err) => {
        res.status(404).json({message:"Greška."})
    })
})

app.put('/v2/tip/:id', (req, res) => {

    const tipObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.tip.update(tipObj, {
        where: {
            id: req.params.id
        }
    }).then((tip) => {
        if(!tip){
            res.status(404).json({message: 'Greška prilikom ažuriranja tipa' + req.body.naziv})
        }
        else{
            res.status(200).json(tip)
        }
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.put('/v2/dan/:id', (req, res) => {

    const danObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.dan.update(danObj, {
        where: {
            id: req.params.id
        }
    }).then((dan) => {
        if(!dan){
            res.status(404).json({message: 'Greška prilikom ažuriranja dana' + req.body.naziv})
        }
        else{
            res.status(200).json(dan)
        }
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.put('/v2/grupa/:id', (req, res) => {

    const grupaObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.grupa.update(grupaObj, {
        where: {
            id: req.params.id
        }
    }).then((grupa) => {
        if(!grupa){
            res.status(404).json({message: 'Greška prilikom ažuriranja grupe' + req.body.naziv})
        }
        else{
            res.status(200).json(grupa)
        }
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.put('/v2/predmet/:id', (req, res) => {

    const predmetObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.predmet.update(predmetObj, {
        where: {
            id: req.params.id
        }
    }).then((predmet) => {
        if(!predmet){
            res.status(404).json({message: 'Greška prilikom ažuriranja predmeta' + req.body.naziv})
        }
        else{
            res.status(200).json(predmet)
        }
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.put('/v2/aktivnost/:id', (req, res) => {

    const aktivnostObj = {
        id: req.body.id,
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj,
        grupa_id: req.body.grupa,
        predmet_id : req.body.predmet,
        dan_id: req.body.dan,
        tip_id: req.body.tip
    }
    db.aktivnost.update(aktivnostObj, {
        where: {
            id: req.params.id
        }
    }).then((aktivnost) => {
        if(!aktivnost){
            res.status(404).json({message: 'Greška prilikom ažuriranja aktivnosti' + req.body.naziv})
        }
        else{
            res.status(200).json(aktivnost)
        }
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

//delete

app.delete('/v2/tip/:id', (req, res) => {
    const tipObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.tip.destroy({
        where: {
            id:req.body.id
        }
    }).then((tip) => {
        res.status(200).json({message: "Uspješno obrisan tip"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/dan/:id', (req, res) => {
    const danObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.dan.destroy({
        where: {
            id:req.body.id
        }
    }).then((dan) => {
        res.status(200).json({message: "Uspješno obrisan dan"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/grupa/:id', (req, res) => {
    const grupaObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.grupa.destroy({
        where: {
            id:req.body.id
        }
    }).then((grupa) => {
        res.status(200).json({message: "Uspješno obrisana grupa"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/predmet/:id', (req, res) => {
    const predmetObj = {
        id: req.body.id,
        naziv: req.body.naziv
    }
    db.predmet.destroy({
        where: {
            id:req.body.id
        }
    }).then((predmet) => {
        res.status(200).json({message: "Uspješno obrisan predmet"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/student/:id', (req, res) => {
    const studentObj = {
        id: req.body.id,
        ime: req.body.naziv,
        index: req.body.index
    }
    db.student.destroy({
        where: {
            id:req.body.id
        }
    }).then((student) => {
        res.status(200).json({message: "Uspješno obrisan student"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/aktivnost/:id', (req, res) => {

    const aktivnostObj = {
        id: req.body.id,
        naziv: req.body.naziv,
        pocetak: req.body.pocetak,
        kraj: req.body.kraj
    }
    db.aktivnost.destroy({
        where: {
            id: req.params.id
        }
    }).then((aktivnost) => {
        res.status(200).json({message: "Uspješno obrisana aktivnost"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

// delete all
app.delete('/v2/tip', (req, res) => {
    
    db.tip.destroy({
        truncate: true
      }).then((tip) => {
        res.status(200).json({message: "Uspješno obrisani svi tipovi"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/dan', (req, res) => {
    
    db.dan.destroy({
        truncate: true
      }).then((dan) => {
        res.status(200).json({message: "Uspješno obrisani svi dani"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/grupa', (req, res) => {
    
    db.grupa.destroy({
        truncate: true
      }).then((tip) => {
        res.status(200).json({message: "Uspješno obrisane sve grupe"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/predmet', (req, res) => {
    
    db.predmet.destroy({
        truncate: true
      }).then((predmet) => {
        res.status(200).json({message: "Uspješno obrisani svi predmeti"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/student', (req, res) => {
    
    db.student.destroy({
        truncate: true
      }).then((student) => {
        res.status(200).json({message: "Uspješno obrisani svi studenti"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

app.delete('/v2/aktivnost', (req, res) => {
    
    db.aktivnost.destroy({
        truncate: true
      }).then((aktivnost) => {
        res.status(200).json({message: "Uspješno obrisane sve aktivnosti"});
    }).catch((err) => {
        res.status(404).json({message: "Greška."})
    })
})

//Spirala 4 - Zadatak 2

//ruta za dodavanje grupe i studenta

app.post('/v2/z2', function (req, res)  {
    
    const textArea = req.body.textArea;
    const grupaID = req.body.grupaID;



    const textAreaRedovi = textArea.split('\n');
    const studenti = textAreaRedovi.map((row ) =>{
        if(row === '') return row;
        arr = row.split(',');
        return {ime: arr[0], index: arr[1]}
    })

    db.student.findAll().then((dbStud ) => {
        if(!dbStud){
                console.log('Eror pri SELECTu');
        }
        else{
            db.grupa.findAll().then((dbGrup) =>{
                if(!dbGrup){
                    console.log('Eror pri SELECTu');
                }
                else{
                    let group = dbGrup.find(gr => gr.naziv === grupaID);
                    const studentiOboje = studenti.filter((std) => {
                        let postoji = false;
                        dbStud.forEach((sentStd) => {
                            if(sentStd.ime === std.ime && sentStd.index === std.index){
                                postoji = true;
                            }
                        })
                        return postoji;
                    })
                    const studentiIndex = studenti.filter((std) => {
                        let postoji = false;
                        dbStud.forEach((sentStd) => {
                            if(sentStd.ime !== std.ime && sentStd.index === std.index){
                                postoji = true;
                            }
                        })
                        return postoji;
                    })
                    const studentiNovi = studenti.filter((std) => {
                        let postoji = false;
                        dbStud.forEach((sentStd) => {
                            if(sentStd.ime !== std.ime && sentStd.index !== std.index){
                                postoji = true;
                            }
                        })
                        return postoji;
                    })
                    
                    var studentiOdgovor = [];

                    studentiOboje.forEach((std) => {
                        studentiOdgovor.push('Student ' + std.ime + ' nije kreiran jer postoji student sa indexom ' + std.index);
                    })
                    studentiIndex.forEach((std) => {
                        studentiOdgovor.push('Student ' + std.ime + ' sa indexom ' + std.index + ' nije kreiran jer već postoji neki student sa tim indeksom');
                    })
                    
                    dodajStudente(studentiNovi, group).then(() => {
                        console.log('Svi studenti upisani')
                        res.status(200).json({message: studentiOdgovor})
                    })

                }
            })
        }
    })
});
//pomocna funkcija za Zadatak 2
let dodajStudente = async (studentiNovi, group) => {
    studentiNovi.forEach((std) => {
        db.student.create({
            ime: std.ime,
            index: std.index
        }).then((student) => {
            student.addGrupa(group)
        })
    })
}


app.listen(port);


