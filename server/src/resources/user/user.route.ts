import UserController from "./user.controller";
import { Router } from "express";
import validateBody from "./user.validation";
import verifyAccessToken from "../../middleware/token/verify.acces.token";
import verifyRefreshToken from "../../middleware/token/verify.refresh.token";

const router = Router();
const userController = new UserController();

router.post("/login", userController.login);
router.post("/register", validateBody, userController.register);
router.post("/verify-otp", userController.verifyAccount);
router.post("/verify-acces-token", verifyAccessToken);
router.post("/verify-refresh-token", verifyRefreshToken);

export default router;
