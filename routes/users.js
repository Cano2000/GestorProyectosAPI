const express = require("express")
const { registerUsuario, loginCtrl } = require("../controllers/users")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Registro de un nuevo usuario
router.post("/register", registerUsuario)

//Logueo de un usuario
router.post("/login", loginCtrl)

// router.get("/:Correo_electronico", getUsuario)

// router.get("/", checkAuth, getUsuarios)

module.exports = router;