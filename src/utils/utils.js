export const logFishingActivity = (message, type = 'info', isPlayer = false, setFishLog) => {
    const newLog = {
      message,
      type,
      time: new Date().toLocaleTimeString(),
      isPlayer
    };
    setFishLog(prev => [...prev.slice(-49), newLog]);
  };

  export const formatGameTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };
  