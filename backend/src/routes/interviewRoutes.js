import express from "express";
import { startInterview, evaluateInteriewAnswer,getInterviewResults, getInterviewHistory, } from "../controllers/interviewController.js";
import protect from "../middleware/authMiddleware.js";
import { getDashboardStats } from "../controllers/interviewController.js";


const router = express.Router();

router.post("/start", protect, startInterview);
router.post("/evaluate",protect,evaluateInteriewAnswer);
router.get("/results/:interviewId",protect,getInterviewResults);
router.get("/history", protect, getInterviewHistory);
router.get("/dashboard", protect, getDashboardStats);

export default router;