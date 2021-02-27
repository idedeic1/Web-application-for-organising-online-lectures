var Sequelize = require('sequelize');

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Student', {
		
        ime:{
            type: Sequelize.STRING
        },
        index:{
         type: Sequelize.STRING
        }

}, {
    tableName: 'Student'
});
};