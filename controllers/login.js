const bcyrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../configs/database");
const dotenv = require("dotenv");
dotenv.config();

exports.Login = async (req, res) => {
  const { username, password } = req.body;
  const query = await db.query("SELECT * FROM users WHERE username = ?", [
    username,
  ]);
  const user = query[0];
  if (!user) {
    res.status(404).send({
      message: "User Not Found",
    });
  }
  const isMatch = await bcyrpt.compare(password, user.password);
  if (!isMatch) {
    res.status(400).send({
      message: "Invalid Credential",
    });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: 1000,
  });
  res.status(200).send({
    message: "Login Success",
    token: token,
  });
};
