const jwt = require("jsonwebtoken");
const User = require("../models/user");

// module.exports.verifyToken = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization.split(" ")[1];
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded) {
//       return res.status(401).send({ message: "Unauthorized" });
//     }
//     console.log(decoded);
//     next();
//   } catch (error) {
//     return res.status(401).send({ message: "Unauthorized" });
//   }
// };
