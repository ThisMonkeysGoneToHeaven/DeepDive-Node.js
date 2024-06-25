const EventEmitter = require("events");

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on("foo", function () {
  console.log("event foo triggered! ");
});

myEmitter.once("foo", function () {
  console.log("event foo triggered! ");
});

// emitter.listeners() won't specify any wrappers as returned by once
console.log(myEmitter.listeners("foo"));
// emitter.rawListeners() will specify any such wrappers, like the one returned by once
console.log(myEmitter.rawListeners("foo"));

const listeners = myEmitter.rawListeners("foo");
const logFnWrapper = listeners[1];

// runs the listener inside the logFnWrapper but does not unbind the 'once' event
logFnWrapper.listener();
console.log(myEmitter.rawListeners("foo"));

// runs the listener inside the logFnWrapper and removes the listener
logFnWrapper();
console.log(myEmitter.rawListeners("foo"));
