require("dotenv").config();
const app = require("./app");
const sequelize = require("./util/db");


console.log(process.env.PORT);

async function startServer() {
    try {
      await sequelize.sync({ alter: false, force: false });
      console.log("Database connected successfully");
  
      app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
      });
    } catch (error) {
      console.error("Database connection failed", error);
      process.exit(1);
    }
  }
  
  startServer();
