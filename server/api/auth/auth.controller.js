import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import models from '../../core/models.index.js';

export const loginCompany = async (req, res) => {
   try {
      const { email, password } = req.body;

      if (!email || !password) {
         return res.status(400).json({ error: 'Email and password are required' });
      }

      const company = await models.Company.findOne({ where: { email } });
      if (!company) {
         return res.status(401).json({ error: 'Invalid email or password' });
      }

      const isMatch = await bcrypt.compare(password, company.password);
      if (!isMatch) {
         return res.status(401).json({ error: 'Invalid email or password' });
      }

      const secret = process.env.JWT_SECRET;
      
      const token = jwt.sign(
         { id: company.id, email: company.email },
         secret,
         { expiresIn: '7d' }
      );

      const companyData = company.toJSON();
      delete companyData.password;
      
      return res.status(200).json({
         message: 'Login successful',
         token,
         company: companyData
      });
   } catch (error) {
      console.error("Login Error:", error);
      return res.status(500).json({ error: 'Internal Server Error during login' });
   }
};
export const logoutCompany = async (req, res) => {
   try {
      return res.status(200).json({ message: 'Logout successful' });
   } catch (error) {
      console.error("Logout Error:", error);
      return res.status(500).json({ error: 'Internal Server Error during logout' });
   }
};
