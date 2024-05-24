const { Buffer } = require("buffer");

const encodedData = "0100 1000 0110 1001 0010 0001".replaceAll(" ", "");

const memoryContainer = new Buffer.alloc(3);

// had to manually convert binary to hex to put into the buffer

memoryContainer[0] = 0x48;
memoryContainer[1] = 0x69;
memoryContainer[2] = 0x21;

console.log(memoryContainer, memoryContainer.toString("utf-8"));

/*
UNRESOLVED DOUBT

// trying to allocate the buffer but without all the manual calcs

const memoryContainer2 = new Buffer.from(encodedData, "binary");
console.log(memoryContainer2, memoryContainer2.toString("utf-8"));
*/
