const http = require("http")
const path = require("path")
const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose");
const User = require("./model/user");
const dbAcess = require('./model/dbAcess')
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://root:admin@cluster0.py5xv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = client.db('Projeto-3')


const JWT_SECRET = 'jadiovhafnadklfndklavnçknopr¨&!*#&¨!%$*$%*!$%$&%3up1ufjpjklfnqeklfn'

mongoose.connect(
  "mongodb+srv://root:admin@cluster0.py5xv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "view"));

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));


app.post("/api/publicar",  async (req, res) => {
  const { email, titulo, conteudo, file } = req.body;

  console.log(arq, file)
  try {
    await dbAcess.public({ email, titulo, conteudo, arq })

  } catch (err) {
    console.log(err)
  }
});

app.post("/api/buscar", (req, res) => {
  const { email, key } = req.body;
  let resposta
  //console.log(email, key)
  try {
    var qr
    client.connect(err => {
      if (key != '') {
        qr = { 'email': email, 'titulo': key }
      } else {
        qr = { 'email': email }
      }
      db.collection('public').find(qr).toArray(function (err, result) {
        if (err) throw err;
        res.json({ content: result });
        //console.log(result)
        client.close();
      });
    });
  } catch (err) {
    console.log(err)
  }

});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).lean();

  if (!user) {
    return res.json({ status: "error", error: "Email/Senha inválida. " });
  } else {
    console.log(user)
  }


  if (password == user.password) {
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      JWT_SECRET
    );

    return res.json({ status: "ok", data: token });
  }
  else {
    console.log(password, user.password)
  }

  res.json({ status: "error", error: "Email/Senha inválida." });
});



app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || typeof email !== "string") {
    return res.json({ status: "error", error: "Email inválido" });
  }

  if (!password || typeof password !== "string") {
    return res.json({ status: "error", error: "Senha inválida" });
  }

  if (password.length < 5) {
    return res.json({
      status: "error",
      error:
        "Senha muito pequena. A senha deve conter pelo menos 6 caracteres. ",
    });
  }

  //   const password = await bcrypt.hash(password, 10);

  try {
    const response = await User.create({
      email,
      password,
    });
    console.log("Usuário criado com sucesso: ", response);
  } catch (error) {
    if (error.code === 11000) {
      // duplicate key
      return res.json({
        status: "error",
        error: "Esse email já está sendo utilizado",
      });
    }
    throw error;
  }

  res.json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/home", (req, res) => {
  res.render("homeAcount");

});

app.listen(3000);