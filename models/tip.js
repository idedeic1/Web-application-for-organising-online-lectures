var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Tip', {
        
        naziv:{
            type: Sequelize.STRING
        }
    }, {
		tableName: 'Tip'
	});
};