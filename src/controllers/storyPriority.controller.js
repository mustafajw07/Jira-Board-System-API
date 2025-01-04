import { Router } from "express";
import { getStoryPriorities , addPriority } from "../services/storyPriority.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/story-priority", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
      const response = await getStoryPriorities();
      return res.status(response.status).json({priorities : response.message});
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error!");
    }
  });
  
  router.post("/story-priority", roleMiddleware(['Scrum']) ,[
      body('priority').notEmpty(),
  ], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({error : "Enter all fields!"});
    }
    try {
      const response = await addPriority(req.body.priority);
      return res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
      return res.status(500).json("Internal server error!");
    }
  });

export default router;
