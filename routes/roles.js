const express = require("express")
const { registerRol } = require("../controllers/roles")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Registro de un nuevo Rol
router.post("/register", checkAuth, registerRol)

module.exports = router;