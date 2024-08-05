require("dotenv").config()
const express = require("express")
const cors = require("cors")
const app = express()
const {dbConnectMySQL} = require("./config/mysql")

app.use(cors())
app.use(express.json())

const {sequelize} = require("./config/mysql")

const Users = require('./models/mysql/users');
const Roles = require('./models/mysql/roles');
const Projects = require('./models/mysql/projects');
const Statuses = require('./models/mysql/statuses');
const Tasks = require('./models/mysql/tasks');
const UserProjects = require('./models/mysql/userProjects');
const Comments = require('./models/mysql/comments');

// Definir relaciones
// Usuarios y Roles
Users.belongsTo(Roles, {foreignKey: 'roleId'});
Roles.hasMany(Users, {foreignKey: 'roleId'});

// Proyectos y Tareas
Projects.hasMany(Tasks, {foreignKey: 'projectId'});
Tasks.belongsTo(Projects, {foreignKey: 'projectId'});

// Usuarios y Proyectos (relación muchos a muchos a través de UserProjects)
Users.belongsToMany(Projects, {through: UserProjects, foreignKey: 'userId', otherKey: 'projectId'});
Projects.belongsToMany(Users, {through: UserProjects, foreignKey: 'projectId', otherKey: 'userId'});
UserProjects.belongsTo(Users, {foreignKey: 'userId'});
UserProjects.belongsTo(Projects, {foreignKey: 'projectId'});
UserProjects.belongsTo(Roles, {foreignKey: 'roleId'}); // Asociación de roles en UserProjects

// Tareas y Estados
Tasks.belongsTo(Statuses, {foreignKey: 'statusId'});
Statuses.hasMany(Tasks, {foreignKey: 'statusId'});

// Usuarios y Comentarios en Tareas
Users.hasMany(Comments, {foreignKey: 'userId'});
Comments.belongsTo(Users, {foreignKey: 'userId'});
Tasks.hasMany(Comments, {foreignKey: 'taskId'});
Comments.belongsTo(Tasks, {foreignKey: 'taskId'});

// Sincronizar modelos con la base de datos
sequelize.sync()
  .then(() => {
    console.log('Tablas sincronizadas');
  })
  .catch((error) => {
    console.error('Error al sincronizar las tablas:', error);
  });

// Añadir tus rutas aquí
app.use("/api", require('./routes'))

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});



dbConnectMySQL()