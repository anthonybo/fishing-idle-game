import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Clock } from 'lucide-react';

const GameStatsCard = ({ gameTime }) => (
  <Card>
    <CardHeader>
      <CardTitle>Game Stats</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-2">
        <Clock className="mr-2" />
        <span>Game Time: {Math.floor(gameTime / 60)}m {gameTime % 60}s</span>
      </div>
    </CardContent>
  </Card>
);

export default GameStatsCard;