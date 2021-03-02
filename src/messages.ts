import chalk from "chalk";

export const printWelcomeMessage = () => {
  console.log("Welcome to Safer-PW! 🔐");
};

export const printSuccessMessage = () => {
  console.log(chalk.black.bgGreen("Password validated ✅ "));
  console.log(chalk.bgYellow.black("Password saved 🔒 "));
};

export const printFailureMessage = () => {
  console.log(chalk.bgRed.black("Passwords didn't match ❌ "));
  console.log(
    chalk.bgBlue.black("Please restart, if you want to try again ↩ ")
  );
};

export const printGoodbyeMessage = () => {
  console.log(
    chalk.bgMagenta.yellow("Goodbye! Thank you for using Safer-PW 💖 ")
  );
};
