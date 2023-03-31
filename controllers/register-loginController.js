const register = async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  let salt = await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)

  await 
  res.render("register");
};
module.exports = { register };
