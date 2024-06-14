const fs = require("fs/promises");

/*
Execution Time: ~5.5ms (if you bring the console.timeEnd('fix-memory-issue') out of the 'finish' event.)
*/

(async () => {
  console.time("fix-memory-issue");

  const fileHandle = await fs.open("text.txt", "w");
  const stream = fileHandle.createWriteStream();

  let i = 1;
  const writeMany = () => {
    for (; i <= 1e6; i++) {
      const buff = Buffer.from(` ${i} `);

      if (i === 1e6) {
        return stream.end(buff);
      }

      if (!stream.write(buff)) {
        break;
      }
    }
  };

  writeMany();

  // 'drain' even is emmitted after the stream's internal buffer is refreshed
  stream.on("drain", () => {
    writeMany();
  });

  // 'finish' event is emmitted after the very last write is done on the stream via stream.end(buff)
  stream.on("finish", () => {
    console.timeEnd("fix-memory-issue");
    fileHandle.close();
  });
})();
