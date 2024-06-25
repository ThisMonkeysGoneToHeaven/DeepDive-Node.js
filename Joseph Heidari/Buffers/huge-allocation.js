const { Buffer } = require("buffer");

/*
!! MASSIVE BUFFER ALLOCATION !!

This has the potential for crashing down the whole OPERATING SYSTEM, not just the node process, ofcourse that depends on your system resources.
*/

const hugeBuffer = Buffer.alloc(1e9); // 1,000,000,000 B or 1 GB

setInterval(() => {
  for (let i = 0; i < hugeBuffer.length; i++) {
    hugeBuffer[i] = 0x34; // any random hex
  }
}, 5000);
