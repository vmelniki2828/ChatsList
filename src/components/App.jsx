import React, { useState } from 'react';
//import chatData from './results.json';
// import chatData_5K from './results_5K';
import chatData_100K from './results_100K';
import chatData_100K_2 from './results_100K_2'


console.log(chatData_100K_2)
const ChatRecord = ({ record, index }) => {

  const [isOpen, setIsOpen] = useState(false);
  const points = [25, 10, 20, 10, 35];

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Calculate totalPoints at the beginning
  let totalPoints = 0;
  for (let i = 0; i < record.ans.length; i++) {
    if (!record.ans[i]) {
      totalPoints += points[i];
    }
  }

  return (
    <div>
      <button onClick={toggleOpen} style={{ color: totalPoints < 100 ? 'red' : 'green' }}>
        {isOpen ? 'Скрыть' : 'Показать'} чат {index + 1}
      </button>
      {isOpen && (
        <div>
          <p>{record.chat}</p>
          <div style={{ display: 'flex' }}>
            {record.ans.map((ans, idx) => (
              <span key={idx}>
                {ans ? 'true' : 'false'}
                {idx !== record.ans.length - 1 && <span>, </span>}
              </span>
            ))}
          </div>
          <p>{totalPoints}</p>
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div>
      {chatData_100K.map((record, index) => (
        <ChatRecord key={index} record={record} index={index} />
      ))}
      {chatData_100K_2.map((record, index) => (
        <ChatRecord key={index} record={record} index={index} />
      ))}
    </div>
  );
};