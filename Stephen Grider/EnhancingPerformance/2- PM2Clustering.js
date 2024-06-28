/*
Run this file via `pm2 start 2-\ PM2Clustering.js -i 0`
*/

const express = require("express");
const crypto = require("crypto");
const app = express();

app.get("/", (req, res) => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    res.send("Hi There!");
  });
});

app.get("/fast", (req, res) => {
  res.send("Woooh, this was fast!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
