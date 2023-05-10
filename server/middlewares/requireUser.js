const jwt = require("jsonwebtoken");
const { error } = require("../utils/responseWrapper");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  if (
    !req.headers ||
    !req.headers.authorization ||
    !req.headers.authorization.startsWith("Bearer")
  ) {
    return res.send(error(401, "Authorization header is  required"));
  }
// console.log(req.headers);
  const accessToken = req.headers.authorization.split(" ")[1] //here we are splitting bearer and access token by space and getting the index 1..i.e access token

  // console.log(accessToken);

  try {
    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req._id = decoded._id; //we are taking id from the decode ,.it can be passed to next function.while encoding we used id

    const user = User.findById(req._id);
    if (!user) {
      res.send(error(404, "User not found!"));
    }

    next();
  } catch (e) {
    console.log(e);
    return res.send(error(401, "Invalid access token or access token expired"));
    // return res.status(401).send("Invalid access token or access token expired");
  }
};
