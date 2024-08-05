const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql"); // Assumes this is your database configuration file

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles', // Ensure 'roles' is the correct name of the table in your database
            key: 'id'
        }
    }
}, {
    tableName: 'users',
    timestamps: true, // Enables automatic creation of createdAt and updatedAt columns
    createdAt: 'created_at', // Custom name for the created at column
    updatedAt: 'updated_at' // Custom name for the updated at column
});

module.exports = User;
