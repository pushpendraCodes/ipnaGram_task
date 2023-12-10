const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
let jwtkey = process.env.JWT_KEY;
const bcrypt = require("bcryptjs");


exports.CreateUser = async (req, res) => {
  try {
    // hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;
    let newUser = await new User(req.body);
    const user = await newUser.save();

    res.status(201).send({ status: true,  });
  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "error" });
  }
};

exports.loginUser = async (req, res) => {
  try {


    console.log(req.body,"body")
    // check user email exist
    const user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      const token = jwt.sign(
        {
          user: user.email,
        },
        jwtkey
      );

      let verify_pass = await bcrypt.compare(req.body.password, user.password);
      !verify_pass && res.status(203).send({ status: false, msg: "invalid credential" });

      res.status(200).json({
        user: user.id,
        token: token,
        role: user.role,
        status: true,
      });
    } else {
        return res.status(203).send({ status: false, msg: "invalid credential" });
    }


  } catch (error) {
    console.log(error);
    return res.status(400).send({ status: false, msg: "error" });
  }
};
