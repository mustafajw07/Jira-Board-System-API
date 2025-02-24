import { Router } from "express";
import { getSprintBoardById , addSprint , updateSprint , deleteSprint , geActivetSprintBoardById } from "../services/sprint.service.js";
import { body ,validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router()

router.get('/sprint/:boardId' , roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req , res) => {
    try {
        let boardId = req.params.boardId;
        const response = await getSprintBoardById(boardId);
        return res.status(response.status).json({sprint : response.message});
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});

router.get('/sprint/active/:boardId' , roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req , res) => {
    try {
        let boardId = req.params.boardId;
        const response = await geActivetSprintBoardById(boardId);
        return res.status(response.status).json({sprint : response.message});
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});

router.post('/sprint' , roleMiddleware(['Scrum']) , 
    body('sprintNo').notEmpty(),
    body('sprintName').notEmpty(),
    body('startDate').notEmpty(),
    body('endDate').notEmpty(),
    body('boardId').notEmpty(),
async (req , res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send("Enter all required fields!");
    }
    try {
        const response = await addSprint(req.body);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});

router.put('/sprint/:sprintId' , roleMiddleware(['Scrum']) , async (req , res) => {
    try {
        const response = await updateSprint(req.body , req.params.sprintId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});

router.delete('/sprint/:sprintId' , roleMiddleware(['Scrum']) , async (req , res) => {
    try {
        const response = await deleteSprint(req.params.sprintId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.error(error);
        return res.status(500).json("Internal server error!");
    }
});


export default router;
