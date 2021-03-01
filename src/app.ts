import prompts from "prompts";

const run = async () => {
  console.log("Welcome to Safer-PW! 🔐");

  const savePass = await prompts([
    {
      type: "text",
      name: "save",
      message: "Do you want to save a password? (yes/no)",
    },
    {
      type: (prev) => (prev == "yes" ? "password" : null),
      name: "password",
      message: "Enter the password:",
    },
  ]);

  if (savePass.save === "yes") {
    const validatePass = await prompts({
      type: "password",
      name: "passwordValidate",
      message: "Please re-enter password to validate:",
    });
    if (savePass.password === validatePass.passwordValidate) {
      console.log("Password validated ✅");
      console.log("Password saved 🔒");
    } else if (savePass.password !== validatePass.passwordValidate) {
      console.log("Passwords didn't match ❌");
      console.log("Please restart, if you want to try again ↩");
    }
  } else {
    console.log("Goodbye! Thank you for using Safer-PW 💖");
  }
};

run();
