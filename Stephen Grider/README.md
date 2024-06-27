# Stephen Grider's Advanced Node.js Course

## Issues

1. Clustering example is not working as it should. The requests being sent by '''ab -c 2 -n 2 localhost:3000/''' are being executed sequentially even when two child processes are alloted.
