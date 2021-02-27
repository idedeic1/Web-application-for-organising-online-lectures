var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Predmet', {
        
        naziv:{
            type: Sequelize.STRING
        }
    }, {
		tableName: 'Predmet'
	});
};