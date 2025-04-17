const { admin } = require('../config/firebase-admin');

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('Missing token');
    
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = { 
      uid: decoded.uid, 
      email: decoded.email 
    };
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: 'Invalid authentication' });
  }
};

module.exports = authenticate;