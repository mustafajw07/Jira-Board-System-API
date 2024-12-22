import { Router } from "express";
import { getStoryTypes , addType } from "../services/storyType.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/story-type", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
      const response = await getStoryTypes();
      return res.status(response.status).json({types : response.message});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error!" });
    }
  });
  
  router.post("/story-type", roleMiddleware(['Scrum']) ,[
      body('type').notEmpty(),
  ], async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({error : "Enter all fields!"});
    }
    try {
      const response = await addType(req.body.type);
      return res.status(response.status).json(response.message);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error!" });
    }
  });

export default router;
