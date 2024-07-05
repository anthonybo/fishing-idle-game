import React, { useState, useEffect, useCallback, useRef } from 'react';
import { toast } from 'react-toastify';
import { initializeBots, updateBots } from './BotBehavior';
import { catchFish } from './FishingMechanics';
import { sendMessage, botChat, botConversation } from './ChatSystem';
import { logFishingActivity } from '../utils/utils';
import { fishTypes } from '../utils/constants';

const GameLogic = () => {
  const [inventory, setInventory] = useState(() => 
    fishTypes.reduce((acc, fish) => ({ ...acc, [fish.name]: 0 }), {})
  );
  const [fish, setFish] = useState(0);
  const [money, setMoney] = useState(10);
  const [rodLevel, setRodLevel] = useState(1);
  const [rodCost, setRodCost] = useState(20);
  const [catchRate, setCatchRate] = useState(1);
  const [messages, setMessages] = useState([]);
  const [fishermen, setFishermen] = useState([]);
  const [playerName] = useState('You');
  const [gameTime, setGameTime] = useState(0);
  const [fishLog, setFishLog] = useState([]);
  const [showAnimation, setShowAnimation] = useState(false);

  const gameStateRef = useRef({ inventory, fish, money, rodLevel, catchRate, fishermen, gameTime });

  useEffect(() => {
    gameStateRef.current = { inventory, fish, money, rodLevel, catchRate, fishermen, gameTime };
  }, [inventory, fish, money, rodLevel, catchRate, fishermen, gameTime]);

  useEffect(() => {
    const bots = initializeBots(5); // Initialize with 5 bots
    setFishermen(bots);
    sendMessage('System', "Welcome to the Fishing Idle Game! Start fishing and chat with other fishermen!", setMessages);
  }, []);

  const upgradeFishingRod = useCallback(() => {
    if (money >= rodCost) {
      setMoney(prev => prev - rodCost);
      setRodLevel(prev => prev + 1);
      setCatchRate(prev => prev + 0.5);
      setRodCost(prev => Math.floor(prev * 1.5));
      const message = `${playerName} upgraded their fishing rod to level ${rodLevel + 1}!`;
      logFishingActivity(message, 'success', true, setFishLog);
      toast.success(message);
    }
  }, [money, rodCost, rodLevel, playerName]);

  const sellFish = useCallback((fishType, amount) => {
    const fishToSell = fishTypes.find(f => f.name === fishType);
    if (fishToSell && inventory[fishType] && inventory[fishType] >= amount) {
      const earnings = fishToSell.value * amount;
      setMoney(prev => prev + earnings);
      setInventory(prev => ({
        ...prev,
        [fishType]: prev[fishType] - amount
      }));
      setFish(prev => prev - amount);
      const message = `${playerName} sold ${amount} ${fishType}(s) for $${earnings.toFixed(2)}!`;
      logFishingActivity(message, 'success', true, setFishLog);
      toast.success(message);
    }
  }, [inventory, playerName]);

  const sellAllFish = useCallback(() => {
    let totalEarnings = 0;
    const newInventory = { ...inventory };
    
    Object.entries(inventory).forEach(([fishType, amount]) => {
      const fishToSell = fishTypes.find(f => f.name === fishType);
      if (fishToSell) {
        totalEarnings += fishToSell.value * amount;
        newInventory[fishType] = 0;
      }
    });

    setMoney(prev => prev + totalEarnings);
    setInventory(newInventory);
    setFish(0);
    const message = `${playerName} sold all fish for $${totalEarnings.toFixed(2)}!`;
    logFishingActivity(message, 'success', true, setFishLog);
    toast.success(message);
  }, [inventory, playerName]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      setGameTime(prev => prev + 1);
      if (Math.random() < catchRate / 60) {
        catchFish(setInventory, setFish, setMoney, rodLevel, setShowAnimation, setFishLog, playerName, toast);
      } else {
        logFishingActivity(`${playerName} is casting their line...`, 'info', true, setFishLog);
      }
      updateBots(setFishermen, setFishLog, toast);
      if (gameTime % 10 === 0) {
        const randomBot = fishermen[Math.floor(Math.random() * fishermen.length)];
        if (randomBot) botChat(randomBot, setMessages);
      }
      if (gameTime % 30 === 0) {
        botConversation(fishermen, setMessages);
      }
    }, 1000);

    return () => clearInterval(gameInterval);
  }, [catchRate, fishermen, gameTime, playerName, rodLevel]);

  return {
    inventory,
    fish,
    money,
    rodLevel,
    rodCost,
    catchRate,
    messages,
    fishermen,
    playerName,
    gameTime,
    fishLog,
    upgradeFishingRod,
    sellFish,
    sellAllFish,
    sendMessage: (sender, text) => sendMessage(sender, text, setMessages),
    showAnimation,
    logFishingActivity: (message, type, isPlayer) => logFishingActivity(message, type, isPlayer, setFishLog)
  };
};

export default GameLogic;