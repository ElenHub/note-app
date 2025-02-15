import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log('Error in protectRoute middleware: ', error.message);
        res.status(401).json({ error: 'Unauthorized - Invalid Token' });
    }
};

export default protectRoute;

// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const protectRoute = async (req, res, next) => {
//     try {
//         const token = req.cookies.jwt; // Get token from cookies
//         if (!token) {
//             return res.status(401).json({ error: 'Unauthorized - No Token Provided' });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.userId).select('-password');
//         if (!user) {
//             return res.status(404).json({ error: 'User not found' });
//         }

//         req.user = user; // Attach user to request object
//         next(); // Proceed to the next middleware
//     } catch (error) {
//         console.log('Error in protectRoute middleware: ', error.message);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

// export default protectRoute;