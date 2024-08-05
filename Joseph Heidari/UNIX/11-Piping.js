const {stdin, stdout} = require('process');

// we can utilise this via something like -- echo "hey oh" | node 11-Piping.js --
stdin.on('data', (data) => {
    stdout.write(`Got this data from the stdin ---> ${data}`);
});

/* We can further chain commands on top of the above command using the | (pipe) operator. Like we can use the tr (translate) command to make all the letters uppercase. 

echo "hey oh" | node 11-Piping.js | tr 'a-z' 'A-Z'
*/

/*
node playground.js 2>text.txt --> This will over-write the file.
node playground.js 2>>text.txt --> This will append to the file.
*/

