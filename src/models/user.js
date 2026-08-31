const Sequelize = require("sequelize");
const sequelize = require("../util/db")


const User = sequelize.define ("User",
    {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
          },
          first_name: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          last_name :{
            type: Sequelize.STRING,
            allowNull: false,
          },
          email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          phone: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
          },
          password: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          profile_image : {
            type: Sequelize.STRING,
            allowNull: true,
          },
          address: {
            type: Sequelize.TEXT,
            allowNull: false,
          },
          profile_image: {
            type: Sequelize.STRING,
            allowNull: true,
          },
          role: {
            type: Sequelize.ENUM("user", "admin"),
            allowNull: false,
            defaultValue: "user",
          },
          verifed: {
            type : Sequelize.BOOLEAN,
            defaultValue : false
          }
    }
,{
    timestamps : true,
})

module.exports = User;