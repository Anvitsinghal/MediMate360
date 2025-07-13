import Medicine from "../models/Medicine.js";

export const getMedicineInfo = async (req, res) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ success: false, message: "Medicine name is required" });

    const medicine = await Medicine.findOne({ name: { $regex: name, $options: "i" } });
    if (!medicine) return res.status(404).json({ success: false, message: "Medicine not found" });

    res.status(200).json({ success: true, message: "Medicine found", medicine });
  } catch (error) {
    console.error("getMedicineInfo Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getMedicineAlternatives = async (req, res) => {
  try {
    const { composition } = req.query;
    if (!composition) return res.status(400).json({ success: false, message: "Composition is required" });

    const alternatives = await Medicine.find({ composition: { $regex: composition, $options: "i" } });
    res.status(200).json({ success: true, message: "Alternatives found", alternatives });
  } catch (error) {
    console.error("getMedicineAlternatives Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getMedicineBuyLinks = async (req, res) => {
  try {
    const { name } = req.query;
    const medicine = await Medicine.findOne({ name: { $regex: name, $options: "i" } });
    if (!medicine || !medicine.buyLinks) {
      return res.status(404).json({ success: false, message: "No buy links found for this medicine" });
    }

    res.status(200).json({ success: true, message: "Buy links found", buyLinks: medicine.buyLinks });
  } catch (error) {
    console.error("getMedicineBuyLinks Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const checkMedicineRelevance = async (req, res) => {
  try {
    const { name, disease } = req.query;

    // --- FIX START ---
    // 1. Validate that 'name' and 'disease' query parameters are provided
    if (!name) {
      return res.status(400).json({ success: false, message: "Medicine name ('name') query parameter is required." });
    }
    if (!disease) {
      return res.status(400).json({ success: false, message: "Disease name ('disease') query parameter is required." });
    }
    // --- FIX END ---

    // Ensure 'name' is treated as a string for the regex
    // Although req.query parameters are usually strings, explicit conversion or validation is safer.
    const medicine = await Medicine.findOne({ name: { $regex: String(name), $options: "i" } });

    if (!medicine || !medicine.diseases) {
      return res.status(404).json({ success: false, message: "Medicine not found or it has no associated disease data." });
    }

    // Ensure 'disease' is treated as a string for comparison
    const targetDisease = String(disease).toLowerCase();
    const isRelevant = medicine.diseases.some(d => String(d).toLowerCase() === targetDisease);

    const relevance = isRelevant ? 90 : 30; // Your logic for relevance score

    res.status(200).json({ success: true, relevance: `${relevance}%` });
  } catch (error) {
    console.error("checkMedicineRelevance Error:", error);
    // For debugging, you might temporarily send the error message directly
    // res.status(500).json({ success: false, message: "Internal server error", debugError: error.message });
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const addMedicine = async (req, res) => {
  try {
    let {
      name,
      composition,
      description,
      uses,
      dosage,
      storageInstructions,
      type,
      isGeneric,
      isPrescriptionRequired,
      price
    } = req.body;

    // Parse arrays that came as JSON strings
    const sideEffects = JSON.parse(req.body.sideEffects || "[]");
    const precautions = JSON.parse(req.body.precautions || "[]");
    const diseases = JSON.parse(req.body.diseases || "[]");
    const alternatives = JSON.parse(req.body.alternatives || "[]");
    const manufacturers = JSON.parse(req.body.manufacturers || "[]");
    const buyLinks = JSON.parse(req.body.buyLinks || "[]");

    if (!name || !composition) {
      return res.status(400).json({ success: false, message: "Name and composition are required" });
    }

    const existing = await Medicine.findOne({ name });
    if (existing) {
      return res.status(409).json({ success: false, message: "Medicine already exists" });
    }

    const medicine = await Medicine.create({
      name,
      composition,
      description,
      uses,
      dosage,
      sideEffects,
      precautions,
      storageInstructions,
      type,
      isGeneric,
      isPrescriptionRequired,
      diseases,
      alternatives,
      manufacturers,
      price,
      buyLinks,
    });

    res.status(201).json({ success: true, message: "Medicine added", medicine });
  } catch (error) {
    console.error("addMedicine Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const searchMedicines = async (req, res) => {
  try {
    const { query } = req.query;
    const results = await Medicine.find({ name: { $regex: query, $options: "i" } }).limit(10);

    res.status(200).json({ success: true, results });
  } catch (error) {
    console.error("searchMedicines Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
