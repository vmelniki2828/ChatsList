import React, { useState } from 'react';
import chatData from './results.json';
import chatData_5K from './results_5K'

const ChatRecord = ({ record, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const points = [25, 10, 20, 10, 35];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <button onClick={toggleOpen}>
        {isOpen ? 'Скрыть' : 'Показать'} чат {index + 1}
      </button>
      {isOpen && (
        <div>
          <p>{record.chat}</p>
          <div style={{ display: 'flex' }}>
            {record.ans.map((ans, index) => (
              <span key={index}>
                {ans ? 'true' : 'false'}
                {index !== record.ans.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
          {(() => {
            let totalPoints = 0;
            for (let i = 0; i < record.ans.length; i++) {
              if (!record.ans[i]) {
                totalPoints += points[i];
              }
            }
            return <p>{totalPoints}</p>;
          })()}
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div>
      {chatData_5K.map((record, index) => (
        <ChatRecord key={index} record={record} index={index} />
      ))}
    </div>
  );
};
