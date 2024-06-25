const fs = require("fs");

/*
Callbacks are not pretty.
*/

function usingCallbacks() {
  fs.watch("./command.txt", (eventType, fileName) => {
    if (eventType === "change") {
      console.log("The file was changed ...");

      fs.open("./command.txt", "r", (err, fd) => {
        if (err) throw err;

        fs.fstat(fd, (err, stat) => {
          if (err) {
            fs.close(fd);
            throw err;
          }

          const buffer = Buffer.alloc(stat.size); // using stat here
          const offset = 0; // buffer's starting position to write data to
          const length = buffer.byteLength;
          const position = 0; // where to begin reading from in the file

          fs.read(
            fd,
            buffer,
            offset,
            length,
            position,
            (err, bytesRead, buffer) => {
              if (err) {
                fs.close(fd);
                throw err;
              }
              console.log(buffer); // data successfully printed
            }
          );

          fs.close(fd);
        });
      });
    }
  });
}

usingCallbacks();
