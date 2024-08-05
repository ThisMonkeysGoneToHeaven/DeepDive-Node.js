//** Trying to connect my node app to the C-App by accessing stdout & stderr of the C App **//

const {spawn, exect} = require("child_process");

const subprocess = spawn("./play");

subprocess.stdout.on("data", (data) => {
    console.log("Got this stdout from the C App: ", data.toString("utf-8"));
});

subprocess.stderr.on("data", (data) => {
    console.log("Got this stderr from the C App: ", data.toString("utf-8"));
});