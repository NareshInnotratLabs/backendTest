import express from "express";
const router = express.Router();

// importing all controlles
import { register, login} from "../controllers/userControllers.js";

// post method
router.post("/register", register);

// post method
router.post("/login", login);



export default router;