import { Router } from "express";
import { getStoryOnBoard , getStoryForUser , getStoryById, addStory ,deleteStory } from "../services/story.service.js";
import { body ,validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/user/story/:boardId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req ,res) => {
    try {
        const response = await getStoryForUser(req.params.boardId , req.user.id);
        return res.status(response.status).json({stories : response.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.get("/board/story/:boardId" , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req ,res) => {
    try {
        const response = await getStoryOnBoard(req.params.boardId);
        return res.status(response.status).json({stories : response.message});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.get("/story/:storyId" , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req ,res) => {
    try {
        const response = await getStoryById(req.params.storyId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.post("/story/:boardId" , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']), [
    body("title").notEmpty(),
    body("description").notEmpty(),
    body("reporter").notEmpty(),
] ,async (req ,res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({error : "Enter all required fields!"});
    }
    try {
        const response = await addStory(req.params.boardId ,req.body , req.user.id);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.delete("/story/:storyId" , roleMiddleware(['Scrum']),async (req ,res) => {
    try {
        const response = await deleteStory(req.params.storyId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

export default router;
