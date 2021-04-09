import http from "http";
import dotenv from "dotenv";
import { connectDB } from "./db";
import { handleDelete, handleGet, handlePost } from "./routes";

dotenv.config();

const port = process.env.PORT;
const url = process.env.MONGODB_URL;

connectDB(url, "safer-pw-frederik");

const server = http.createServer(
  async (request: http.IncomingMessage, response: http.ServerResponse) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

    if (request.url === "/") {
      response.statusCode = 200;
      response.setHeader("Content-Type", "text/html");
      response.end("<h1>Safer PW!</h1>");
      return;
    }

    if (request.method === "GET") {
      handleGet(request, response);
      return;
    }

    if (request.method === "POST") {
      handlePost(request, response);
      return;
    }

    if (request.method === "DELETE") {
      handleDelete(request, response);
      return;
    }

    response.end();
  }
);

server.listen(port, () => {
  console.log(`server running at http://localhost:${port} 🦝`);
});
