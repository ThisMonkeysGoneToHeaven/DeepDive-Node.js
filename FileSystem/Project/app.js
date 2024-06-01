const fs = require("fs/promises");

(async () => {
  // commands
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete the file";
  const RENAME_FILE = "rename the file";
  const ADD_TO_FILE = "add to file";

  // createFile helper function
  const createFile = async (path) => {
    try {
      // we want to check if we already have that file or not
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      // we already have that file
      return console.log(`The file ${path} already exists`);
    } catch (error) {
      // we don't have the file, now we should create it
      const newFileHandle = await fs.open(path, "w");
      console.log("A new file was successfully created!");
      newFileHandle.close();
    }
  };

  // deleteFile helper function
  const deleteFile = async (path) => {
    try {
      await fs.unlink(path);
      console.log(`The file ${path} is successfully deleted!`);
    } catch (error) {
      if (error.code === "ENOENT")
        console.log(`Cannot Delete: The file at ${path} not found!`);
      else {
        console.error(
          `An error occured while trying to delete the file: `,
          error
        );
      }
    }
  };

  // renameFile helper function
  const renameFile = async (oldPath, newPath) => {
    try {
      await fs.rename(oldPath, newPath);
      console.log(
        `The file at ${oldPath} is successfully renamed to ${newPath}`
      );
    } catch (error) {
      if (error.code === "ENOENT")
        console.log(
          `Cannot Rename: The file ${oldPath} not found or the destination doesn't exist!`
        );
      else console.error(`An error occured while renaming the file: `, error);
    }
  };

  // addToFile helper function
  const addToFile = async (path, content) => {
    try {
      await fs.stat(path);
      // if an error not thrown till now, means file def exists
      const existingFileHandle = await fs.open(path, "a");
      await existingFileHandle.writeFile(content);
      existingFileHandle.close();
      console.log(`Content successfully added to the file ${path}`);
    } catch (error) {
      return console.log(`Cannot add to File: The file ${path} not found!`);
    }
  };

  const commandFileHandle = await fs.open("./command.txt", "r");
  commandFileHandle.on("change", async () => {
    const dataSize = (await commandFileHandle.stat()).size;

    const buffer = Buffer.alloc(dataSize); // using stat here
    const offset = 0; // buffer's starting position to write data to
    const length = buffer.byteLength; // how many bytes we want to read from the buffer
    const position = 0; // where to begin reading from in the file

    await commandFileHandle.read(buffer, offset, length, position);

    const command = buffer.toString("utf-8");

    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      await createFile(filePath);
    }

    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      await deleteFile(filePath);
    }

    // rename a file <oldPath> to <newPath>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const oldPath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);
      await renameFile(oldPath, newPath);
    }

    // add to the file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      await addToFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandle.emit("change");
    }
  }
})();
