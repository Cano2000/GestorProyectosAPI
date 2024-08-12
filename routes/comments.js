const express = require("express")
const { createComment } = require("../controllers/comments")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Creación de comentarios para una tarea
router.post("/create", checkAuth, createComment)

module.exports = router;