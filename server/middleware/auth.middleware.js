import dotenv from 'dotenv';
dotenv.config();
import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
         return res.status(401).json({ error: 'Authorization denied. No token provided.' });
      }

      const token = authHeader.split(' ')[1];

      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(token, secret);

      req.company = decoded;
      
      next(); 
   } catch (error) {
      return res.status(401).json({ error: 'Authorization denied. Invalid or expired token.' });
   }
};
