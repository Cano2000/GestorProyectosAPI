const express = require("express")
const { registerTask, getTasks, getTasksByProject, reOrderTasks, removeTask } = require("../controllers/tasks")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Registro de una taerea
router.post("/register", checkAuth, registerTask)

//Reordenar posiciones de tareas
router.post("/reorder", checkAuth, reOrderTasks)

//Recoger todos los estados
router.get("/", checkAuth, getTasks)

//Recoger tareas por estado
router.get("/:id", checkAuth, getTasksByProject)

//Borrar una tarea por id
router.delete("/:id", checkAuth, removeTask)

module.exports = router;