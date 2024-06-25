# When we say UNIX is looking for a path, what it really means is that UNIX will go through the list of all the paths that are in the PATH variable and look for an UNIX executable file.

echo $PATH | tr ':' '\n'

