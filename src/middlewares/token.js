const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports.verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};

module.exports.verifyAdminToken = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    if (decoded.role !== "admin") {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
};
