const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  console.log(req.headers.authorization, "protect middleware");

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //Get token from header
      token = req.headers.authorization.split(" ")[1];

      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user from token,here it is from decoded and not password
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error, "catch error");
      res.status(401);
      throw new Error("Not authorized");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized ,no token");
  }
});

module.exports = { protect };

// module.exports = async(req,res,next)=>{
//     try {
//         const token = req.headers["authorization"].split("")[1];
//         jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//             if(err)
//             {
//                 //if token invalid or expired
//                 return res.status(401).send({
//                     message:"auth failed no token",
//                     success:false
//                 });
//             }else{
//                 //whenever api request is called we will attach the userid based on token decription
//                 req.body.userId = decoded._id;
//                 next();
//             }

//     });
//     } catch (error) {
//         return res.status(401).send({
//             message:"authfailed catch error",
//             success:false
//         });
//     }
// };
