const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');


 mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log(`Database ${config.DB} is connected`) },
  err => { console.log('Can not connect to the database'+ err)}
); 

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// connections to database
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {console.log(`Database ${config.DB} is connected`) },
  err => { console.log('Can not connect to the database'+ err)}
);
mongoose.connect("mongodb://localhost:27017/imdb", { useNewUrlParser: true }).then(
  () => { console.log('Database imdb is connected') },
  err => { console.log('Can not connect to the database' + err) }
);

app.use(routes);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, function () {
  console.log(`🌎 ==> Server now on port ${PORT}!`);
});