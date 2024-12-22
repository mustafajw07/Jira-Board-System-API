import { Router } from "express";
import { getRoles  , addRole} from "../services/role.service.js";
import { body ,validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/roles", roleMiddleware(['Scrum']) , async (req, res) => {
  try {
    const response = await getRoles();
    return res.status(response.status).json({roles : response.message})
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.post("/roles", roleMiddleware(['Scrum']) ,[
    body('title').notEmpty()
], async (req, res) => {
  const result = validationResult(req);
    if (!result.isEmpty()) {
        return res.status(400).send("Enter a title!");
      }
  try {
    const response = await addRole(req.body.title);
    return res.status(response.status).send(response.message)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

export default router;