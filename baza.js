const db = require('./db.js');

db.sequelize.authenticate()
 .then(() => {
   console.log('Konekcija je uspješno uspostavljena!');
 })
 .catch(err => {
   console.error('Nije moguće spojiti se sa bazom: ', err);
 });

 /*
 db.sequelize.sync({force: true}).then(function () {
    console.log("Kreirane tabele i relacije!");
 });
*/


 db.sequelize.sync({force:true}).then( async () => {
  // Testni podaci 
  const p1 = await db.predmet.create({naziv: 'ASP'})
  const p2 = await db.predmet.create({naziv: 'AFJ'})
  const p3 = await db.predmet.create({naziv: 'RMA'})

  const t1 = await db.tip.create({naziv: 'Predavanje'})
  const t2 = await db.tip.create({naziv: 'Tutorijal'})

  const d1 = await db.dan.create({naziv: 'Ponedeljak'})
  const d2 = await db.dan.create({naziv: 'Utorak'})
  const d3 = await db.dan.create({naziv: 'Srijeda'})
  const d4 = await db.dan.create({naziv: 'Četvrtak'})
  const d5 = await db.dan.create({naziv: 'Petak'})

  const g1 = await db.grupa.create({naziv: 'ASP-1', predmet_id: p1.id})
  const g2 = await db.grupa.create({naziv: 'AFJ-2', predmet_id: p2.id})
  const g3 = await db.grupa.create({naziv: 'RMA-3', predmet_id: p3.id})

  const student1 = await db.student.create({ime: 'Neko Nekić', index: '11111'})
  student1.addGrupa(g1)
  const student2 = await db.student.create({ime: 'Svako Svakić', index: '22222'})
  student2.setGrupas([g1, g2])
  const student3 = await db.student.create({ime: 'Test Testić', index: '33333'})
  student3.setGrupas([g1, g2, g3])

  const a1 = await db.aktivnost.create({
      naziv: 'Aktivnost-1',
      pocetak: 10.00,
      kraj: 12.00,
      tip_id: t1.id,
      dan_id: d1.id,
      predmet_id: p1.id,
      grupa_id: g1.id})
  const a2 = await db.aktivnost.create({
      naziv: 'Aktivnost-2',
      pocetak: 15.00,
      kraj: 17.00,
      tip_id: t2.id,
      dan_id: d4.id,
      predmet_id: p2.id,
      grupa_id: g2.id})
  
  
  console.log("Kreirane tabele i relacije!");
  console.log('Baza je napunjena testnim podacima!')
}).catch((err) => {
  console.error('Greška prilikom sinkanja:', err)
})

 module.exports = db;