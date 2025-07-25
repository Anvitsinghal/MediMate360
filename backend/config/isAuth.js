import jwt from "jsonwebtoken"

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.id = decoded.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      message: "Invalid token",
      success: false,
    });
  }
};

export default isAuth;
