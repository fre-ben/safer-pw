import chalk from "chalk";
import prompts from "prompts";

type Answers = {
  answer: "yes" | "no";
};

export const askSavePassword = (): Promise<Answers> =>
  prompts({
    type: "select",
    name: "answer",
    message: chalk.inverse("Do you want to save a password?"),
    choices: [
      { title: "Yes", value: "yes" },
      { title: "No", value: "no" },
    ],
  });
