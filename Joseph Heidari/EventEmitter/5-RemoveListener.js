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

/*
myEmitter.removeListeners(eventName, listener) will remove just that listener which is passed as an arugment

Even if multiple combinations of (eventName, listener) are added, only one will be removed for each call

Also, once emit(event) has been called for a particular event, all the listeners registered for that event will be executed even if one of the listeners include removeListeners(event, function). Only after all the listeners for that event have been called, the internal_array will become equal to the new_array_after_remove_listener_calls. 
*/

console.log(myEmitter.listeners("foo"));
// can use removeListeners instead of 'off' as well, both do the same thing
myEmitter.off("foo", fooFunction);
console.log(myEmitter.listeners("foo"));
