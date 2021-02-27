const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt2017514", "root", "root", {
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
    
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;



// modeli
db.predmet = require('./models/predmet.js')(sequelize,Sequelize.DataTypes);
db.grupa = require('./models/grupa.js')(sequelize,Sequelize.DataTypes);
db.aktivnost = require('./models/aktivnost.js')(sequelize,Sequelize.DataTypes);
db.dan = require('./models/dan.js')(sequelize,Sequelize.DataTypes);
db.tip = require('./models/tip.js')(sequelize,Sequelize.DataTypes);
db.student = require('./models/student.js')(sequelize,Sequelize.DataTypes);

//relacije


// predmet 1-N grupa
db.predmet.hasMany(db.grupa, {
    foreignKey: 'predmet_id',
     type: Sequelize.INTEGER,
     allowNull: false
});
db.grupa.belongsTo(db.predmet,{foreignKey: 'predmet_id'});


// aktivnost N-0 grupa
db.grupa.hasMany(db.aktivnost, {
    foreignKey: 'grupa_id',
     type: Sequelize.INTEGER,
     allowNull: true
});
db.aktivnost.belongsTo(db.grupa,{foreignKey: 'grupa_id'});
 

// predmet 1-N aktivnost
db.predmet.hasMany(db.aktivnost, {
    foreignKey: 'predmet_id',
     type: Sequelize.INTEGER,
     allowNull: false
});
db.aktivnost.belongsTo(db.predmet,{foreignKey: 'predmet_id'});


// dan 1-N aktivnost
db.dan.hasMany(db.aktivnost, {
    foreignKey: 'dan_id',
     type: Sequelize.INTEGER,
     allowNull: false
});
db.aktivnost.belongsTo(db.dan,{foreignKey: 'dan_id'});


// tip 1-N aktivnost
db.tip.hasMany(db.aktivnost, {
    foreignKey: 'tip_id',
     type: Sequelize.INTEGER,
     allowNull: false
});
db.aktivnost.belongsTo(db.tip,{foreignKey: 'tip_id'});


// student N-M grupa 
db.student.belongsToMany(db.grupa, { through: 'Student_grupe' });
db.grupa.belongsToMany(db.student, { through: 'Student_grupe' });

module.exports = db;

