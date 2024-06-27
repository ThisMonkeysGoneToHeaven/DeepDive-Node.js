// playing around with different values for threadpool size to get more in-depth understanding of how things work
process.env.UV_THREADPOOL_SIZE = 4;

const fs = require("fs");
const https = require("https");
const crypto = require("crypto");

const start = Date.now();

const doRequest = () => {
  https
    .request(`https://www.google.com`, (res) => {
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

// doRequest() is independent from ThreadPool as OS manages it's execution
doRequest();

fs.readFile("multitask.js", "utf-8", () => {
  console.log(`FS: ${Date.now() - start}`);
});

doHash();
doHash();
doHash();
doHash();

/*
Output on my machine for ThreadPool Size = 1:
  Hash: 353
  Hash: 698
  Hash: 1046
  Hash: 1396
  FS: 1396

Explanation: 
  -> FS readFile() executes in two steps, 1) getting file stats from the HDD 2) getting the file itself from the HDD
  -> While the thread is waiting for the stats, it goes out to execute the Hash functions.
  -> When the first Hash function is complete, for some reason, instead of picking up on the FS task again, it continues to work on the remaining Hash functions and only when all of the Hash functions are done, it goes back to complete the fs task.

                                  - - - - - - - - - - - - - - - - 
  
Output on my machine for ThreadPool Size = 2:
  Hash: 362
  Hash: 367
  Hash: 717
  Hash: 718
  FS: 718

Explanation:
  I think similar explanation follows here as well.

                                  - - - - - - - - - - - - - - - - 

Output on my machine for ThreadPool Size = 3 (most frequent output, sometimes fs is also third):
  Hash: 369
  Hash: 374
  Hash: 374
  FS: 375
  Hash: 712

Explanation:
  FS task is relatively much smaller, as evident by benchmarking results. It's quite clear that while FS task may rotate between third and fourth position, it will definitely not be first, second and fifth.

                                    - - - - - - - - - - - - - - - - 

Output on my machine for ThreadPool Size = 4:
  Hash: 369
  Hash: 374
  Hash: 374
  Hash: 374
  FS: 374

On checking results for many executions, FS occupied all positions from second to fifth at least once but never first, which makes perfect sense.

                                    - - - - - - - - - - - - - - - - 

Output on my machine for ThreadPool Size = 5:
  FS: 1
  Hash: 378
  Hash: 378
  Hash: 379
  Hash: 380

quite straight-forward imo
*/
