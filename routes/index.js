const express = require("express")
const router = express.Router()

// const drops = require('./drops');
const users = require('./users');
const roles = require('./roles');
const project = require('./project');
const statuses = require('./statuses');
const tasks = require('./tasks');
const comments = require('./comments');

router.use("/users", users)
router.use("/roles", roles)
router.use("/project", project)
router.use("/statuses", statuses)
router.use("/tasks", tasks)
router.use("/comments", comments)

module.exports = router