const EventEmitter = require("node:events");

const myEE = new EventEmitter();

const helloFunction = () => {
  console.log("hello, its good to be back!");
};

myEE.on("foo", () => {});
myEE.on("bar", () => {});
myEE.on("bar", helloFunction);

console.log(myEE.eventNames());
console.log(myEE.listenerCount("bar"));
console.log(myEE.listenerCount("bar", helloFunction));
console.log(myEE.listeners("bar"));
