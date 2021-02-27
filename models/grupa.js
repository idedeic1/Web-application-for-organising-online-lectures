var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Grupa', {
        
        naziv:{
            type: Sequelize.STRING
        }
    }, {
		tableName: 'Grupa'
	});
};