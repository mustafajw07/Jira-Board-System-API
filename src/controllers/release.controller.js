import { Router } from "express";
import { getReleaseBySprintId , getReleaseByBoardId , getReleaseById , deleteRelease} from "../services/release.service.js";
import { body ,validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/sprint/release/:sprintId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']), async (req, res) => {
  try {
    const response = await getReleaseBySprintId(req.params.sprintId);
    return res.status(response.status).json(response.message)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
});

router.get("/board/release/:boardId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']), async (req, res) => {
  try {
    const response = await getReleaseByBoardId(req.params.boardId);
    return res.status(response.status).json(response.message)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
});

router.get("/release/:releaseId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
  try {
    const response = await getReleaseById(req.params.releaseId);
    return res.status(response.status).json(response.message)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
});

router.post("/release", roleMiddleware(['Scrum']) ,[
    body('releaseName').notEmpty(),
    body('sprintId').notEmpty()
], async (req, res) => {
  const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send("Enter a all fields!");
      }
  try {
    const response = await addRole(req.body.title);
    return res.status(response.status).json(response.message)
  } catch (error) {
    console.error(error);
    return res.status(500).json("Internal server error!");
  }
});

router.delete("/release/:releaseId", roleMiddleware(['Scrum']) , async (req, res) => {
    try {
        const response = await deleteRelease(req.params.releaseId);
        return res.status(response.status).json(response.message)
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});

export default router;