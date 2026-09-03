const User = require("../models/user");
const bcrypt = require("bcryptjs");
const JsonWebToken = require("jsonwebtoken");
const { Op } = require("sequelize");
module.exports.signUp = async (req, res) => {
  try {
    //checking that all fields are came in the req
    const { first_name, last_name, email, phone, password, address } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !phone ||
      !password ||
      !address
    ) {
      return res.status(400).send({
        success: false,
        message: "All Fields are requiered",
      });
    }

    //validating mail
    const normalizedEmail = email.trim().toLowerCase();
    if (
      normalizedEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid Email",
      });
    }

    //checking if email  already exist
    const existingEmailUser = await User.findOne({
      where: { email: normalizedEmail },
    });
    if (existingEmailUser) {
      return res.status(409).send({
        success: false,
        message: "Email already exist",
      });
    }

    //checking if phone already exist
    const existingPhoneUser = await User.findOne({
      where: { phone: phone },
    });
    if (existingPhoneUser) {
      return res.status(409).send({
        success: false,
        message: "Phonenumber already exist",
      });
    }

    //hashing password
    let hashed_password;
    try {
      hashed_password = await bcrypt.hash(password, 12);
    } catch (error) {
      console.error("Password hashing error:", error);
      return res.status(500).json({
        success: false,
        message: "خطأ في معالجة كلمة المرور",
      });
    }

    //save the user in db
    let user_role = "user";
    try {
      let user = await User.create({
        first_name: first_name.trim(),
        last_name: last_name.trim(),
        email: normalizedEmail ? normalizedEmail : null,
        phone: phone.trim(),
        password: hashed_password,
        // profile_image : profile_image,
        address: address.trim(),
        role: normalizedEmail === "mario85.girges@gmail.com" ? "admin" : "user",
        verified: false,
      });

      const userResponse = {
        // id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        // profile_image : user?.profile_image,
        // role: user.role,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      };
      return res.status(201).send({
        user: userResponse,
        message: "user dcreated successfully",
      });
    } catch (error) {
      console.error("Database creation error:", error);
      res.status(500).send({
        message: "can't create the user ",
        error: error,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Unexpected error",
    });
  }
};

module.exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["password"] },
    });
    // Convert profile images to base64
    // const usersWithImages = users.map((user) => {
    //     const userObj = user.toJSON();
    //     if (userObj.profile_image && fs.existsSync(userObj.profile_image)) {
    //       try {
    //         const imageData = fs.readFileSync(userObj.profile_image);
    //         userObj.profile_image_base64 = imageData.toString("base64");
    //       } catch (imgErr) {
    //         userObj.profile_image_base64 = null;
    //       }
    //     } else {
    //       userObj.profile_image_base64 = null;
    //     }
    //     return userObj;
    //   });
    // console.log(usersWithImages);

    return res.status(200).json(users);
  } catch (error) {
    return res.status(500).send({
      message: "server error while getting users data",
      error: error,
      success: false,
    });
  }
};

module.exports.signIn = async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res
        .status(400)
        .send({ message: "email or phone and password are requierd!" });
    }

    const normalizedEmailOrPhone = emailOrPhone.includes("@")
      ? emailOrPhone.trim().toLowerCase()
      : emailOrPhone.trim();

    const user = await User.findOne({
      where: {
        [Op.or]: [
          { email: normalizedEmailOrPhone },
          { phone: normalizedEmailOrPhone },
        ],
      },
    });

    if (!user) {
      return res.status(401).send({ message: "invalid email or password" });
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return res.status(401).send({ message: "invalid password !" });
    }

    const token = JsonWebToken.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
    );

    const userResponse = user.toJSON();
    delete userResponse.password;
    delete userResponse.createdAt;
    delete userResponse.updatedAt;
    delete userResponse.role;

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // true in production with HTTPS
      sameSite: "lax",
    });
    return res.status(200).send({
      user: userResponse,
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return res.status(500).send({
      message: "server error while login",
      error: error,
      success: false,
    });
  }
};
