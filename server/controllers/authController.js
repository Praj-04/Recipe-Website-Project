const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { error, success } = require("../utils/responseWrapper");

const signupController = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      
    
       return res.send(error(400,'name,email and Password fields are required'));
    }

    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.send(error(409,'User already registered, try using another email'));
    }

    //the password should be decrypted before adding to db
    //we will be hasing using installing bcrypt library  => npm i bcrypt

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ name,email, password: hashedPassword });

    const newUser = await User.findById(user._id);

    // return res.status(201).json({
    //   user,
    // });

   return res.send(success(201, 'user created successfully'))

  } catch (e) {
    return res.send(error(500,e.message))
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
            return res.send(error(400, "Email and password fields are required"));
     
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.send(
        error(404, "User is not registered! Click the link below to sign up!")
      );
    }

    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return res.send(error(403, "Password incorrect!"));
    }

    const accessToken = generateAccessToken({
      _id: user._id,
    });

    const refreshToken = generateRefreshToken({
      _id: user._id,
    });

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
    });

    // return res.status(200).json({
    //   accessToken,
    // });

   return res.send(success(200,{accessToken}))
  }  catch (e) {
    return res.send(error(500,e.message))
  }
};


//logout -> clearCookie is used to remove refresh token from the cookie
const logOutController = async(req,res)=>{
  try {
    res.clearCookie("jwt",  {
      httpOnly: true,
      secure: true,
    });
    return res.send(success(200,'logged out!'))

  } catch (e) {
    return res.send(error(500,e.message))
  }
  


}



//check if the refresh token is expired,if yes..user has to login again. If refreshToken not expired, the create a new access token
const refreshAccessTokenController = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.send(error(401, "refresh token is required"));
    // return res.status(401).send("refresh token is required");
  }

  const refreshToken = cookies.jwt;

  try {
    const decoded = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_PRIVATE_KEY
    );

    const _id = decoded._id;
    const accessToken = generateAccessToken({ _id });
    // return res.status(201).json({ accessToken });
    return res.send(success(201,{ accessToken }));

  } catch (e) {
    console.log(e);
    
    return res.send(error(401, "Invalid refresh token or refresh token expired"));
    
  }
};

//internal function ==> creating access token to be sent to the client side..this no need to make it async,generates quickly
const generateAccessToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_PRIVATE_KEY, {
      expiresIn: "1d",
    });
    //  console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

const generateRefreshToken = (data) => {
  try {
    const token = jwt.sign(data, process.env.REFRESH_TOKEN_PRIVATE_KEY, {
      expiresIn: "1y",
    });
    //  console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signupController,
  loginController,
  logOutController,
  refreshAccessTokenController,
};
