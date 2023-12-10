

// validators.js
const { check, validationResult } = require('express-validator');

const createUserValidator = [
  // Validation checks for creating a user
  check('name').isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),
  check('email').isEmail().withMessage('Invalid email address'),
  check('mobile').isMobilePhone().withMessage('Invalid mobile number'),
  check('addresses').not().isEmpty().withMessage('address required'),

  check('role').not().isEmpty().withMessage("role is required"),
  check('password').isLength({ min: 6 }).not().withMessage("password must be 6 character long").isEmpty().withMessage("password required"),
];

const handleValidationErrors = (req, res, next) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createUserValidator,
  handleValidationErrors,
};

