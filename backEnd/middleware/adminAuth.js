/*import jwt from 'jsonwebtoken';

const adminAuth = async(req,res,next)=>{
    try{

        const {token} = req.headers
        if(!token){
            return res.json({sucess:false,message:"Not autharized! login again"})
        }
        const tokenDecode = jwt.verify(token,process.env.JWT_SECRET);
        if(tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD){
            return res.json({sucess:false,message:"Not Aurthorized Login Again"})
        }
        next()
    }catch(error){
        console.log(error);
        res.json({sucess:false,message:error.message})
    }
}

export default adminAuth;*/

import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.isAdmin) {
      return res.json({
        success: false,
        message: "Admin access required",
      });
    }

    req.admin = decoded; // optional but useful
    next();

  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid or Expired Token",
    });
  }
};

export default adminAuth;
