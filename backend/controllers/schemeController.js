import Scheme from "../models/scheme.js";
import User from "../models/user.js";
import getDataUri from "../utils/datauri.js";
import { v2 as cloudinary } from "cloudinary";



export const getAllSchemes = async (req, res) => {
  try {
    const allSchemes = await Scheme.find();
    return res.status(200).json({
      message: "All schemes",
      success: true,
      schemes: allSchemes,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ✅ 2. Get Scheme by ID
export const getSchemeById = async (req, res) => {
  try {
    const { id } = req.params; // ✅ must use req.params
    const scheme = await Scheme.findById(id);
      console.log("Fetching scheme ID →", id); 

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Scheme found",
      success: true,
      scheme,
    });
  } catch (error) {
    console.error("Error fetching scheme:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};


// ✅ 3. Create Scheme
export const createScheme = async (req, res) => {
  try {
    const {
      name,
      description,
      benefits,
      eligibility,
      gender,
      states,
      diseasesCovered,
      incomeLimit,
      otherCriteria,
      documentsRequired,
      applyLink,
      helpline,
      isActive,
    } = req.body;

    const schemeImage = req.file;
    let cloudImage = null;

    if (schemeImage) {
      const fileUri = getDataUri(schemeImage);
      const cloudresponse = await cloudinary.uploader.upload(fileUri);
      cloudImage = {
        public_id: cloudresponse.public_id,
        url: cloudresponse.secure_url,
      };
    }

    const newScheme = await Scheme.create({
      name,
      description,
      benefits,
      eligibility,
      gender,
      states,
      diseasesCovered,
      incomeLimit,
      otherCriteria,
      documentsRequired,
      applyLink,
      helpline,
      isActive,
      schemeimage: cloudImage,
    });

    return res.status(201).json({
      message: `${name} created successfully`,
      success: true,
      scheme: newScheme,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

// ✅ 4. Update Scheme
export const updateScheme = async (req, res) => {
  try {
    const { id } = req.params; // ✅ fix: use req.params.id
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
        success: false,
      });
    }

    const {
      name,
      description,
      benefits,
      eligibility,
      gender,
      states,
      diseasesCovered,
      incomeLimit,
      otherCriteria,
      documentsRequired,
      applyLink,
      helpline,
      isActive,
    } = req.body;

    const schemeImage = req.file;
    if (schemeImage) {
      const fileUri = getDataUri(schemeImage);
      const cloudresponse = await cloudinary.uploader.upload(fileUri);
      scheme.schemeimage = {
        public_id: cloudresponse.public_id,
        url: cloudresponse.secure_url,
      };
    }

    // 🔄 Update fields if provided
    if (name) scheme.name = name;
    if (description) scheme.description = description;
    if (benefits) scheme.benefits = benefits;
    if (eligibility) scheme.eligibility = eligibility;
    if (gender) scheme.gender = gender;
    if (states) scheme.states = states;
    if (diseasesCovered) scheme.diseasesCovered = diseasesCovered;
    if (incomeLimit) scheme.incomeLimit = incomeLimit;
    if (otherCriteria) scheme.otherCriteria = otherCriteria;
    if (documentsRequired) scheme.documentsRequired = documentsRequired;
    if (applyLink) scheme.applyLink = applyLink;
    if (helpline) scheme.helpline = helpline;
    if (isActive !== undefined) scheme.isActive = isActive;

    await scheme.save();

    return res.status(200).json({
      message: "Scheme updated successfully",
      success: true,
      scheme,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
export const deleteScheme = async (req, res) => {
  try {
    const { id } = req.params;
    const scheme = await Scheme.findById(id);

    if (!scheme) {
      return res.status(404).json({
        message: "Scheme not found",
        success: false,
      });
    }

   
    if (scheme.schemeimage?.public_id) {
      await cloudinary.uploader.destroy(scheme.schemeimage.public_id);
    }

    await Scheme.findByIdAndDelete(id);

    return res.status(200).json({
      message: "Scheme deleted successfully",
      success: true,
    });
  } catch (error) {
    console.error("Delete scheme error →", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

export const matchSchemesForUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("gender state diseases");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    const matchedSchemes = await Scheme.find({
      isActive: true,
      $or: [
        { gender: user.gender },
        { gender: { $in: ["All", "Other"] } },
      ],
      states: { $in: [user.state] },
      diseasesCovered: { $in: user.diseases },
    });

    return res.status(200).json({
      message: "Matched schemes based on your profile",
      success: true,
      schemes: matchedSchemes,
    });
  } catch (error) {
    console.error("Matching error →", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

