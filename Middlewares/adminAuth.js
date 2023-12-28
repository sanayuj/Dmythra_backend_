const jwt = require("jsonwebtoken");
const adminModel = require("../Model/adminModel");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const authtoken = authHeader.replace(/^Bearer\s+/i, "");
    if (!authtoken)
      return res.json({
        loginfail: true,
        status: false,
        message: "NO auth token",
      });

    const decoded = jwt.verify(authtoken, "adminJWT");
    const admin = await adminModel.findOne({ _id: decoded.id });
    if (!admin)
      return res.json({
        loginfail: true,
        status: false,
        message: "Unauthorized token",
      });
    req.admin = admin;

    next();
  } catch (error) {
    return res.json({
      message: "Unauthorized access",
      status: false,
      loginFail: true,
    });
  }
};
