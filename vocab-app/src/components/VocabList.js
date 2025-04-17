const VocabList = ({ vocabs, rememberMode, onDelete }) => {
    return (
      <div className="vocab-list">
        {vocabs.length === 0 ? (
          <p className="no-vocabs-message">No vocabulary added for this day yet.</p>
        ) : (
          vocabs.map((vocab) => (
            <div key={vocab.id} className="vocab-card">
              <div className="vocab-content">
                <div className="english">{vocab.english}</div>
                <div className={`chinese ${rememberMode ? 'hidden' : ''}`}>
                  {vocab.chinese}
                </div>
              </div>
              <button 
                onClick={() => onDelete(vocab.id)} 
                className="delete-btn"
                aria-label={`Delete ${vocab.english}`}
                title="Delete this word"
              >
                &times;
              </button>
            </div>
          ))
        )}
      </div>
    );
  };
  
  export default VocabList;