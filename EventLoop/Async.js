const https = require("https");

const start = Date.now();

const doRequest = () => {
  https
    .request(`https://ww.google.com`, (res) => {
      res.on(`data`, () => {});
      res.on(`end`, () => {
        console.log(Date.now() - start);
      });
    })
    .end();
};

/*
All the network requests below take more or less the same amount of time. These network requests are handled by the operating system and are executed outside of the node's event loop but are still present in the pendingOSTasks[] which is maintained by the event loop.
*/
for (let i = 1; i <= 7; i++) doRequest();
