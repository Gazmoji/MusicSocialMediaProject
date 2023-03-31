const express = require("express");
const app = express();
const mustacheExpress = require("mustache-express");
const session = require("express-session");
const http = require("http").Server(app);
const io = require("socket.io")(http);
const registerLoginRoutes = require("./routes/register-login");
const chatroomRoutes = require("./routes/chatroom");
const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require('bcryptjs')

mongoose.connect('mongodb+srv://soundproofapp:<password>@soundproof.gsxwsfd.mongodb.net/?retryWrites=true&w=majority')
.then(() => {
    console.log('DB connected')
}).catch((error) => {
    console.log(error)
})


app.use("/", registerLoginRoutes);

app.use("/", chatroomRoutes);

app.use(express.static("js"));

app.use(express.static("css"));

app.engine("mustache", mustacheExpress());

app.set("views", "./views");

app.set("view engine", "mustache");

app.use(express.urlencoded());

app.use(
  session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true,
  })
);





app.get('/register', (req, res) => {
  res.render('register')
})

app.post('/register-user', async (req, res) => {
  const username = req.body.username
  const password = req.body.password

  let salt = await bcrypt.genSalt(10)
  let hashedPassword = await bcrypt.hash(password, salt)

  const user = new User({
    username: username,
    password: hashedPassword
  })

  await user.save()
  res.redirect("/register");
})

http.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
