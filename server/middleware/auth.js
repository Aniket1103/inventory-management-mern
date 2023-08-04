import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ success: false, message: "User is not Logged in." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded._id);

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//isAuthorisedtoAddInventory : for checking if the user has access to creating inventory item
//either manager or assistant approved by the manager has access




//isManger : for checking of the user has manager role
export const isManager = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "User is not authenticated." });
    }

    if (req.user.role === "Manager") {
      next();
    } else {
      return res.status(403).json({ success: false, message: "User is not authorized as a Manager." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};