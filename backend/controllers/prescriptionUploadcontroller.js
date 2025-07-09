import Medicine from "../models/medicine.js";
import { extractTextFromImage } from "../utils/ocr.js";
import getDataUri from "../utils/datauri.js";
import { Prescription } from "../models/Prescription.js";
import User from "../models/user.js";

export const uploadPrescriptionAndExtract = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    // OCR
    const text = await extractTextFromImage(file.buffer);
    const extractedLines = text.split("\n").map(line => line.trim()).filter(line => line.length > 2);

    // Filter probable medicine names (basic logic, can improve)
    const allMedicines = await Medicine.find();
    const matchedMedicines = [];

    for (let line of extractedLines) {
      for (let med of allMedicines) {
        if (line.toLowerCase().includes(med.name.toLowerCase())) {
          matchedMedicines.push({ name: med.name });
          break;
        }
      }
    }

    if (matchedMedicines.length === 0) {
      return res.status(404).json({ success: false, message: "No known medicine found in prescription" });
    }

    // Create Prescription document and associate with user
    const prescription = await Prescription.create({
      user: req.id,
      sourceType: "image",
      extractedMedicines: matchedMedicines,
      // Optionally add imageurl if you upload the image somewhere
    });

    // Push prescription ID to user's prescriptions array
    await User.findByIdAndUpdate(req.id, { $push: { prescriptions: prescription._id } });

    res.status(200).json({
      success: true,
      message: "Medicines found in prescription and prescription saved",
      medicines: matchedMedicines,
      prescription
    });

  } catch (error) {
    console.error("Upload Prescription Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
