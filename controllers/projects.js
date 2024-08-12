const { projectsModel, userProjetcsModel, usersModel } = require('../models/index')
const {sequelize} = require('../config/mysql'); 

const registerProject = async (req, res) => {
  try {

    const body = req.body
    
    const name = body.name;
    const userId = req.usuario.id;
    const roleId = req.usuario.roleId;
    const description = body.description;

    const data = await sequelize.transaction(async (t) => {
      // Crear el proyecto
      const project = await projectsModel.create({
          name,
          description
      }, { transaction: t });

      // Añadir entrada en UserProjects
      await userProjetcsModel.create({
          projectId: project.id,
          userId: userId,
          roleId
      }, { transaction: t });

      return project;
  });
    res.send({ success: true, data });
  } catch (e) {
    console.log(e.message)
    res.status(400).json({ success: false, e});
  }
};

const getProjects = async (req, res) => {
  try {
    const roleID = req.usuario.roleId;
    const userId = req.usuario.id;
    
    if(roleID === 1) {
      const projects = await projectsModel.findAll({
          attributes: ["id", "name", "description", "created_at"]
      });
      res.status(200).json({ success: true, data: projects });
    } else {
      const projects = await projectsModel.findAll({
        attributes: ["id", "name", "description", "created_at"],
        include: [{
          model: usersModel, // Deberías incluir el modelo de Usuarios directamente si estás trabajando con una asociación muchos a muchos.
          through: {
            model: userProjetcsModel, // Este es el modelo intermedio
            attributes: [] // No incluir atributos de la tabla intermedia
          },
          where: { id: userId }, // Esto va en el modelo de Usuarios
          required: true
        }]
      });
      res.json({ success: true, data: projects });
    }
  } catch (error) {
    console.log(error.message)
    res.status(400).json({ success: false, error });
  }
};

module.exports = {
    registerProject,
    getProjects
}