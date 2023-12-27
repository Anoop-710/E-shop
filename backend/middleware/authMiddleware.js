import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// 2 functions in this file, PROTECT the routes which users are registered and ADMIN middleware functions for the user that are admins

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  // the next parameter says ok we are done here, move on to next middleware
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt;
  // req.cookies.jwt , jwt since jwt is the name used in "userController.js" file in res.cookie

  if (token) {
    try {
      // decode the token to get the user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Now decoded is an object that has userId field
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
};

export { protect, admin };
