// routes/prescriptionRoutes.js
import express from "express";
import upload from "../utils/multer.js";

import isAuth from "../config/isAuth.js";
import { uploadPrescriptionAndExtract } from "../controllers/prescriptionUploadcontroller.js";

const router = express.Router();

// Test route to verify the router is working
router.get("/test", (req, res) => {
  res.json({ message: "Prescription routes are working!" });
});

router.post("/upload", isAuth, upload.single("prescription"), uploadPrescriptionAndExtract);

export default router;
