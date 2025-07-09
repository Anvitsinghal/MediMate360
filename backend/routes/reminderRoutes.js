import express from "express"
import { createReminder, deleteReminder, getReminderById, getUserReminders, updateReminder } from "../controllers/reminderController.js";
import isAuth from "../config/isAuth.js";
const router=express.Router();

router.route('/create').post(isAuth,createReminder);
router.route('/getuserreminder').get(isAuth,getUserReminders);
router.route('/userreminder/:id').post(isAuth,getReminderById);
router.route('/updatereminder/:id').post(isAuth,updateReminder);
router.route('/deletereminder/:id').post(isAuth,deleteReminder);
export default router;