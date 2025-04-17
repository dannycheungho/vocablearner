// middleware/validationMiddleware.js
const validate = (schema) => (req, res, next) => {
    const errors = [];
    
    // Validate body
    if (schema) {
      for (const [key, rule] of Object.entries(schema)) {
        const value = req.body[key];
        
        if (rule.optional && !value) continue;
        
        if (!value && !rule.optional) {
          errors.push(`${key} is required`);
          continue;
        }
        
        if (rule.type && typeof value !== rule.type) {
          errors.push(`${key} must be a ${rule.type}`);
        }
        
        if (rule.min && value.length < rule.min) {
          errors.push(`${key} must be at least ${rule.min} characters`);
        }
        
        if (rule.max && value.length > rule.max) {
          errors.push(`${key} must be at most ${rule.max} characters`);
        }
        
        if (rule.pattern && !rule.pattern.test(value)) {
          errors.push(`${key} format is invalid`);
        }
      }
    }
    
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    next();
  };
  
  module.exports = validate;