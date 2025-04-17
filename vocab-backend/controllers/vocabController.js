const { db } = require('../config/firebase-admin');
/**
 * Get all vocabs for authenticated user
 */
exports.getUserVocabs = async (req, res) => {
    try {
      const { date } = req.query;
      const userId = req.user.uid; // From auth middleware
      
      let query = db.collection('vocabs')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc');
  
      if (date) {
        query = query.where('date', '==', date);
      }
  
      const snapshot = await query.get();
      const vocabs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
  
      res.json(vocabs);
    } catch (err) {
      console.error('Error getting vocabs:', err);
      res.status(500).json({ error: 'Failed to fetch vocabulary' });
    }
  };
  
  /**
   * Add new vocabulary word
   */
  exports.addVocab = async (req, res) => {
    try {
      const { english, chinese, date } = req.body;
      const userId = req.user.uid;
  
      if (!english || !chinese) {
        return res.status(400).json({ error: 'Missing required fields' });
      }
  
      const newVocab = {
        english,
        chinese,
        date: date || new Date().toISOString().split('T')[0],
        userId,
        createdAt: new Date().toISOString(),
        lastReviewed: null,
        rememberLevel: 0
      };
  
      const docRef = await db.collection('vocabs').add(newVocab);
      
      res.status(201).json({ 
        id: docRef.id,
        ...newVocab 
      });
    } catch (err) {
      console.error('Error adding vocab:', err);
      res.status(500).json({ error: 'Failed to add vocabulary' });
    }
  };
  
  /**
   * Update vocabulary word
   */
  exports.updateVocab = async (req, res) => {
    try {
      const { id } = req.params;
      const { english, chinese, rememberLevel } = req.body;
      const userId = req.user.uid;
  
      const vocabRef = db.collection('vocabs').doc(id);
      const doc = await vocabRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
  
      if (doc.data().userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      const updates = {
        english: english || doc.data().english,
        chinese: chinese || doc.data().chinese,
        rememberLevel: rememberLevel !== undefined ? rememberLevel : doc.data().rememberLevel,
        lastReviewed: new Date().toISOString()
      };
  
      await vocabRef.update(updates);
      
      res.json({ 
        id,
        ...updates 
      });
    } catch (err) {
      console.error('Error updating vocab:', err);
      res.status(500).json({ error: 'Failed to update vocabulary' });
    }
  };
  
  /**
   * Delete vocabulary word
   */
  exports.deleteVocab = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.uid;
  
      const vocabRef = db.collection('vocabs').doc(id);
      const doc = await vocabRef.get();
  
      if (!doc.exists) {
        return res.status(404).json({ error: 'Vocabulary not found' });
      }
  
      if (doc.data().userId !== userId) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
  
      await vocabRef.delete();
      
      res.json({ 
        message: 'Vocabulary deleted successfully',
        id 
      });
    } catch (err) {
      console.error('Error deleting vocab:', err);
      res.status(500).json({ error: 'Failed to delete vocabulary' });
    }
  };