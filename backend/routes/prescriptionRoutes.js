// routes/prescriptionRoutes.js
import express from "express";
import upload from "../utils/multer.js";

import isAuth from "../config/isAuth.js";
import { uploadPrescriptionAndExtract } from "../controllers/prescriptionUploadcontroller.js";

const router = express.Router();

router.post("/upload", isAuth, upload.single("file"), uploadPrescriptionAndExtract);

export default router;
