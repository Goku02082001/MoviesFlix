import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();

const authMiddelware = (req, res, next) => {

  let token = req.headers.authorization.split(" ")[1];
  console.log("token",token)
  try {
    
    
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Add user from payload
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddelware;