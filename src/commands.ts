import chalk from "chalk";
import prompts from "prompts";
import { createPasswordDoc, PasswordDoc } from "./db";
import {
  printFailureMessage,
  printGoodbyeMessage,
  printSuccessMessage,
} from "./messages";

export const handleEnterPassword = (): Promise<Partial<PasswordDoc>> => {
  return prompts({
    type: "password",
    name: "value",
    message: chalk.inverse("Enter the password:"),
  });
};

export const handleValidatePassword = (): Promise<Partial<PasswordDoc>> => {
  return prompts({
    type: "password",
    name: "value",
    message: chalk.inverse("Please re-enter password to validate:"),
  });
};

export const handleEnterName = (): Promise<Partial<PasswordDoc>> => {
  return prompts({
    type: "text",
    name: "name",
    message: chalk.inverse("Enter your name: "),
  });
};

export const handleCheckPassword = async (
  password: string,
  validationPassword: string,
  name: string
) => {
  if (password === validationPassword) {
    printSuccessMessage();
    printGoodbyeMessage();
    await createPasswordDoc({
      name: name,
      value: password,
    });
  } else {
    printFailureMessage();
  }
};
