const User = require("../models/users");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function handleUserSignup(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });
  return res.redirect("/");
}
async function handleUserlogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log("user", user);
  if (!user)
    return res.render("login", {
      error: "invalid email or password",
    });

  // const sessionid = uuidv4();
  const token = setUser(user);
  res.cookie("token", token);
  return res.redirect("/");
}

module.exports = {
  handleUserSignup,
  handleUserlogin,
};
