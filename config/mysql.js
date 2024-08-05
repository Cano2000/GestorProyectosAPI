const { Sequelize } = require("sequelize");

const database = "projectmanager";
const username = "root";
const password = "";
const host = "127.0.0.1";
const sequelize = new Sequelize(database, username, password, {
  host: host,
  dialect: "mysql",
});

const dbConnectMySQL = async () => {
  try {
    await sequelize.authenticate();
    console.log("MySQL connected");
  } catch (e) {
    console.log("MySQL ERROR connected", e);
  }
};

module.exports = { dbConnectMySQL, sequelize };

// const { Sequelize } = require("sequelize");

// const database = "bdohours";
// const username = "bdohours";
// const password = "q0!8wG96u&k3s1s4M7";
// const host = "localhost";
// const sequelize = new Sequelize(database, username, password, {
//   host: host,
//   dialect: "mysql",
// });

// const dbConnectMySQL = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log("MySQL connected");
//   } catch (e) {
//     console.log("MySQL ERROR connected", e);
//   }
// };

// module.exports = { dbConnectMySQL, sequelize };