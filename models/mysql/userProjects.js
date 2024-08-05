const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql");

const UserProjects = sequelize.define('UserProjects', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users', // Asegúrate de que 'users' es el nombre correcto de la tabla en la DB
            key: 'id'
        }
    },
    projectId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'projects',
            key: 'id'
        }
    },
    roleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'roles',
            key: 'id'
        }
    }
}, {
    tableName: 'user_projects',
    timestamps: true, // Habilita las columnas createdAt y updatedAt automáticamente
    createdAt: 'created_at', // Personaliza el nombre de la columna para la fecha de creación
    updatedAt: 'updated_at' // Personaliza el nombre de la columna para la fecha de actualización
});

module.exports = UserProjects;
