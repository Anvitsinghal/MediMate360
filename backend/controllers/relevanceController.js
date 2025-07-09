import Medicine from "../models/medicine.js";

export const checkRelevanceAI = async (req, res) => {
  try {
    const { disease, name } = req.query;

    if (!disease || !name) {
      return res.status(400).json({ success: false, message: "Disease and medicine name are required" });
    }

    const medicine = await Medicine.findOne({ name: { $regex: name, $options: "i" } });

    if (!medicine) {
      return res.status(404).json({ success: false, message: "Medicine not found" });
    }

    const diseaseLower = disease.toLowerCase();
    let score = 0;

    if (medicine.diseases?.length) {
      const directMatch = medicine.diseases.find(d => d.toLowerCase() === diseaseLower);
      const partialMatch = medicine.diseases.find(d => d.toLowerCase().includes(diseaseLower));

      if (directMatch) score = 95;
      else if (partialMatch) score = 70;
      else score = 30;
    } else {
      score = 20;
    }

    return res.status(200).json({
      success: true,
      relevance: `${score}%`,
      message: `${name} is ${score}% relevant to ${disease}`
    });

  } catch (error) {
    console.error("checkRelevanceAI Error:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
