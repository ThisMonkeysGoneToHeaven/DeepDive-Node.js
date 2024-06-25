const EventEmitter = require("node:events");

const myEE = new EventEmitter();
myEE.on("foo", () => {});
myEE.on("bar", () => {});

/*
maximum number of listeners for a particular event, defaults to 10 but can be changed with emitter.setMaxListeners(n) for each emitter

also, event.defaultMaxListeners can also be changed for all emitters
*/
console.log(myEE.getMaxListeners());
myEE.setMaxListeners(25);
console.log(myEE.getMaxListeners());
