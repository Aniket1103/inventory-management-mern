import express from "express";
import { 
  register,
  login,
  logout,
  currentUser
 } from "../controllers/user.js"
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/currentUser").get(isAuthenticated, currentUser);
router.route("/logout").get(logout);

export default router;