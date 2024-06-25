const { Buffer } = require("buffer");

/*
Standard Buffer Allocation

This standard allocation not only provides a piece of memory of specified size but also fills each element of the Buffer with a 0 or another specified element which can be passed as the second parameter to the below alloc.
*/
const standardBuffer = Buffer.alloc(1000);

/* 
Unsafe Buffer Allocation

This unsafe allocation only provides a piece of memory of specified size from the memory and DOES NOT fill it up with zeroes or anythig else.

It's called UNSAFE because it returns the memory block which can have older data in it and this data might be sensitive and exploited eventually.

However, this is a bit faster than the standard allocation.
*/
const unsafeBuffer = Buffer.allocUnsafe(1000);

/*
Buffer.from() and Buffer.concat() also use UNSAFE ALLOCATION behind the scenes but they replace that 'potentially sensitive older data' with the provided 'new data' ASAP, so it's mostly safe yk.   
*/

/*
When the node process begins, it allocates a small pool of memory in RAM which is equal to 8192 B, as it can be seen below.

This memory can be used by node to allocate a buffer to the user if and only if the user uses Buffer.unsafeAlloc(size) and the 'size' requested is less than Math.floor(Buffer.poolSize / 2) i.e. 
size < Buffer.poolSize >>> 1
*/
console.log(Buffer.poolSize);

/*
Buffer.allocUnsafeSlow(size) - this method does the same thing as Buffer.allocUnsafe(size) except that it will not use the 'pool' allocated by node in the beginning for this allocation.
*/
