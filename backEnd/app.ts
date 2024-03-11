import express from "express";
import cors from "cors";
import config from "../backEnd/utils/config";
import catchAll from "./middleware/catchAll";
import routeNotFound from "./middleware/routeNotFound";
import { vacationRouter, userRouter, followerRouter } from "./controller";

const server = express();

server.use(cors());
server.use(express.json());
server.use(vacationRouter);
server.use(userRouter);
server.use(followerRouter);
server.use("*", routeNotFound);
server.use(catchAll);

server.listen(config.port, () => console.log("Listening on http://localhost:" + config.port));
