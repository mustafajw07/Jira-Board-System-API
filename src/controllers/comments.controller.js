import { Router } from "express";
import { getComments , addComment , updateComment , deleteComment} from "../services/comments.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/comment/:storyId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
      const response = await getComments(req.params.storyId);
      return res.status(response.status).json({comments : response.message});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: "Internal server error!" });
    }
  });
  
router.post("/comment/:storyId", roleMiddleware(['Scrum' ,'Tech Lead' , 'Developer']) ,[
    body('description').notEmpty()
], async (req, res) => {
const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).json({error : "Enter all fields!"});
    }
    try {
        const response = await addComment(req.body.description , req.user.id , req.params.storyId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});


router.put("/comment/:commentId", roleMiddleware(['Scrum' ,'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
        const response = await updateComment(req.body.description , req.user.id , req.params.commentId);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});

router.delete("/comment/:commentId", roleMiddleware(['Scrum' , 'Tech Lead' , 'Developer']) , async (req, res) => {
    try {
        const response = await deleteComment(req.params.commentId , req.user.id);
        return res.status(response.status).json(response.message);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error!" });
    }
});
export default router;
