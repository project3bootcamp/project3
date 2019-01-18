const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require("./routes");
const mongoose = require("mongoose");

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

mongoose.connect("mongodb://localhost/imdb", { useNewUrlParser: true });

app.use(routes);

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


app.listen(PORT, function () {
    console.log(`🌎 ==> Server now on port ${PORT}!`);
});