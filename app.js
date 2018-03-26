const express = require("express");
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//Connect DB
mongoose.connect(config.database);

mongoose.connection.on('connected', () => {
  console.log("connected to database" + config.database);
});

const app = express();

const users = require('./routes/users');

//CORS middleware
app.use(cors());

//Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

//Body Parser
app.use(bodyParser.json());

//Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);

//Index Route
app.get("/", (req, res) => {
  res.send("Alah je veliki");
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

//Start server
app.listen(procces.env.PORT, () => {
  console.log("Server started!");
});
