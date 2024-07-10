import React, { useState, useEffect, useMemo } from 'react';
import chatData_100K from './results_100K';

const ChatRecord = ({ record, index, points }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  let totalPoints = 0;
  for (let i = 0; i < record.ans.length; i++) {
    if (!record.ans[i]) {
      totalPoints += points[i];
    }
  }

  const getColor = (points) => {
    if (points >= 100) return 'green';
    if (points >= 50) return 'orange';
    return 'red';
  };

  return (
    <div>
      <button onClick={toggleOpen} style={{ color: getColor(totalPoints) }}>
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
  const points = useMemo(() => [25, 10, 20, 10, 35], []);

  const [greenCount, setGreenCount] = useState(0);
  const [orangeCount, setOrangeCount] = useState(0);
  const [redCount, setRedCount] = useState(0);

  useEffect(() => {
    let green = 0;
    let orange = 0;
    let red = 0;

    chatData_100K.forEach((record) => {
      let totalPoints = 0;
      for (let i = 0; i < record.ans.length; i++) {
        if (!record.ans[i]) {
          totalPoints += points[i];
        }
      }

      if (totalPoints >= 100) green++;
      else if (totalPoints >= 50) orange++;
      else red++;
    });

    setGreenCount(green);
    setOrangeCount(orange);
    setRedCount(red);
  }, [points]);

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <p>Зеленых чатов: {greenCount}</p>
        <p>Оранжевых чатов: {orangeCount}</p>
        <p>Красных чатов: {redCount}</p>
      </div>
      {chatData_100K.map((record, index) => (
        <ChatRecord key={index} record={record} index={index} points={points} />
      ))}
    </div>
  );
};