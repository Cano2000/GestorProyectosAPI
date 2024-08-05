const models = {
    usersModel: require("./mysql/users"),
    rolesModel: require("./mysql/roles"),
    projectsModel: require("./mysql/projects"),
    statusesModel: require("./mysql/statuses"),
    tasksModel: require("./mysql/tasks"),
    userProjetcsModel: require("./mysql/userProjects"),
    commentsModel: require("./mysql/comments"),
}

module.exports = models