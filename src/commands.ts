import chalk from "chalk";
import prompts from "prompts";
import { createPasswordDoc, PasswordDoc, readPasswordDoc } from "./db";
import {
  printFailureMessage,
  printGoodbyeMessage,
  printSuccessMessage,
} from "./messages";

export const handleEnterPassword = async (): Promise<string> => {
  return (
    await prompts({
      type: "password",
      name: "value",
      message: chalk.inverse("Enter the password:"),
    })
  ).value;
};

export const handleValidatePassword = async (): Promise<string> => {
  return (
    await prompts({
      type: "password",
      name: "value",
      message: chalk.inverse("Please re-enter password to validate:"),
    })
  ).value;
};

export const handleEnterName = async (): Promise<string> => {
  return (
    await prompts({
      type: "text",
      name: "name",
      message: chalk.inverse("Enter your name: "),
    })
  ).name;
};

export const handleSavePassword = async (
  password: string,
  validationPassword: string,
  name: string
) => {
  if (password === validationPassword) {
    printSuccessMessage();
    await createPasswordDoc({
      name: name,
      value: password,
    });
    printGoodbyeMessage();
  } else {
    printFailureMessage();
  }
};

export const handleReadPassword = async (): Promise<void> => {
  const nameSearch = await prompts({
    type: "text",
    name: "name",
    message: chalk.inverse("Enter username: "),
  });
  const password = await readPasswordDoc(nameSearch.name);
  if (!password) {
    console.log(
      chalk.bgRed.black("No user found. ") +
        chalk.bgBlue.black("Please try again. ↩ ")
    );
  } else {
    console.log(
      `Password for user ${chalk.inverse(nameSearch.name)} is: ${chalk.green(
        password.value
      )}`
    );
    await printGoodbyeMessage();
  }
};
