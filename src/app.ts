import {
  printFailureMessage,
  printGoodbyeMessage,
  printSuccessMessage,
  printWelcomeMessage,
} from "./messages";
import { askForPassword } from "./questions";

const run = async () => {
  printWelcomeMessage();

  const savePassword = await askForPassword();

  if (savePassword.answer === "yes") {
    const password = await handleEnterPassword();
    const validationPassword = await handleValidatePassword();

    if (handleCheckPassword(password.password, validationPassword.password)) {
      printSuccessMessage();
    } else {
      printFailureMessage();
    }
  } else {
    printGoodbyeMessage();
  }
};

run();
