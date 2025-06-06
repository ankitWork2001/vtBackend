
export const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {

    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required to access this resource.' });
    }
    const userRole = req.user.role;
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }

    next();
  };
};

//Import it your file 
// import { verifyToken } from '../middleware/authMiddleware.js';
// import { authorizeRoles } from '../middleware/roleMiddleware.js';


//how to use middleware
//this will allow only admin
//router.get('/', verifyToken, authorizeRoles('admin' ), getAllTestimonials);