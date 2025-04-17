import { useState } from 'react';

const VocabInput = ({ onAddVocab }) => {
  const [english, setEnglish] = useState('');
  const [chinese, setChinese] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!english.trim() || !chinese.trim()) return;
    
    onAddVocab({ english, chinese });
    setEnglish('');
    setChinese('');
  };

  return (
    <form onSubmit={handleSubmit} className="vocab-input">
      <input
        type="text"
        placeholder="English word"
        value={english}
        onChange={(e) => setEnglish(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Chinese meaning"
        value={chinese}
        onChange={(e) => setChinese(e.target.value)}
        required
      />
      <button type="submit">Add Vocabulary</button>
    </form>
  );
};

export default VocabInput;