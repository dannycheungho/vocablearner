const admin = require('firebase-admin');
const serviceAccount = require('../vocablearner.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DB_URL
});


const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true });

module.exports = { admin, db }; 