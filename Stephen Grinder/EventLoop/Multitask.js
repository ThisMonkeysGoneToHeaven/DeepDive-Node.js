const https = require("https");
const crypto = require("crypto");
const fs = require("fs");

const start = Date.now();

const doRequest = () => {
  https
    .request(`https://ww.google.com`, (res) => {
      res.on(`data`, () => {});
      res.on(`end`, () => {
        console.log(`Request: ${Date.now() - start}`);
      });
    })
    .end();
};

const doHash = () => {
  crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    console.log(`Hash: ${Date.now() - start}`);
  });
};

doRequest();

fs.readFile("multitask.js", "utf-8", () => {
  console.log(`FS: ${Date.now() - start}`);
});

doHash();
doHash();
doHash();
doHash();

/*
My guess about what's going to happen:
    FS
    Hash
    Hash
    Hash
    Request
    Hash

Output on my machine:
    FS: 25
    Request: 148
    Hash: 644
    Hash: 645
    Hash: 648
    Hash: 651
*/
