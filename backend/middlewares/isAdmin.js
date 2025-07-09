import User from "../models/user.js";


export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);

    if (!user || !user.isAdmin) {
      return res.status(403).json({
        message: "Access denied: Admins only",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.error("isAdmin middleware error:", error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};
