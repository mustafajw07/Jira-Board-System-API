import { Router } from "express";
import { registerUser , loginUser , getUser , getUserWithRole , getAllUsers } from "../services/user.service.js";
import { body, validationResult } from "express-validator";
import roleMiddleware from '../middlewares/auth.js';

const router = Router();

router.get("/users", roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req, res) => {
  try {
    const response = await getAllUsers();
    return res.status(response.status).json({users : response.message});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.get("/profile", roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req, res) => {
  try {
    const response = await getUser(req.user.id);
    return res.status(response.status).json({user : response.message});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.get("/profile/role", roleMiddleware(['Scrum' , 'Developer' , 'Tech Lead']) , async (req, res) => {
  try {
    const response = await getUserWithRole(req.user.id);
    return res.status(response.status).json({role : response.message});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.post("/register", [
    body('email').notEmpty().isEmail(),
    body('userName').notEmpty(),
    body('password').notEmpty(),
    body('roleId').notEmpty()
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({error : "Enter valid Credentials!"});
  }
  try {
    const response = await registerUser(req.body.userName , req.body.email , req.body.password , req.body.roleId);
    
    return res.status(response.status).json(response.message);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

router.post("/login", [
    body('email').notEmpty().isEmail(),
    body('password').notEmpty()
], async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({error : "Enter valid Credentials!"});
  }
  try {
    const response = await loginUser(req.body.email , req.body.password);
    return res.status(response.status).json({message : response.message});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error!" });
  }
});

export default router;