import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { handleDelete, handleGet, handlePost } from "./routes";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "safer-pw-frederik");

const getPasswordName = (
  request: http.IncomingMessage,
  response: http.ServerResponse
): string => {
  const parts = request.url.match(/\/api\/passwords\/(\w+)/);
  if (!parts) {
    response.statusCode = 400;
    response.end();
    return;
  }
  const [, passwordName] = parts;
  return passwordName;
};

const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    if (request.url === "/") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end("<h1>Safer PW!</h1>");
      return;
    }

    const passwordName = getPasswordName(request, response);

    if (request.method === "GET") {
      handleGet(request, response, passwordName);
      return;
    }

    if (request.method === "POST") {
      handlePost(request, response);
      return;
    }

    if (request.method === "DELETE") {
      handleDelete(request, response, passwordName);
      return;
    }

    response.end();
  }
);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port} 🦝`);
});
