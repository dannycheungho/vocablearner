import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

import CalendarSidebar from '../components/CalendarSidebar';
import VocabInput from '../components/VocabInput';
import VocabList from '../components/VocabList';
import api from '../api';

const Dashboard = () => {
  const [vocabs, setVocabs] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rememberMode, setRememberMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  // Fetch vocabs for selected date
  useEffect(() => {
    const fetchVocabs = async () => {
      setIsLoading(true);
      try {
        const dateStr = selectedDate.toISOString().split('T')[0];
        const response = await api.getVocabs(dateStr);
        setVocabs(response.data);
      } catch (error) {
        console.error('Error fetching vocabs:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchVocabs();
  }, [selectedDate]);

  const handleAddVocab = async (newVocab) => {
    try {
      const response = await api.addVocab({
        ...newVocab,
        date: selectedDate.toISOString().split('T')[0]
      });
      setVocabs([...vocabs, response.data]);
    } catch (error) {
      console.error('Error adding vocab:', error);
    }
  };

  const handleDeleteVocab = async (vocabId) => {
    try {
      await api.deleteVocab(vocabId);
      setVocabs(vocabs.filter(vocab => vocab.id !== vocabId));
    } catch (error) {
      console.error('Error deleting vocab:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="app-container">
      {/* Header now outside the dashboard flex container */}
      <header className="header">
        <h1>Vocabulary App</h1>
        <button 
          onClick={handleLogout} 
          className="logout-btn"
        >
          Logout
        </button>
      </header>

      <div className="dashboard">
        <CalendarSidebar 
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
        
        <div className="main-content">
          <div className="toolbar">
            <button 
              onClick={() => setRememberMode(!rememberMode)}
              className="remember-btn"
            >
              {rememberMode ? 'Show Meanings' : 'Remember Mode'}
            </button>
          </div>

          <VocabInput onAddVocab={handleAddVocab} />
          
          {isLoading ? (
            <div className="loading">Loading vocabulary...</div>
          ) : (
            <VocabList 
              vocabs={vocabs} 
              rememberMode={rememberMode}
              onDelete={handleDeleteVocab}
            />
          )}
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;