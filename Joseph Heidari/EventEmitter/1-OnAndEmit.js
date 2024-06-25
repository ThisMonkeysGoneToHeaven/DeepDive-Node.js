const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("foo", function () {
  console.log("event foo triggered! ");
});

// no checks are made to make sure that the same (event, listener) combination has been added before or not, it will be added as many times as .on() method is called and will be called multiple times for each emit call for that event

myEmitter.on("foo", function () {
  console.log("event foo triggered! ");
});

myEmitter.on("bar", function () {
  console.log("event bar triggered! ");
});

myEmitter.emit("foo");
