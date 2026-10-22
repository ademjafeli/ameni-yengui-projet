const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  // 1. Get the Authorization header from the request
  const authHeader = req.header("Authorization");

  // 2. Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  // 3. Extract the token (remove "Bearer ")
  const token = authHeader.split(" ")[1];

  try {
    // 4. Verify token using our JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Attach user payload ({ id: user._id }) to req.user
    req.user = decoded;

    // 6. Proceed to the protected route
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token." });
  }
};

module.exports = authMiddleware;
