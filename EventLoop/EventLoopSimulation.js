/*
This file is a representation of what happens when a Node.js process is started i.e. when say, a file called 'myFile.js' is run using node. The code inside isn't meant to be correct executable code but rather just pseudocode.
*/

// myFile.js execution STARTS

const pendingTimers = [];
const pendingOSTasks = [];
const pendingLongOps = [];

// New timers, tasks, operations are recorded from myFile running
myFile.executeCode(); // the code inside the file is ran

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // Check Two: Any pending OS Task (e.g. any server listening to port for a request)?
  // Check Three: Any pending long running operations? (like fs module)
  return pendingTimers.length || pendingOSTasks.length || pendingLongOps;
}

// each 'loop' i.e. execution of the event loop is reffered to as a 'tick'
while (shouldContinue()) {
  /*
    Step 1 - Node looks at pendingTimers[] i.e. setTimeout() & setInterval(), and checks if any functions are ready to be called

    Step 2 - Node looks at pendingOSTasks[] and pendingLongOps[] and calls relevant callbacks

    Step 3 - Pause Execution. Continue when ....
        - a new pendingOSTask[] is done
        - a new pendingLongOps[] is done
        - a timers is about to complete

    Step 4 - Look at pendingTimers[] for any setImmediate() and call them

    Step 5 - Handle any 'close' events. It calls any EventEmitters setup with 'close' event and call them. This is generally used to run any 'clean up code' like closing an opened file e.t.c.
  */
}

// myFile.js execution ENDS
