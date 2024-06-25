const { spawn, exec } = require("node:child_process");

// the first argument of the spawn method is always a name of a UNIX executable file that is in the PATH, if the UNIX executable file is not in the PATH then mention the full path of the executable file
// NOTE that spawn doesn't really care about alias and functions
const subprocess = spawn("zsh", ["./1-Script.sh"]);

subprocess.stdout.on("data", (data) => {
  console.log(data.toString("utf-8"));
});
