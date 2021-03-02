import {
  handleCheckPassword,
  handleEnterPassword,
  handleValidatePassword,
} from "./commands";
import { printGoodbyeMessage, printWelcomeMessage } from "./messages";
import { askSavePassword } from "./questions";

const run = async () => {
  printWelcomeMessage();

  const savePassword = await askSavePassword();

  if (savePassword.answer === "yes") {
    const password = await handleEnterPassword();
    const validationPassword = await handleValidatePassword();

    handleCheckPassword(password.password, validationPassword.password);
  } else {
    printGoodbyeMessage();
  }
};

run();
