import {
  handleCheckPassword,
  handleEnterPassword,
  handleValidatePassword,
} from "./commands";
import { printGoodbyeMessage, printWelcomeMessage } from "./messages";
import { askSavePassword } from "./questions";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    const client = await MongoClient.connect(url, {
      useUnifiedTopology: true,
    });
    console.log("Connected to DB!");
    client.close();
  } catch (error) {
    console.error(error);
  }

  //   printWelcomeMessage();
  //   const savePassword = await askSavePassword();
  //   switch (savePassword.answer) {
  //     case "yes":
  //       const password = await handleEnterPassword();
  //       const validationPassword = await handleValidatePassword();
  //       handleCheckPassword(password.password, validationPassword.password);
  //       break;
  //     case "no":
  //       printGoodbyeMessage();
  //       break;
  //   }
};

run();
