# Stephen Grider's Advanced Node.js Course

## Issues

1. Clustering example is not working as it should. The requests being sent by `ab -c 2 -n 2 localhost:3000/` are being executed sequentially even when two child processes are alloted.

2. PM2-Clustering not working. The service's status is displayed as either `stopped` or `errored`, inspite of `online`. `pm2 logs` display some issues which can be further inspected to resolve this issue.

3. Can't install `webworker-threads` on my machine. I'm getting a bunch of `npm error`'s, like `npm error command failed
npm error command sh -c node-gyp rebuild`.
