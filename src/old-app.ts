import prompts from "prompts";
import chalk from "chalk";

const run = async () => {
  console.log("Welcome to Safer-PW! 🔐");

  const savePass = await prompts([
    {
      type: "text",
      name: "answer",
      message: chalk.inverse("Do you want to save a password? (yes/no)"),
    },
    {
      type: (prev) => (prev == "yes" ? "password" : null),
      name: "password",
      message: chalk.inverse("Enter the password:"),
    },
  ]);

  if (savePass.answer === "yes") {
    const validatePass = await prompts({
      type: "password",
      name: "password",
      message: chalk.inverse("Please re-enter password to validate:"),
    });
    if (savePass.password === validatePass.password) {
      console.log(chalk.black.bgGreen("Password validated ✅ "));
      console.log(chalk.bgYellow.black("Password saved 🔒 "));
    } else if (savePass.password !== validatePass.password) {
      console.log(chalk.bgRed.black("Passwords didn't match ❌ "));
      console.log(
        chalk.bgBlue.black("Please restart, if you want to try again ↩ ")
      );
    }
  } else {
    console.log(
      chalk.bgMagenta.yellow("Goodbye! Thank you for using Safer-PW 💖 ")
    );
  }
};

run();
