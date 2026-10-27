import express from "express";
import { registerUser,
    getMe,
    loginUser,
    getProfile,
} from "../controllers/authController.js";
import { registerValidation,
    loginValidation,
 } from "../validations/authValidation.js";
import validate from "../middleware/validateMiddleware.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", ...registerValidation,validate,registerUser);
router.post("/login",loginValidation,validate,loginUser);
router.get("/me", protect, getMe);
router.get("/profile",protect, getProfile);

export default router;