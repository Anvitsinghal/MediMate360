import express from "express"
import { createScheme, deleteScheme, getAllSchemes, getSchemeById, updateScheme } from "../controllers/schemeController.js";
import isAuth from "../config/isAuth.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import upload from "../utils/multer.js";
const router =express.Router();

router.route("/getallschemes").get(getAllSchemes);
router.route("/:id").get(getSchemeById);
router.post("/create", isAuth, isAdmin, upload.single("schemeimage"), createScheme);
router.post("/update/:id", isAuth, isAdmin, upload.single("schemeimage"), updateScheme);
router.delete("/delete/:id", isAuth, isAdmin, deleteScheme);

export default router;