import React, { useState, useEffect, useRef } from 'react';
import './SlidoGame.css';

// 假设这些图片已经在assets文件夹中
import shrek1 from '../../assets/1.png';
import shrek2 from '../../assets/2.png';
import shrek3 from '../../assets/3.png';
import shrek4 from '../../assets/4.png';
import shrek5 from '../../assets/5.png';
import shrek6 from '../../assets/6.png';
import shrek7 from '../../assets/7.png';
import shrek8 from '../../assets/8.png';

function SlidoGame() {
  // 定义图片数组 - 这是正确的顺序
  const images = [shrek1, shrek2, shrek3, shrek4, shrek5, shrek6, shrek7, shrek8, null];
  
  // 游戏状态
  const [board, setBoard] = useState([]);
  const [emptyCell, setEmptyCell] = useState(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  
  // 用于键盘控制的ref
  const gridRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  // 调试用的打印函数
  const logBoardState = (message, boardState) => {
    console.log("===== " + message + " =====");
    console.log("Board state:", boardState);
    
    // 打印成3x3网格形式，方便查看
    let gridView = "";
    for (let i = 0; i < 3; i++) {
      let row = "";
      for (let j = 0; j < 3; j++) {
        const idx = i * 3 + j;
        if (boardState[idx] === null) {
          row += "[ ] ";
        } else {
          // 找出图片在原始数组中的索引
          const imageIndex = images.indexOf(boardState[idx]);
          row += `[${imageIndex}] `;
        }
      }
      gridView += row + "\n";
    }
    console.log("Grid view:\n" + gridView);
    console.log("Empty cell index:", emptyCell);
  };

  // 初始化游戏
  const initializeGame = () => {
    setHasMoved(false);
    setIsSolved(false);
    
    // 创建随机排列的图片数组
    let shuffled = [...images];
    shuffleArray(shuffled);
    
    // 找出空白方块的位置
    const emptyCellIndex = shuffled.findIndex(img => img === null);
    
    console.log("Game initialized:");
    console.log("Original order:", images.map((img, idx) => img === null ? "empty" : idx));
    console.log("Shuffled order:", shuffled.map((img, idx) => img === null ? "empty" : images.indexOf(img)));
    console.log("Empty cell index:", emptyCellIndex);
    
    setEmptyCell(emptyCellIndex);
    setBoard(shuffled);
    setHasStarted(true);
    
    // 打印初始游戏板状态
    logBoardState("INITIAL BOARD", shuffled);
  };

  // 打乱数组的函数
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  // 检查是否可以移动的函数
  const canMove = (index) => {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyCell / 3);
    const emptyCol = emptyCell % 3;
    
    // 检查是否相邻（上、下、左、右）
    const isAdjacent = (
      (row === emptyRow && Math.abs(col - emptyCol) === 1) ||
      (col === emptyCol && Math.abs(row - emptyRow) === 1)
    );
    
    console.log(`Checking if cell ${index} (row:${row}, col:${col}) can move to empty cell ${emptyCell} (row:${emptyRow}, col:${emptyCol})`);
    console.log(`Is adjacent: ${isAdjacent}`);
    
    return isAdjacent;
  };

  // 处理点击方块的函数
  const handleCellClick = (index) => {
    console.log(`Cell clicked: ${index}`);
    
    if (isSolved) {
      console.log("Game already solved, ignoring click");
      return;
    }
    
    if (canMove(index)) {
      console.log(`Moving cell ${index} to empty position ${emptyCell}`);
      moveCell(index);
    } else {
      console.log(`Cell ${index} cannot move to empty position ${emptyCell}`);
    }
  };

  // 移动方块的函数
  const moveCell = (index) => {
    console.log(`BEFORE MOVE: clicked cell ${index}, empty cell ${emptyCell}`);
    logBoardState("BEFORE MOVE", board);
    
    const newBoard = [...board];
    [newBoard[index], newBoard[emptyCell]] = [newBoard[emptyCell], newBoard[index]];
    
    console.log(`AFTER SWAP: clicked cell ${index} now contains ${newBoard[index] === null ? 'empty' : 'image'}, empty cell ${emptyCell} now contains ${newBoard[emptyCell] === null ? 'empty' : 'image'}`);
    logBoardState("AFTER SWAP", newBoard);
    
    // 更新状态
    setBoard(newBoard);
    setEmptyCell(index);  // 空白方块现在移动到点击的方块位置
    setHasMoved(true);
    
    console.log(`Empty cell position updated to: ${index}`);
    
    // 检查是否解决了拼图
    checkSolution(newBoard);
  };

  // 键盘控制函数
  const handleKeyDown = (e) => {
    if (!isActive || isSolved) {
      console.log(`Key ${e.key} pressed, but grid is ${!isActive ? 'not active' : 'solved'}, ignoring`);
      return;
    }
    
    console.log(`Key pressed: ${e.key}`);
    
    const row = Math.floor(emptyCell / 3);
    const col = emptyCell % 3;
    
    let targetIndex = -1;
    let direction = "";
    
    switch (e.key) {
      case 'ArrowUp':
        if (row < 2) {
          targetIndex = emptyCell + 3; // 下方的方块移上来
          direction = "up";
        }
        break;
      case 'ArrowDown':
        if (row > 0) {
          targetIndex = emptyCell - 3; // 上方的方块移下来
          direction = "down";
        }
        break;
      case 'ArrowLeft':
        if (col < 2) {
          targetIndex = emptyCell + 1; // 右边的方块移左边
          direction = "left";
        }
        break;
      case 'ArrowRight':
        if (col > 0) {
          targetIndex = emptyCell - 1; // 左边的方块移右边
          direction = "right";
        }
        break;
      default:
        console.log("Unhandled key, ignoring");
        return;
    }
    
    console.log(`Arrow ${direction} pressed, empty cell at (${row},${col}), trying to move cell at index ${targetIndex}`);
    
    if (targetIndex >= 0 && targetIndex < 9) {
      console.log(`Valid target index: ${targetIndex}, moving cell`);
      moveCell(targetIndex);
    } else {
      console.log(`Invalid target index: ${targetIndex}, cannot move in this direction`);
    }
  };

  // 检查是否解决的函数
  const checkSolution = (currentBoard) => {
    console.log("Checking solution...");
    
    // 打印当前状态和目标状态
    console.log("Current board order:", currentBoard.map((img, idx) => img === null ? "empty" : images.indexOf(img)));
    console.log("Target order:", images.map((img, idx) => img === null ? "empty" : idx));
    
    // 检查除了空白方块外的其他方块是否按顺序排列
    const isSolutionCorrect = currentBoard.every((img, index) => {
      const isCorrect = img === images[index];
      console.log(`Cell ${index}: ${isCorrect ? 'CORRECT' : 'INCORRECT'} - has ${img === null ? 'empty' : images.indexOf(img)}, should have ${images[index] === null ? 'empty' : index}`);
      return isCorrect;
    });
    
    console.log(`Solution check result: ${isSolutionCorrect ? 'SOLVED!' : 'Not solved yet'}`);
    
    if (isSolutionCorrect) {
      console.log("GAME SOLVED! Updating state and showing alert...");
      setIsSolved(true);
      incrementWins();
      setTimeout(() => {
        alert('Correct!');
        initializeGame();
      }, 300);
    }
  };

  // 解决拼图的函数
  const handleSolve = () => {
    console.log("Solve button clicked, setting board to solved state");
    setBoard([...images]);
    setEmptyCell(8);  // 假设空白方块应该在右下角 (索引8)
    setIsSolved(true);
    incrementWins();
    logBoardState("SOLVED BOARD", images);
  };

  // 增加赢得游戏的计数
  const incrementWins = () => {
    // 从localStorage获取当前赢得的游戏数
    let gamesWon = localStorage.getItem('gamesWon');
    gamesWon = gamesWon ? parseInt(gamesWon) : 0;
    gamesWon += 1;
    
    console.log(`Incrementing games won from ${gamesWon - 1} to ${gamesWon}`);
    
    // 保存回localStorage
    localStorage.setItem('gamesWon', gamesWon.toString());
  };

  // 组件挂载时初始化游戏
  useEffect(() => {
    console.log("Component mounted or dependencies changed, initializing game");
    initializeGame();
    
    // 添加键盘事件监听
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      console.log("Component unmounting, removing event listener");
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // 只在组件挂载时执行一次

  return (
    <div className="slido-container">
      <div 
        className="grid-container" 
        ref={gridRef}
        onClick={() => {
          console.log("Grid clicked, setting active state to true");
          setIsActive(true);
        }}
        onBlur={() => {
          console.log("Grid lost focus, setting active state to false");
          setIsActive(false);
        }}
        tabIndex="0"
      >
        {board.map((img, index) => (
          <div 
            key={index} 
            className={`grid-cell ${img === null ? 'empty-cell' : ''}`}
            onClick={() => handleCellClick(index)}
          >
            {img && <img src={img} alt={`Shrek ${images.indexOf(img) + 1}`} />}
          </div>
        ))}
      </div>
      
      <div className="button-container">
        <button 
          className="solve-button" 
          onClick={handleSolve}
          disabled={isSolved}
        >
          Solve
        </button>
        
        <button 
          className="reset-button" 
          onClick={() => {
            console.log("Reset button clicked");
            initializeGame();
          }}
          disabled={hasStarted && !hasMoved}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default SlidoGame;