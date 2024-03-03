import * as express from "express";
import { router } from "./routes";
import * as http from "http";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);

const port = 80;
http
  .createServer(app)
  .listen(port, () => console.log(`Server listening on port ${port}`));
