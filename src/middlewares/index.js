const { HttpError } = require("../error");
const {errorHandler} = require("../util");
const jwt = require("jsonwebtoken");
const models = require("../models");

const verifyRole = (expectedRole) => {
  return errorHandler(async (req, res, next) => {
    try {
      // Call the verifyAccessToken middleware to verify the access token
      verifyAccessToken(req, res, () => {});


      
      // Retrieve the user's role from the user document
      const userDocument = await models.User.findById(req.userId).exec();
      const userRoles = userDocument.roles;
      
      const roleDocument = await models.Roles.findById(userRoles[0]).exec();
      const rolePermissions = roleDocument.permissions;
      for (const permission of rolePermissions) {
        // Check if the user's role matches the expected role
        if (permission === expectedRole || permission === '3') {
          next(); // Proceed to the next middleware
          return; // Exit the loop and the function
        }
      }
      
      throw new HttpError(403, 'Role mismatch'); // Throw an error for role mismatch
      
    } catch (error) {
      throw new HttpError(401, 'Unauthorized'); // Pass the caught error to the next error handling middleware
    }
  });
};


const verifyAccessToken = errorHandler(async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        throw new HttpError(401, 'Unauthorized');
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.userId = decodedToken.userId;
        next();
    } catch (e) {
        throw new HttpError(401, 'Unauthorized');
    }
});

module.exports = {
    verifyAccessToken,
    verifyRole
};