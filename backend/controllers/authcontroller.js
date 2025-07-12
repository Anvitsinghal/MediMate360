import jwt from "jsonwebtoken";
import User from "../models/user.js"
import bcrypt from "bcryptjs";
import  {Prescription}  from "../models/Prescription.js";
import Reminder from "../models/Reminder.js";
import Scheme from "../models/scheme.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"; 



export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Enter all details",
        success: false,
      });
    }

    const emailcheck = await User.findOne({ email });
    if (emailcheck) {
      return res.status(409).json({
        message: "User already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Enter all details",
        success: false,
      });
    }

    const user = await User.findOne({ email })
      .populate("prescriptions")
      .populate("reminders")
      .populate("matchedSchemes");
    if (!user) {
      return res.status(401).json({
        message: "Account not created for this email",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // Remove password from user object
    const { password: pwd, ...safeUser } = user.toObject();

    return res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        message: `Welcome back ${user.name}`,
        success: true,
        user: safeUser,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = async (_, res) => {
  try {
   return res.cookie("token", "", {
  httpOnly: true,
  sameSite: "None",
  maxAge: 0
}).json({
  message: "Logged out successfully.",
  success: true,
});
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
const userr = await User.findById(req.id)
  .select("-password")
  .populate("prescriptions")
  .populate("reminders")
  .populate("matchedSchemes");

    return res.status(200).json({
      message: "User found",
      success: true,
      user:userr,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

 
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { age, gender, state } = req.body;
    const profilepicture = req.file;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (profilepicture) {
      const fileUri = getDataUri(profilepicture);
      const cloudresponse = await cloudinary.uploader.upload(fileUri.content); 
      user.profilepicture = {
        public_id: cloudresponse.public_id,
        url: cloudresponse.secure_url,
      };
    }

    if (age) user.age = age;
    if (gender) user.gender = gender;
    if (state) user.state = state;

    await user.save();

    return res.status(200).json({
      message: "Profile updated",
      success: true,
      user,
    });

  } catch (error) {
  console.error("Update Error →", error); // 👈 clearer logging
  return res.status(500).json({
    message: "Internal Server Error",
    success: false,
    error: error.message, // 👈 useful during debugging
  });
}

};


export const deleteUser = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

   
    await Prescription.deleteMany({ user: userId });

    
    await Reminder.deleteMany({ user: userId });

    await User.findByIdAndDelete(userId);

    return res
      .cookie("token", "", { maxAge: 0 })
      .status(200)
      .json({
        message: "User and all related data deleted successfully",
        success: true,
      });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};


  