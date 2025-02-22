import { Router } from "express";
import {  getEpicsByBoardId , addEpic , deleteEpic , updateEpic } from "../services/epic.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';


const router = Router()

router.get('/epic/:boardId' , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req , res) => {
    try {
        const response = await getEpicsByBoardId(req.params.boardId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});

router.post('/epic/:boardId' , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,[
    body('title').notEmpty(),
    body('description').notEmpty()
] ,async (req , res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send("Enter all required fields");
    }
    try {
        console.log();
        
        const response = await addEpic(req.body , req.user.id ,req.params.boardId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});

router.put('/epic/:epicId' , roleMiddleware(['Scrum' , 'Tech Lead']) ,async (req , res) => {
    try {
        const response = await updateEpic(req.body.summary, req.body.description , req.params.epicId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});

router.delete('/epic/:epicId' , roleMiddleware(['Scrum' , 'Tech Lead']) ,async (req , res) => {
    try {
        const response = await deleteEpic(req.params.epicId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error");
    }
});

export default router;
