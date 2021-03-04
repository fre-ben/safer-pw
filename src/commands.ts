import chalk from "chalk";
import prompts from "prompts";
import { createPasswordDoc } from "./db";
import {
  printFailureMessage,
  printGoodbyeMessage,
  printSuccessMessage,
} from "./messages";

type Password = {
  password: string;
};

export const handleEnterPassword = (): Promise<Password> => {
  return prompts({
    type: "password",
    name: "password",
    message: chalk.inverse("Enter the password:"),
  });
};

export const handleValidatePassword = (): Promise<Password> => {
  return prompts({
    type: "password",
    name: "password",
    message: chalk.inverse("Please re-enter password to validate:"),
  });
};

export const handleCheckPassword = async (
  password: string,
  validationPassword: string
) => {
  if (password === validationPassword) {
    printSuccessMessage();
    printGoodbyeMessage();
    await createPasswordDoc({
      name: "Testuser7",
      value: password,
    });
  } else {
    printFailureMessage();
  }
};
