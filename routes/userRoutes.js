import express from "express";
const router = express.Router();

// importing all controlles
import { register, login,  profile_update} from "../controllers/userControllers.js";

// post method
router.post("/register", register);

// post method
router.post("/login", login);

router.post("/profileupdate", profile_update);

export default router;