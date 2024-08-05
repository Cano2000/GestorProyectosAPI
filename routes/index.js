const express = require("express")
const router = express.Router()

// const drops = require('./drops');
const users = require('./users');
const roles = require('./roles');
const project = require('./project');

router.use("/users", users)
router.use("/roles", roles)
router.use("/project", project)

module.exports = router