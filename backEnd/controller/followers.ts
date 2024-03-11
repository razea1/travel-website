import { followers } from "./../models/followersModel";
import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/logic";

const router = express.Router();

// http://localhost:3001/api/Followers
router.get("/api/followers/:id", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const id = parseInt(request.params.id, 10);
    const followersList = await logic.getFollowerByVacation(id);
    const followerCount = followersList[0]["COUNT(*)"];
    response.json({ followerCount });
  } catch (err: any) {
    next(err);
  }
});

router.post("/api/followers", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const followersData = request.body;
    const addedFollower = await logic.addFollower(followersData);
    response.status(201).json(addedFollower);
  } catch (err: any) {
    next(err);
  }
});

export default router;
