import { fishTypes } from '../utils/constants';
import { logFishingActivity } from '../utils/utils';

export const catchFish = (setInventory, setFish, setMoney, rodLevel, setShowAnimation, setFishLog, playerName, toast) => {
  const catchChance = 0.5 + (rodLevel * 0.05); // Base 50% chance, increases with rod level
  if (Math.random() < catchChance) {
    const caughtFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];
    setInventory(prev => ({
      ...prev,
      [caughtFish.name]: (prev[caughtFish.name] || 0) + 1
    }));
    setFish(prev => prev + 1);
    setMoney(prev => prev + caughtFish.value);
    const message = `${playerName} caught a ${caughtFish.name} worth $${caughtFish.value}!`;
    logFishingActivity(message, 'success', true, setFishLog);
    toast.success(message);
    setShowAnimation(true);
    setTimeout(() => setShowAnimation(false), 1000);
  } else {
    const message = `${playerName} tried to catch a fish, but it got away!`;
    logFishingActivity(message, 'error', true, setFishLog);
    toast.error(message);
  }
};