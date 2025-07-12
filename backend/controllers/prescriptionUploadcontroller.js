import Medicine from "../models/medicine.js";
import { extractTextFromImage } from "../utils/ocr.js";
import { Prescription } from "../models/Prescription.js";
import User from "../models/user.js";
import cloudinary from 'cloudinary';
import getDataUri from "../utils/datauri.js";

// Configure Cloudinary if credentials are available
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
}

export const uploadPrescriptionAndExtract = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    let imageUrl = '';

    // Upload to Cloudinary only if configured
    if (process.env.CLOUDINARY_CLOUD_NAME) {
      try {
        const dataUri = getDataUri(file);
        const cloudinaryUploadResult = await cloudinary.v2.uploader.upload(dataUri.content, {
          folder: "prescription_uploads",
        });
        imageUrl = cloudinaryUploadResult.secure_url;
      } catch (uploadError) {
        console.error("Cloudinary Upload Error:", uploadError);
        // Continue without image URL if Cloudinary fails
      }
    }

    // OCR
    const text = await extractTextFromImage(file.buffer);
    console.log("Extracted text:", text); // Debug log
    
    const extractedLines = text.split("\n").map(line => line.trim()).filter(line => line.length > 2);
    console.log("Extracted lines:", extractedLines); // Debug log

    // Filter probable medicine names
    const allMedicines = await Medicine.find();
    console.log("Available medicines in DB:", allMedicines.map(m => m.name)); // Debug log
    const matchedMedicines = [];

    for (let line of extractedLines) {
      for (let med of allMedicines) {
        // More flexible matching - check if medicine name appears anywhere in the line
        if (line.toLowerCase().includes(med.name.toLowerCase())) {
          matchedMedicines.push({ name: med.name });
          break;
        }
        // Also check if any part of the medicine name appears in the line
        const medWords = med.name.toLowerCase().split(' ');
        for (let word of medWords) {
          if (word.length > 2 && line.toLowerCase().includes(word)) {
            matchedMedicines.push({ name: med.name });
            break;
          }
        }
      }
    }

    console.log("Matched medicines:", matchedMedicines); // Debug log

    // Create Prescription document and associate with user
    const prescription = await Prescription.create({
      user: req.id,
      sourceType: "image",
      imageurl: imageUrl,
      extractedMedicines: matchedMedicines,
    });

    // Push prescription ID to user's prescriptions array
    await User.findByIdAndUpdate(req.id, { $push: { prescriptions: prescription._id } });

    res.status(200).json({
      success: true,
      message: matchedMedicines.length > 0 
        ? "Medicines found in prescription and prescription saved" 
        : "Prescription uploaded but no known medicines found",
      medicines: matchedMedicines,
      prescription,
      extractedText: text // For debugging
    });

  } catch (error) {
    console.error("Upload Prescription Error:", error);
    res.status(500).json({ 
      success: false, 
      message: "Internal server error",
      error: error.message 
    });
  }
};