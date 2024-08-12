const express = require("express")
const { registerStatus, getStatuses } = require("../controllers/statuses")
const router = express.Router()
const checkAuth = require("../middleware/auth")

//Registro de los estados
router.post("/register", checkAuth, registerStatus)

//Recoger todos los estados
router.get("/", checkAuth, getStatuses)

module.exports = router;