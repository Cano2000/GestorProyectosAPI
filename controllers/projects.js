const { projectsModel } = require('../models/index')

const registerProject = async (req, res) => {
  try {

    const body = req.body

    const name = body.name;
    const description = body.description;
    
    const checkIfExist = await projectsModel.findOne({
      where: {
        name: name
      }
    })
    if (checkIfExist) {
      res.status(200).json({ success: false, data: "Ya existe un proyecto con ese nombre" });
      return;
    }

    const data = await projectsModel.create({name, description});
    res.send({ success: true, data });
  } catch (e) {
    res.status(400).json({ success: false, e});
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await projectsModel.findAll({
        attributes: ["id", "name", "description", "created_at"]
    });
    res.status(200).json({ success: true, data: projects });
  } catch (error) {
    res.status(400).json({ success: false, error });
  }
};

// const loginCtrl = async (req, res) => {
//   try {
//     const body = req.body
//     const email = body.email;
//     const user = await projectsModel.findOne({
//       where: {
//         email: email
//       }
//     })
//     if (!user) {
//       res.status(400).json({ success: false, error });
//       return;
//     }
    
//     const checkPassword = await compare(body.password, user.password);

//     if (!checkPassword) {
//       res.status(402).json({ success: false, error });
//       return;
//     }
    
//     const tokenJwt = await tokenSign(user);

//     const data = {
//       token: tokenJwt,
//       user_name: user.user_name,
//       id_user: user.id_user
//     };

//     res.send({ data });
//   } catch (e) {
//     res.status(404).json({ success: false, e});
//   }
// };

// const getUsuario = async (req, res) => {

//   try {
//     const email = req.params.email;

//     const usuario = await projectsModel.findOne({
//       where: {
//         email: email
//       }
//     })
//     // .findByPk(req.params.id);
//     if (!usuario) {
//       return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
//     }
//     res.status(200).json({ success: true, data: usuario });
//   } catch (error) {
//     res.status(400).json({ success: false, error });
//   }
// };

// const updateUsuario = async (req, res) => {
//   try {
//     const usuario = await projectsModel.update(req.body, {
//       where: { ID_Usuario: req.params.id }
//     });
//     if (usuario[0] === 0) {
//       return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
//     }
//     res.status(200).json({ success: true, message: 'Usuario actualizado' });
//   } catch (error) {
//     res.status(400).json({ success: false, error });
//   }
// };

// const deleteUsuario = async (req, res) => {
//   try {
//     const usuario = await projectsModel.destroy({
//       where: { ID_Usuario: req.params.id }
//     });
//     if (!usuario) {
//       return res.status(404).json({ success: false, error: 'Usuario no encontrado' });
//     }
//     res.status(200).json({ success: true, message: 'Usuario eliminado' });
//   } catch (error) {
//     res.status(400).json({ success: false, error });
//   }
// };

module.exports = {
    registerProject,
    getProjects
}