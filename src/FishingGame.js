import React from 'react';
import GameLogic from './components/GameLogic';
import GameUI from './components/GameUI';

const FishingGame = () => {
  const gameLogic = GameLogic();
  
  return <GameUI {...gameLogic} />;
};

export default FishingGame;