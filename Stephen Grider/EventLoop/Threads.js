const crypto = require("crypto");

const start = Date.now();

// we can change the threadpool size, I'm keeping it at the default value for now
process.env.UV_THREADPOOL_SIZE = 4;

/*
Node's Event Loop -> Single Threaded
Other Core Module Functionalities -> Not necessarily single threaded

What the pbkdf2() function from the crypto module does is not the most important thing to know, just be aware that it does some cpu intensive task that takes some time to run.

Libuv, a C++ library which gives Node access to core OS functionalities, for SOME functions, decides to not use the Node's event loop and instead use a ThreadPool i.e. a set of four threads reserved for computationally expensive tasks, such as the pbkdf2().

                                - - - - - - - - - -

If only the FIRST function is run on my machine, here's the output:
1: 568

If the first TWO are run:
2: 562
1: 573

If the first THREE are run:
2: 563
3: 575
1: 575

If the first FOUR are run:
2: 626
3: 634
1: 635
4: 635

If the first FIVE are run:
3: 634
4: 645
1: 645
2: 648
5: 1248

-> ThreadPool has FOUR threads. 
-> Each PBKDF2() is assigned to one of the threads. 
-> Each of the threads are run on one of the cores in the computer.
-> My computer has eight processors, so all of the four threads from the ThreadPool can run concurrently on my computer.
-> But there is no fifth thread in the ThreadPool for the fifth call of pbkdf2() and hence it has to wait for one of the threads to be free again, which explains the benchmarking results.
*/

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`1: ${Date.now() - start}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`2: ${Date.now() - start}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`3: ${Date.now() - start}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`4: ${Date.now() - start}`);
});

crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
  console.log(`5: ${Date.now() - start}`);
});
