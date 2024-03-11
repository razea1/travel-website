import { siteUsers } from "./../models/siteUsersModel";
import { vacations } from "./../models/vacationsModel";
import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/logic";

const router = express.Router();

// GET http://localhost:3001/api/siteUsers
router.get("/api/siteUsers", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const siteUsersList = await logic.getUserList();
    response.json(siteUsersList);
  } catch (err: any) {
    next(err);
  }
});

router.post("/api/siteUsers", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const usersData = request.body;
    console.log(usersData);
    const addedUser = await logic.addUser(usersData);
    response.status(201).json({ addedUser });
  } catch (err: any) {
    next(err);
  }
});

router.post("/api/LoginUsers", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const userLogin: siteUsers = request.body;
    if (await logic.checkLogin(userLogin)) {
      return response.status(200).json({ message: "User logged in successfully!" });
    }
    return response.status(401).json({ message: "Invalid credentials. Please try again." });
  } catch (err: any) {
    next(err);
  }
});

router.delete("/api/siteUsers/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const idUser = +request.params.id;
    await logic.deleteUser(idUser);
    response.sendStatus(204);
  } catch (err: any) {
    next(err);
  }
});

router.post("/api/checkLogin", async (request: Request, response: Response, next: NextFunction) => {
  const userLogin: siteUsers = request.body;
  try {
    const userId = await logic.checkLogin(userLogin);
    if (await logic.checkLogin(userLogin)) {
      return response.status(200).json({ userId });
    }
    return response.status(401).json("bad");
  } catch (err) {
    console.log("oh no");
    next(err);
  }
});

export default router;
