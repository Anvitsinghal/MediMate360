import Medicine from "../models/medicine.js";

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
    const medicine = await Medicine.findOne({ name: { $regex: name, $options: "i" } });

    if (!medicine || !medicine.diseases) {
      return res.status(404).json({ success: false, message: "Medicine or disease data not found" });
    }

    const isRelevant = medicine.diseases.some(d => d.toLowerCase() === disease.toLowerCase());
    const relevance = isRelevant ? 90 : 30;

    res.status(200).json({ success: true, relevance: `${relevance}%` });
  } catch (error) {
    console.error("checkMedicineRelevance Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const addMedicine = async (req, res) => {
  try {
    const { name, composition, dosage, uses, sideEffects, buyLinks, diseases } = req.body;

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
      dosage,
      uses,
      sideEffects,
      buyLinks,
      diseases
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
