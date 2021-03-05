import {
  handleEnterName,
  handleEnterPassword,
  handleReadPassword,
  handleSavePassword,
  handleValidatePassword,
} from "./commands";
import { printWelcomeMessage } from "./messages";
import { askSaveOrReadPassword } from "./questions";
import dotenv from "dotenv";
import { closeDB, connectDB } from "./db";
dotenv.config();

const run = async () => {
  const url = process.env.MONGODB_URL;

  try {
    await connectDB(url, "safer-pw-frederik");

    printWelcomeMessage();
    const saveOrReadPassword = await (await askSaveOrReadPassword()).answer;

    switch (saveOrReadPassword) {
      case "save":
        const name = await handleEnterName();
        const password = await handleEnterPassword();
        const validationPassword = await handleValidatePassword();
        await handleSavePassword(password, validationPassword, name);
        break;
      case "read":
        await handleReadPassword();
        break;
    }
    await closeDB();
  } catch (error) {
    console.error(error);
  }
};

run();
