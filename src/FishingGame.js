// FishingGame.js
import React from 'react';
import GameLogic from './components/GameLogic';
import GameUI from './components/GameUI';

const FishingGame = ({ token, setToken, onLogout }) => {
  const gameLogicProps = { token, onLogout };
  const gameState = GameLogic(gameLogicProps);

  if (gameState.isLoading) {
    return <div>Loading game state...</div>;
  }

  return (
    <GameUI
      {...gameState}
      token={token}
      setToken={setToken}
      onLogout={onLogout}
    />
  );
};

export default FishingGame;