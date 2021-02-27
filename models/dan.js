var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Dan', {
        
        naziv:{
            type: Sequelize.STRING
        }
    }, {
		tableName: 'Dan'
	});
};