import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Clock } from 'lucide-react';
import { formatGameTime } from '../../utils/utils';


const GameStatsCard = ({ gameTime }) => {
  console.log('GameStatsCard received gameTime:', gameTime);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Game Stats</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center mb-2">
          <Clock className="mr-2" />
          <span>Game Time: {gameTime !== undefined && !isNaN(gameTime) ? formatGameTime(gameTime) : '0m 0s'}</span>
        </div>
      </CardContent>
    </Card>
  );
}

export default GameStatsCard;