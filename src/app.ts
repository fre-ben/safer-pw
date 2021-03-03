import {
  handleCheckPassword,
  handleEnterPassword,
  handleValidatePassword,
} from "./commands";
import { printGoodbyeMessage, printWelcomeMessage } from "./messages";
import { askSavePassword } from "./questions";

import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import {
  closeDB,
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  getCollection,
  readPasswordDoc,
  updatePasswordDoc,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "safer-pw-frederik");
    // await createPasswordDoc({
    //   name: "Boris",
    //   value: "12345",
    // });
    // await updatePasswordDoc("Frederik", { value: "HALLO!!!" });
    await deletePasswordDoc("Boris");
    await closeDB();
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

// await db.collection("userData").insertOne({
//   user: "Frederik",
//   password: "superSicher123",
//   passwordIsSafe: true,
//   age: 29,
//   country: "Germany",
//   city: "Wiesbaden",
//   tags: ["male", "funny"],
// });
