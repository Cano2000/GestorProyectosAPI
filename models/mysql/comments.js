const { DataTypes } = require('sequelize');
const { sequelize } = require("../../config/mysql");

const Comments = sequelize.define('Comments', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    taskId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tasks', // Asegúrate de que 'tasks' es el nombre correcto de la tabla en la DB
            key: 'id'
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    }
}, {
    tableName: 'comments',
    timestamps: true, // Habilita las columnas createdAt y updatedAt automáticamente
    createdAt: 'created_at', // Personaliza el nombre de la columna para la fecha de creación
    updatedAt: 'updated_at' // Personaliza el nombre de la columna para la fecha de actualización
});

module.exports = Comments;
