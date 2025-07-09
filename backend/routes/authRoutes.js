import express from "express"
import isAuth from "../config/isAuth.js";
import { deleteUser, getCurrentUser, loginUser, logout, registerUser, updateUserProfile } from "../controllers/authcontroller.js";
import upload from "../utils/multer.js";
const router =express.Router();


router.route('/me').get(isAuth,getCurrentUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(isAuth,logout);

router.route('/profile/edit').post(isAuth,upload.single('profilepicture'),updateUserProfile);
router.route("/delete").delete(isAuth, deleteUser);

export default router;