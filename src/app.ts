import {
  handleCheckPassword,
  handleEnterName,
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
  updatePasswordValue,
} from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "safer-pw-frederik");
    printWelcomeMessage();
    const savePassword = await askSavePassword();

    switch (savePassword.answer) {
      case "yes":
        const name = await handleEnterName();
        const password = await handleEnterPassword();
        const validationPassword = await handleValidatePassword();
        await handleCheckPassword(
          password.value,
          validationPassword.value,
          name.name
        );
        break;
      case "no":
        printGoodbyeMessage();
        break;
    }
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();

// await createPasswordDoc({
//   name: "Frederik",
//   value: "döner2000",
// });
// console.log(await readPasswordDoc("Eva"));
// console.log(await updatePasswordValue("Frederik", "LeckerSchnitzel"));
// console.log(
//   await updatePasswordDoc("Freddy", {
//     name: "Frederik",
//     value: "testdfsfili",
//   })
// );

// console.log(await deletePasswordDoc("Boris"));
// await closeDB();
