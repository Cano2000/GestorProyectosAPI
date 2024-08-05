const express = require("express")
const { registerProject, getProjects } = require("../controllers/projects")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Registro de los proyectos
router.post("/register", checkAuth, registerProject)

//Recoger todos los proyectos
router.get("/", checkAuth, getProjects)

module.exports = router;