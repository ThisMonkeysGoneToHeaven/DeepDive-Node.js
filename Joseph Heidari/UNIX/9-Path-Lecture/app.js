const fs = require("fs");
const path = require("path");

// file.js -> this is a commonjs import and will take the reference for the relative path as app.js, alwayss
require("./file.js");

/* the reference for the relative path down below depends on the cwd environment variable given to the (node app.js) process by the bash process which initiates this node process. The value of the EV cwd, hance depends on where the bash process is. */

// Also logging the cwd value which will go as the reference to the below relative path
console.log(`Node's app.js process's CWD -> ${process.cwd()}`);

const content = fs.readFileSync("./file.txt", "utf-8");
console.log("logging the content from the text file: ", content);

/*
We can't always be sure that the bash process which initiates the node process will be in the same directory as required by our code. Hence we can make use of __dirname to define absolute paths instead of relative paths, which will make sure that our code always works as intended.
*/

console.log(path.join(__dirname, "./app.js"));
