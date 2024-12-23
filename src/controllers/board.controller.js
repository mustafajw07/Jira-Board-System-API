import { Router } from "express";
import { body ,validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';
import {getUserAllBoard , getAllBoard  , addBoard , deleteBoard , getBoardById ,  getSprintByBoardId, updateBoard , removeUserFromBoard} from '../services/board.service.js'

const router = Router();

router.get('/boards' , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req , res) => {
    try {
        const response = await getAllBoard()
        return res.status(response.status).json(response.boards);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.get('/user/boards' , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req , res) => {
    try {
        const response = await getUserAllBoard(req.user.id);
        return res.status(response.status).json(response.boards);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});


router.get('/board/:boardId' , roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) ,async (req , res) => {
    try {
        let boardId = req.params.boardId;
        const response = await getBoardById(boardId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.get('/board/sprint/:boardId' , roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req , res) => {
    try {
        let boardId = req.params.boardId;
        const response = await getSprintByBoardId(boardId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.post('/board' , roleMiddleware(['Scrum']) , [
    body('boardName').notEmpty(),
    body('description').notEmpty(),
    body('users').notEmpty(),
] ,async (req , res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send("Enter all required fields!");
    }
    try {
        const response = await addBoard(req.body.boardName , req.body.description , req.body.users);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.put('/board/:boardId' , roleMiddleware(['Scrum']) ,async (req , res) => {
    try {
        const response = await updateBoard(req.params.boardId , req.body.boardName , req.body.description , req.body.users);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.delete('/board/:boardId/:userId' , roleMiddleware(['Scrum']) ,async (req , res) => {
    try {
        const response = await removeUserFromBoard(req.params.boardId , req.params.userId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.delete('/board/:boardId' , roleMiddleware(['Scrum']) ,async (req , res) => {
    try {
        let boardId = req.params.boardId;
        const response = await deleteBoard(boardId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

export default router;