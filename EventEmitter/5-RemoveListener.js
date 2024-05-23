const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

const fooFunction = () => {
  console.log("event foo triggered! ");
};

myEmitter.on("foo", () => {});
myEmitter.on("foo", fooFunction);
myEmitter.on("bar", () => {});

// myEmitter.removeAllListeners(eventName) will remove all listeners for eventName

console.log(myEmitter.eventNames());
myEmitter.removeAllListeners("bar");
console.log(myEmitter.eventNames());

// myEmitter.removeListeners(eventName, listener) will remove just that listener which is passed as an arugment, and even if multiple combinations of (eventName, listener) are added, only one will be removed for each call

console.log(myEmitter.listeners("foo"));
// can use removeListeners instead of 'off' as well, both do the same thing
myEmitter.off("foo", fooFunction);
console.log(myEmitter.listeners("foo"));
