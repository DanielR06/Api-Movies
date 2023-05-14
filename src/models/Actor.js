const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Actor = sequelize.define('actor', {
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    nationality:{
        type: DataTypes.STRING,
        allowNull:false
    },
    image:{
        type: DataTypes.STRING,
        allowNull:false
    },
    birthday:{
        type: DataTypes.STRING,
        allowNull:false
    }
});

module.exports = Actor;