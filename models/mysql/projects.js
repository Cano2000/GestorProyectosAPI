const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql");

const Projects= sequelize.define('Projects', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true // Permite que el campo sea opcional
    }
}, {
    tableName: 'projects',
    timestamps: true, // Habilita las columnas createdAt y updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Projects;
