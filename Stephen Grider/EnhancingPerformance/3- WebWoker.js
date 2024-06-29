const express = require("express");
const crypto = require("crypto");

const app = express();
const Worker = require("webworker-threads").Worker;

app.get("/", (req, res) => {
  const worker = new Worker(function () {
    // when worker receives a message from the main thread
    this.onmessage = function () {
      let counter = 0;
      while (counter < 1e9) {
        counter++;
      }
      // when the worker needs to send a message to the main thread i.e. sending the counter
      postMessage(counter);
    };
  });

  // when worker sends a message to the main thread
  worker.onmessage = function (message) {
    console.log(message.data);
    res.send("" + message.data);
  };

  // when the main thread has to send a message to the worker
  worker.postMessage();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
