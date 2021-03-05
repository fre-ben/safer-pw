import chalk from "chalk";
import prompts from "prompts";

type Answers = {
  answer: "save" | "read";
};

export const askSaveOrReadPassword = (): Promise<Answers> =>
  prompts({
    type: "select",
    name: "answer",
    message: chalk.inverse("Do you want to save or read a password?"),
    choices: [
      { title: "Save", value: "save" },
      { title: "Read", value: "read" },
    ],
  });
