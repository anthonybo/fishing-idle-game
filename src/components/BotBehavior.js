import { fishTypes } from '../utils/constants';
import { logFishingActivity } from '../utils/utils';

export const initializeBots = (numBots) => {
  const botNames = ['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank', 'Grace', 'Henry', 'Isabel', 'Jack'];
  return Array.from({ length: numBots }, (_, index) => ({
    name: botNames[index],
    fish: 0,
    rodLevel: 1,
    catchRate: 1,
    money: 10,
    lastAction: null,
    personality: Math.random() < 0.5 ? 'friendly' : 'competitive',
    upgradeChance: Math.random() * 0.2,
    sellChance: Math.random() * 0.3
  }));
};

export const updateBots = (setFishermen, setFishLog) => {
  setFishermen(prevFishermen => prevFishermen.map(bot => {
    let updatedBot = { ...bot };
    
    if (Math.random() < bot.catchRate / 60) {
      const caughtFish = fishTypes[Math.floor(Math.random() * fishTypes.length)];
      updatedBot.fish += 1;
      updatedBot.money += caughtFish.value;
      logFishingActivity(`${bot.name} caught a ${caughtFish.name} worth $${caughtFish.value}!`, 'info', false, setFishLog);
    } else {
      logFishingActivity(`${bot.name} is casting their line...`, 'info', false, setFishLog);
    }

    if (updatedBot.money >= updatedBot.rodLevel * 20 && Math.random() < updatedBot.upgradeChance) {
      updatedBot.money -= updatedBot.rodLevel * 20;
      updatedBot.rodLevel += 1;
      updatedBot.catchRate += 0.5;
      logFishingActivity(`${updatedBot.name} upgraded their fishing rod to level ${updatedBot.rodLevel}!`, 'info', false, setFishLog);
    } else if (updatedBot.fish >= 20 && Math.random() < updatedBot.sellChance) {
      const soldAmount = updatedBot.fish;
      updatedBot.money += soldAmount * 2;
      updatedBot.fish = 0;
      logFishingActivity(`${updatedBot.name} sold ${soldAmount.toFixed(0)} fish for $${(soldAmount * 2).toFixed(2)}!`, 'info', false, setFishLog);
    }

    return updatedBot;
  }));
};