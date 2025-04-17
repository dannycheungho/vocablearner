const VocabCard = ({ vocab, rememberMode }) => {
    return (
      <div className="vocab-card">
        <div className="english">{vocab.english}</div>
        <div className={`chinese ${rememberMode ? 'hidden' : ''}`}>
          {vocab.chinese}
        </div>
      </div>
    );
  };
  
  export default VocabCard;