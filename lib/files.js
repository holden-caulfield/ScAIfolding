import fs from "fs";

export const readFile = (filePath) => {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch (err) {
    console.error(`Cannot read ${filePath}\n${err}`);
    return false;
  }
};

export const writeFile = (filePath, contents) => {
  try {
    fs.writeFileSync(filePath, contents);
    return true;
  } catch (err) {
    console.error(`Cannot write ${filePath}\n${err}`);
    return false;
  }
};
