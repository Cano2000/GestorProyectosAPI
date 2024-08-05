const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql");

const Statuses = sequelize.define('Statuses', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    tableName: 'statuses',
    timestamps: false // No necesitamos las marcas de tiempo para este modelo
});

module.exports = Statuses;
