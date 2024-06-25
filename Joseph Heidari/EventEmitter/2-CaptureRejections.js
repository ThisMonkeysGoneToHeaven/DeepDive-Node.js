/*
change the 'captureRejections' to false and see how it affects the code execution.

Node won't be able to capture the error without this declaration.
*/

const events = require("node:events");
const ee1 = new events.EventEmitter({ captureRejections: true });
ee1.on("something", async (value) => {
  throw new Error("kaboom");
});

ee1.on("error", () => {
  console.log("fuck ho gya vro");
});

ee1.emit("something");
