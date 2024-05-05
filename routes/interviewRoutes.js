import express from "express";

const router = express.Router();

// importing all controlles
import { interviewSchedule} from "../controllers/interviewScheduleController.js";

// post method
router.post("/shedule", interviewSchedule );



export default router;