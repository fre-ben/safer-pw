import { Collection, Db, MongoClient } from "mongodb";
import CryptoJS from "crypto-js";

let client: MongoClient = null;
let db: Db = null;

export type PasswordDoc = {
  name: string;
  value: string;
};

export async function connectDB(url: string, dbName: string) {
  client = await MongoClient.connect(url, { useUnifiedTopology: true });
  db = client.db(dbName);
}

export function getCollection<T>(collectionName: string): Collection<T> {
  return db.collection<T>(collectionName);
}

export function closeDB() {
  client.close();
}

export async function createPasswordDoc(passwordDoc: PasswordDoc) {
  const passwordCollection = await getCollection("userData");
  const encryptedPasswordDoc = {
    name: passwordDoc.name,
    value: encryptPassword(passwordDoc.value),
  };
  return await passwordCollection.insertOne(encryptedPasswordDoc);
}

export async function readPasswordDoc(
  passwordName: string
): Promise<PasswordDoc> {
  const passwordCollection = await getCollection<PasswordDoc>("userData");
  const passwordDoc = await passwordCollection.findOne({ name: passwordName });
  return {
    name: passwordDoc.name,
    value: decryptPassword(passwordDoc.value),
  };
}

export async function updatePasswordDoc(
  passwordName: string,
  fieldsToUpdate: Partial<PasswordDoc>
): Promise<boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("userData");
  const updateResult = await passwordCollection.updateOne(
    { name: passwordName },
    { $set: fieldsToUpdate }
  );
  return updateResult.modifiedCount >= 1;
}

export async function updatePasswordValue(
  passwordName: string,
  newPasswordValue: string
): Promise<boolean> {
  return await updatePasswordDoc(passwordName, { value: newPasswordValue });
}

export async function deletePasswordDoc(
  passwordName: string
): Promise<boolean> {
  const passwordCollection = await getCollection<PasswordDoc>("userData");
  const deleteResult = await passwordCollection.deleteOne({
    name: passwordName,
  });
  return deleteResult.deletedCount >= 1;
}

export function encryptPassword(password: string): string {
  return CryptoJS.AES.encrypt(
    password,
    process.env.CRYPTO_MASTER_PASSWORD
  ).toString();
}

export function decryptPassword(ciphertext: string): string {
  const bytes = CryptoJS.AES.decrypt(
    ciphertext,
    process.env.CRYPTO_MASTER_PASSWORD
  );
  return bytes.toString(CryptoJS.enc.Utf8);
}
