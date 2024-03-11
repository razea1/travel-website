import { vacations } from "../models/vacationsModel";
import express, { NextFunction, Request, Response } from "express";
import logic from "../logic/logic";

const router = express.Router();

// GET http://localhost:3001/api/vacations
router.get("/api/vacations", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationsList = await logic.getAllVacations();
    response.json(vacationsList);
  } catch (err: any) {
    next(err);
  }
});

router.put("/api/vacations/:idVacation", async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Extract the updated vacation data from the request body
    const updatedVacationData = request.body;

    // Call the logic function to update the vacation
    await logic.updateVacation(updatedVacationData);

    // If the update is successful, send a success response
    response.sendStatus(200);
  } catch (err: any) {
    // If an error occurs during the update, handle the error
    next(err);
  }
});

router.get("/api/vacations/:idVacation", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const idVacation = +request.params.idVacation; // Get the idVacation from the request parameters
    const vacation = await logic.getVacationById(idVacation);
    console.log(idVacation); // Pass the idVacation to the getVacationById function
    response.json(vacation);
  } catch (err: any) {
    next(err);
  }
});

router.post("/api/vacations", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const vacationData = request.body;
    const addedVacation = await logic.addVacation(vacationData);
    response.status(201).json(addedVacation);
  } catch (err: any) {
    next(err);
  }
});

// DELETE http://localhost:3001/api/vacation/:idVacation
router.delete("/api/vacation/:idVacation", async (request: Request, response: Response, next: NextFunction) => {
  try {
    const idDelete = +request.params.idVacation;
    const isDeleted = await logic.deleteVacation(idDelete);
    if (isDeleted) {
      response.sendStatus(204); // Send success status
    } else {
      response.status(404).json({ error: "Vacation not found" }); // Send error status and message
    }
  } catch (err: any) {
    next(err);
  }
});

export default router;
