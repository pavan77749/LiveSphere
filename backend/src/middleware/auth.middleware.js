import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        const user = await User.findById(decoded.id).select('-password'); // Exclude password and __v from the user object

        if(!user) {
            return res.status(401).json({ message: 'Unauthorized - User not found' });
        }

        req.user = user; // Attach user to request object for later use
        next(); // Proceed to the next middleware or route handler
    }
    catch (error) {
        console.error('Error in protectRoute middleware:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
}