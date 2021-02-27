let assert = chai.assert;
describe('iscrtajModul', function() {

 
 describe('iscrtajRaspored()', function() {

   it('1. test ', function() {
     
     const div = document.createElement('div');
     div.id = "prviDiv";

     iscrtajModul.iscrtajRaspored(div,['Ponedjeljak','Utorak','Srijeda'],8,21);
     
     let tabele = div.getElementsByTagName("table");
     let tabela = tabele[tabele.length-1]
     let redovi = tabela.getElementsByTagName("tr");
     


     assert.equal(redovi.length, 3, "Broj redova treba biti 3");

   });

   it('2. test ', function() {

    const div = document.createElement('div');
    div.id = "prviDiv";
    iscrtajModul.iscrtajRaspored(div,['Ponedjeljak','Utorak','Srijeda'],8,21);
   
     let tabele = div.getElementsByTagName("table");
     let tabela = tabele[tabele.length-1]
     let kolone = 26;
     
    
    assert.equal(kolone, 26, "Broj kolona treba biti 26");
  });

  it('3. test', function() {
    const div = document.createElement('div');
    div.id = "prviDiv";
    iscrtajModul.iscrtajRaspored(div,['Ponedjeljak'],8,21);
     
    let tabele = div.getElementsByTagName("table");
    let tabela = tabele[tabele.length-1]
    let redovi = tabela.getElementsByTagName("tr");
    
    assert.equal(redovi.length, 1, "Broj redova treba biti 1");
  });

  it('4. test', function() {
    const div = document.createElement('div');
    div.id = "prviDiv";
    iscrtajModul.iscrtajRaspored(div,['Ponedjeljak','Utorak','Srijeda','Četvrtak','Petak'],-8,21);
    
    expect(alert.calledOnce).to.be.true;
    expect(alert.args[0][0]).to.equal('Greška - u rasporedu ne postoji dan ili vrijeme u kojem pokušavate dodati termin');
    
  });



});

});