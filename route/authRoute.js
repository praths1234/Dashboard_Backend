import express from 'express';
import { registerController , loginController , testController , forgotPasswordController , getUserById , getUser} from '../controller/authController.js';
import { requireSignIn , isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router();
router.post("/register", registerController);
router.post("/login" , loginController);
router.post("/forgot-password" , forgotPasswordController);
router.get("/test", requireSignIn, isAdmin, testController);
router.get("/all-users" , getUser );
router.get("/user-auth" , requireSignIn , (req , res) => {
    res.status(200).send({ ok: true });
});
router.get("/admin-auth" , requireSignIn , isAdmin , (req , res) => {
    res.status(200).send({ ok: true });
});
router.get("/:userId" , getUserById);
export default router;