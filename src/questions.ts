import chalk from "chalk";
import prompts, { Answers } from "prompts";

type Answers = {
  answer: string;
};

export const askForPassword = (): Promise<Answers> =>
  prompts({
    type: "text",
    name: "answer",
    message: chalk.inverse("Do you want to save a password? (yes/no)"),
  });
