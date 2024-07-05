export const logFishingActivity = (message, type = 'info', isPlayer = false, setFishLog) => {
    const newLog = {
      message,
      type,
      time: new Date().toLocaleTimeString(),
      isPlayer
    };
    setFishLog(prev => [...prev.slice(-49), newLog]);
  };