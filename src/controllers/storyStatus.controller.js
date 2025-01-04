import { Router } from "express";
import { getStoryStatus , addStatus } from "../services/storyStatus.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/story-status", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
      const response = await getStoryStatus();
      return res.status(response.status).json({statues : response.message});
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error!");
    }
  });
  
  router.post("/story-status", roleMiddleware(['Scrum']) ,[
      body('name').notEmpty(),
  ], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({error : "Enter all fields!"});
    }
    try {
      const response = await addStatus(req.body.name);
      return res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error!");
    }
  });

export default router;
