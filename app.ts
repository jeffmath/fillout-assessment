import * as express from "express";
import { router } from "./routes";
import * as http from "http";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = parseInt(process.env.PORT) || 3000;
http
  .createServer(app)
  .listen(port, "0.0.0.0", () =>
    console.log(`Server listening on port ${port}`),
  );
