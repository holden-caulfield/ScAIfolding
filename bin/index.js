import { program } from "commander";
import { readFile } from "../lib/files.js";
import OpenAIRequest from "../lib/openai.js";

const buildPrompt = (inputFileContents, instructions) => `
Given the following code:
${inputFileContents}
Write a similar one with the following instructions:
${instructions}
`;

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
  .arguments("<inputFile> [outputfile]")
  .version("0.0.1");

program.action(async (inputFile, outputFile, { instructions, dry }) => {
  const inputFileContents = readFile(inputFile);
  if (!inputFileContents) return;
  const prompt = buildPrompt(inputFileContents, instructions);
  let output;
  if (dry) {
    output = prompt;
  } else {
    const result = await OpenAIRequest(prompt);
    output = result.data.choices[0].text;
  }

  process.stdout.write(`${output} \n`);
});

program.parse();
