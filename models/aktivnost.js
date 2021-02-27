var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Aktivnost', {
		
        naziv:{
            type: Sequelize.STRING
        },
        pocetak:{
         type: Sequelize.FLOAT
        },
        kraj:{
        type: Sequelize.FLOAT
    }
}, {
    tableName: 'Aktivnost'
});
};