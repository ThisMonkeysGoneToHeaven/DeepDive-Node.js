const {stdin, stderr, stdout} = require('process');

// stdin, stderr & stdout are just data-STREAMS, like regular streams
stdin.on("data", (data) => {
    console.log("Got this data from standard in: ", data.toString("utf-8"));
});

/* By default, stdout and stderr are configured to terminal. But that can be changed.*/

// writing to stdout
stdout.write("This is some text that I want! ");
// writing to stderr
stderr.write("This is some text that I may not want.");

/* 
Also, we can configure stdout on the fly by running something like "node playground.js 1>output.txt", here 1 stands for stdout. 
*/