import React, { useState, useEffect } from 'react';

const FishAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => setIsVisible(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return isVisible ? (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <span className="text-6xl animate-bounce">🐟</span>
    </div>
  ) : null;
};

export default FishAnimation;