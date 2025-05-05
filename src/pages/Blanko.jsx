import { useState, useEffect } from 'react';
import { Button, Input, Row, Col } from 'antd';
import './Blanko.css';

export const strs = [
  'the fat cats',
  'larger frogs',
  'banana cakes',
  'unsw vs usyd',
  'french toast',
  'hawaii pizza',
  'barack obama',
];

function Blanko() {
  const [currentString, setCurrentString] = useState('');
  const [hiddenIndices, setHiddenIndices] = useState([]);
  const [inputs, setInputs] = useState(['', '', '']);
  const [gamesWon, setGamesWon] = useState(() => {
    const stored = localStorage.getItem('gamesWon');
    return stored ? parseInt(stored) : 0;
  });

  const startNewGame = () => {
    const randomIndex = Math.floor(Math.random() * strs.length);
    const chosenString = strs[randomIndex];
    setCurrentString(chosenString);

    const nonSpaceIndices = [];
    for (let i = 0; i < chosenString.length; i++) {
      if (chosenString[i] !== ' ') {
        nonSpaceIndices.push(i);
      }
    }

    const newHiddenIndices = [];
    while (newHiddenIndices.length < 3 && nonSpaceIndices.length > 0) {
      const randIndex = Math.floor(Math.random() * nonSpaceIndices.length);
      newHiddenIndices.push(nonSpaceIndices[randIndex]);
      nonSpaceIndices.splice(randIndex, 1);
    }

    setHiddenIndices(newHiddenIndices.sort((a, b) => a - b));
    setInputs(['', '', '']);
  };

  useEffect(() => {
    startNewGame();
  }, []);

  const handleInputChange = (index, value) => {
    if (value.length <= 1) {
      const newInputs = [...inputs];
      newInputs[index] = value;
      setInputs(newInputs);

      if (value && newInputs.every(input => input !== '')) {
        const isCorrect = hiddenIndices.every((hiddenIndex, i) => 
          newInputs[i].toLowerCase() === currentString[hiddenIndex].toLowerCase()
        );

        if (isCorrect) {
          const newScore = gamesWon + 1;
          setGamesWon(newScore);
          localStorage.setItem('gamesWon', newScore.toString());
          alert('Correct!');
          startNewGame();
        }
      }
    }
  };

  return (
    <div className="blanko-container">
      <Row gutter={[10, 10]} justify="center" className="squares-container">
        {currentString.split('').map((char, index) => {
          const inputIndex = hiddenIndices.indexOf(index);
          return (
            <Col key={index} className="character-square">
              {hiddenIndices.includes(index) ? (
                <Input
                  maxLength={1}
                  value={inputs[inputIndex]}
                  onChange={(e) => handleInputChange(inputIndex, e.target.value)}
                  className="character-input"
                />
              ) : (
                <span>{char}</span>
              )}
            </Col>
          );
        })}
      </Row>
      <Button type="primary" onClick={startNewGame} className="reset-game-button">
        Reset Game
      </Button>
    </div>
  );
}

export default Blanko;