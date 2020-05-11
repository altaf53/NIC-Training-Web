const userRoutes = require("../routes/user");

/* GET home page. */
function initRoutes(app) {

  app.use("/", userRoutes);
}
module.exports = initRoutes;
