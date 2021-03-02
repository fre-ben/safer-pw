import {
  handleCheckPassword,
  handleEnterPassword,
  handleValidatePassword,
} from "./commands";
import { printGoodbyeMessage, printWelcomeMessage } from "./messages";
import { askForPassword } from "./questions";

const run = async () => {
  printWelcomeMessage();

  const savePassword = await askForPassword();

  if (savePassword.answer === "yes") {
    const password = await handleEnterPassword();
    const validationPassword = await handleValidatePassword();

    handleCheckPassword(password.password, validationPassword.password);
  }
  printGoodbyeMessage();
};

run();
