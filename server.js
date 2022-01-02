const express = require("express");
const path = require("path");

const app = express();

app.use(express.static("./dist/trello-2"));

app.get("/*", (req, res) => {
  res.sendFile("index.html", {
    root: "dist/trello-2/",
  });
});

app.listen(process.env.PORT || 8080);
