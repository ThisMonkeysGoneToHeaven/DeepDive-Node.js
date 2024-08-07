const fs = require("fs/promises");

(async () => {
  console.time("writeMany");

  const fileHandle = await fs.open("text.txt", "w");
  const stream = fileHandle.createWriteStream();

  // returns the total size of the stream's buffer
  console.log(
    "Total size that can be written on the stream: ",
    stream.writableHighWaterMark
  );

  // returns the total size that's written on the stream
  console.log(
    "Total size thats been written on the stream yet: ",
    stream.writableLength
  );

  /*
   */

  const buff = Buffer.alloc(16383, "a");
  console.log("Can more data be added to the stream?", stream.write(buff));
  console.log(
    "Can more data be added to the stream?",
    stream.write(Buffer.alloc(1, "a"))
  );

  stream.on("drain", () => {
    // stream is going to emit this 'drain' event after it's able to take more data
    console.log("We are now safe to write more!");
  });

  console.timeEnd("writeMany");
  fileHandle.close();
})();
