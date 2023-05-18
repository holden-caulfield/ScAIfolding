import { program } from "commander";
import { readFile, writeFile } from "../lib/files.js";
import inquirer from "inquirer";
import OpenAIRequest from "../lib/openai.js";

const buildPrompt = (inputFileContents, instructions) => `
Given the following code:
${inputFileContents}
Write a similar one with the following instructions:
${instructions}
`;

const requestEditorInput = async (message) => {
  const input = await inquirer
    .prompt({
      type: "editor",
      name: "userInput",
      message,
      waitUserInput: false,
    })
    .then(({ userInput }) => {
      return userInput;
    });
  return input;
};

program
  .name("scaifold")
  .description(
    "Creates an AI generated according to the instructions given and using <inputFile> as a reference"
  )
  .option(
    "-i, --instructions <instructions>",
    "instructions to generate the new file"
  )
  .option("-d, --dry", "just generate the prompt")
  .option("-u, --update", "override input file")
  .arguments("<inputFile> [outputfile]")
  .version("0.0.1");

program.action(async (inputFile, outputFile, { instructions, dry, update }) => {
  const inputFileContents = readFile(inputFile);
  if (!inputFileContents) return;
  if (update) {
    outputFile = inputFile;
  }
  if (!instructions) {
    instructions = await requestEditorInput(
      "Write your instructions to generate the file"
    );
  }
  const prompt = buildPrompt(inputFileContents, instructions);
  let output;

  if (dry) {
    output = prompt;
  } else {
    const result = await OpenAIRequest(prompt);
    output = result.data.choices[0].text.trimStart();
  }

  if (outputFile) {
    writeFile(outputFile, output);
  } else {
    process.stdout.write(`${output} \n`);
  }
});

program.parse();
