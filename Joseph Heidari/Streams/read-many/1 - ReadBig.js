const fs = require("fs/promises");

async function createReadStream_1(){   
    /** Reading from the source file using a read stream **/

    const fileHandleRead = await fs.open("source.txt", "r");
    // below is the default HighWatermark value for the read-stream.
    const readStream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });

    /** Writing to the destination file using a write stream **/   

    const fileHandleWrite = await fs.open("destination.txt", "w");
    const writeStream = fileHandleWrite.createWriteStream();
    
    /** The following will work but still not a good practice as will cause something called Back-Pressure issues. 
    
    Backpressure in the context of Node.js streams refers to the scenario where the writable stream cannot process the incoming data as quickly as the readable stream is providing it. This can lead to a buildup of data in the memory buffer, potentially causing memory leaks, degraded performance, or even application crashes if not properly managed. 
    **/

    readStream.on("data", (chunk) => {
        writeStream.write(chunk);
    });
};

// createReadStream_1();

async function createReadStream_2(){
    /** Reading from the source file using a read stream **/

    const fileHandleRead = await fs.open("source.txt", "r");
    // below is the default HighWatermark value for the read-stream.
    const readStream = fileHandleRead.createReadStream({ highWaterMark: 64 * 1024 });

    /** Writing to the destination file using a write stream **/   

    const fileHandleWrite = await fs.open("destination.txt", "w");
    const writeStream = fileHandleWrite.createWriteStream();
    
    /**
     The real benefit of this shows when the file size is massive. The function_1 will probably just crash the machine. While this function will make sure that the task is done, while keeping the memory usage under check. 

     This is the neat method, to check if during the writing, writeStream.write(data) returns false, it means that the internal buffer of the write stream is full and we'll need to pause writing until it's ready again.
    **/

    readStream.on("data", (chunk) => {
        if(!writeStream.write(chunk)){
            readStream.pause();
        }
    });

    writeStream.on('drain', () => {
        readStream.resume();
    });
}

// createReadStream_2();