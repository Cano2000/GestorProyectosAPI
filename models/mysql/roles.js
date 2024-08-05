const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql");

const Roles = sequelize.define('Roles', {
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
    tableName: 'roles',
    timestamps: true, // Habilita las columnas createdAt y updatedAt
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = Roles;
