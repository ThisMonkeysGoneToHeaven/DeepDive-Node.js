/*
Challenge: Write something (anything) to the test.txt file a million times, sure Joseph.
*/

const fs = require("fs");
const fs_promises = require("fs/promises");

/*
Right, now I see what you're onto Joseph. I can't do the following because it just re-writes the i-th number in the file during each iteration, that's stupid.
*/

function attempt_1() {
  for (let i = 1; i <= 1e2; i++) {
    fs.writeFileSync("./test.txt", i.toString());
  }
}

// attempt_1();

/*
Well then we'll have to .... 

-> read the file each time before we write to it (or we can maintain an in-memory string)
-> add the i-th number to the previously read data (string)
-> re-write that whole data (string) again onto the file

and do this a million times, well that's not pretty.

            -------------------

Well, I ran this dumb implementation, not for a million times but I did it for one-tenth of it i.e. 1e5 times and yes it was painful af. Below are the benchmarking results:

dumb-implementation: 1:15.991 (m:ss.mmm)

*/

function attempt_2() {
  console.time("dumb-implementation");

  for (let i = 1; i <= 1e5; i++) {
    const currentFileData = fs.readFileSync("./test.txt").toString("utf-8");
    const newData = currentFileData + i + " ";
    fs.writeFileSync("./test.txt", newData);
  }

  console.timeEnd("dumb-implementation");
}

// attempt_2();

/*
Well the following code is Joseph's solution to this challenge and it works surprisingly well, compared to mine. I'll be frank I don't understand why that's the case. This code successfully wrote numbers from 1 to 1e6 within 20.639s.
 */

async function attempt_3() {
  console.time("write-many");
  const fileHandle = await fs_promises.open("./test.txt", "w");
  for (let i = 1; i <= 1e6; i++) {
    await fileHandle.write(` ${i} `);
  }
  console.timeEnd("write-many");
}

// attempt_3();
