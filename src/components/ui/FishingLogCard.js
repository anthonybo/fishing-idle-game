import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

const getLogColor = (type) => {
  switch (type) {
    case 'success': return 'text-green-600';
    case 'error': return 'text-red-600';
    case 'info': return 'text-blue-600';
    default: return 'text-gray-600';
  }
};

const FishingLogCard = ({ fishLog }) => {
  const [showPlayerOnly, setShowPlayerOnly] = useState(false);

  const filteredLog = showPlayerOnly ? fishLog.filter(entry => entry.isPlayer) : fishLog;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fishing Log</CardTitle>
        <Button onClick={() => setShowPlayerOnly(!showPlayerOnly)}>
          {showPlayerOnly ? 'Show All' : 'Show Player Only'}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="h-40 overflow-y-auto">
          {filteredLog.slice().reverse().map((entry, index) => (
            <div key={index} className={`mb-1 text-sm ${getLogColor(entry.type)}`}>
              <span className="text-gray-500">{entry.time}</span> {entry.message}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FishingLogCard;