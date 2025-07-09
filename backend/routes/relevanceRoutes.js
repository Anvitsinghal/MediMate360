import express from "express"
import { checkMedicineRelevance } from "../controllers/medicineController.js";
const router=express.Router();
router.route('/checkrelevance').get(checkMedicineRelevance);
export default router;