import http, { request } from "http";
import dotenv from "dotenv";
import {
  connectDB,
  createPasswordDoc,
  deletePasswordDoc,
  PasswordDoc,
  readPasswordDoc,
} from "./db";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "safer-pw-frederik");

const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    // const parseJSONBody = <T>(request: http.IncomingMessage): Promise<T> => {
    //   return new Promise((resolve) => {
    //     let data = "";
    //     request.on("data", (chunk) => {
    //       data += chunk;
    //     });
    //     request.on("end", () => {
    //       resolve(JSON.parse(data));
    //     });
    //   });
    // };

    if (request.url === "/") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end("<h1>Safer PW!</h1>");
      return;
    }
    const parts = request.url.split("/");
    const passwordName = parts[parts.length - 1];

    if (request.method === "GET") {
      const passwordDoc = await readPasswordDoc(passwordName);
      if (!passwordDoc) {
        response.statusCode = 404;
        response.end();
        return;
      }
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(passwordDoc));
      return;
    }

    if (request.method === "POST") {
      //   const newPassword = await parseJSONBody<PasswordDoc>(request);
      //   const passwordDoc = await createPasswordDoc(newPassword);

      let data = "";
      request.on("data", (chunk) => {
        data += chunk;
      });
      request.on("end", async () => {
        const enterName = JSON.parse(data).name;
        const enterValue = JSON.parse(data).value;
        response.statusCode = 200;
        response.setHeader("Content-Type", "application/json");
        //   response.end(JSON.stringify(passwordDoc));
        response.end(
          JSON.stringify(
            await createPasswordDoc({
              name: enterName,
              value: enterValue,
            })
          )
        );
      });
      return;
    }

    if (request.method === "DELETE") {
      const passwordDoc = await readPasswordDoc(passwordName);
      if (!passwordDoc) {
        response.statusCode = 404;
        response.end();
        return;
      }
      response.statusCode = 200;
      response.setHeader("Content-Type", "application/json");
      response.end(JSON.stringify(await deletePasswordDoc(passwordName)));
      return;
    }

    response.end();
  }
);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port} 🦝`);
});
