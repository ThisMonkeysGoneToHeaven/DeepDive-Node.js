// change this syntax based on node version being used [node:child_process]
const {spawn} = require("child_process");

console.log(`The current node process's PID is: ${process.pid}`);

const subprocess = spawn("./C-App/playground", 
["first", "second", "some string", 34, "-t"]);

subprocess.stdout.on("data", (data) => {
    console.log(data.toString('utf-8'));
});