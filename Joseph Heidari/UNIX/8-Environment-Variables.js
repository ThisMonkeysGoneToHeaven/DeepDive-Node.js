const {spawn} = require('child_process');

process.env.my_node_env_var = 'McCartney';

const subprocess = spawn("./C-App/playground", 
["first", "second", "some string", 34, "-t"]);

console.log('Printing the environment variable defined in this node process: ', process.env.my_node_env_var);

subprocess.stdout.on("data", (data) => {
    console.log(data.toString('utf-8'));
});