const { Buffer } = require("buffer");

const memoryContainer = Buffer.alloc(4);

/*
A Buffer is a contiguous block of memory allocated to us by the OS, we can ask for a reasonable (within RAM) amount of memory while allocating the buffer.

We can do whatever we like with this piece of memory i.e. we can write ones and zeroes to it just how we feel like. All the elements are intialised to 0.

Size of a Buffer is fixed and cannot be changed once after allocation.

Each element of a buffer is 1B long. Logging it down below shows a hexadecimal representation for all of the 4 bytes we have allocated for this buffer.

Also, elements of a buffer can be accessed just like elements of an array.
*/
console.log(memoryContainer, memoryContainer[0]);

// Buffer elements can also be changed just like array elements.

memoryContainer[0] = 0xf4;
console.log(memoryContainer, memoryContainer[0]);

/*
Writing numbers like this isn't really recommended because then we can run into a myriad of computer issues, especially if the numbers are negative integers or floating point numbers.

There are especially designed methods for such use cases, like the writeInt8() and readInt8() methods.
*/

memoryContainer.writeInt8(-34, 1);
console.log(memoryContainer, memoryContainer.readInt8(1));

/*
The way how signed integers work, the following code must give an error since the following number has to use the MSB of the 8 bit integer for it's magnitude while the MSB is reserved for the sign.
*/

try {
  memoryContainer.writeInt8(128, 2);
} catch (error) {
  console.log("Here is the error message: ", error.code);
}

// we can use the toString method on the buffer to print/store the data

console.log(memoryContainer.toString("hex"));
