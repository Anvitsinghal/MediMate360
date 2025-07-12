import express from "express"
import { addMedicine, checkMedicineRelevance, getMedicineAlternatives, getMedicineBuyLinks, getMedicineInfo, searchMedicines } from "../controllers/medicineController.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import isAuth from "../config/isAuth.js";
const router=express.Router();
router.route('/medicineinfo').get(getMedicineInfo);
router.route('/medicinealternative').get(getMedicineAlternatives);
router.route('/medicinebuylinks').get(getMedicineBuyLinks);
router.route('/relevance').get(checkMedicineRelevance);
router.route('/addmedi').post(isAuth,addMedicine);
router.route('/search').get(isAuth,searchMedicines);
export default router;


