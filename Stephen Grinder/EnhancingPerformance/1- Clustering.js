process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require("cluster");

// Is the file being executed in the master mode?
if (cluster.isMaster) {
  // This will cause the index.js file to be executed AGAIN but in child mode
  cluster.fork();
  cluster.fork();
} else {
  // This will be executed in child mode, this will act like a server and do nothing more.
  const express = require("express");
  const crypto = require("crypto");
  const app = express();

  /*
  This demonstration essentially shows us how a somewhat time-taking computation can block the event loop from doing anything else. While the doWork() is being executed, the EventLoop is pretty much useless, it can't listen for other requests during that time. This is BAD.
  */

  app.get("/", (req, res) => {
    // code to be executed inside the EventLoop

    // crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
    //   res.send("Hi There!");
    // });

    setTimeout(() => {
      res.send("Hi There!");
    }, 5000);

    console.log(`Request handled by ${process.pid}`);
  });

  app.get("/fast", (req, res) => {
    res.send("Woooh, this was fast!");
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
  });
}
