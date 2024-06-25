// Exploring different ways of accessing the fs in node.js

const fs_promises = require("fs/promises");
const fs = require("fs");

/*
Using the Promises API
*/

(async () => {
  try {
    await fs_promises.copyFile("./text.txt", "./copied-promise.txt");
  } catch (error) {
    console.error(error);
  }
})();

/*
Using the Callback API
*/

fs.copyFile("./text.txt", "./copied-callback.txt", (err) => {
  if (err) console.error(err);
});

/*
Synchronous API
*/

fs.copyFileSync("./text.txt", "./copied-sync.txt");
