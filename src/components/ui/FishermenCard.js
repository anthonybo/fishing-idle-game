import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Users } from 'lucide-react';

const FishermenCard = ({ fishermen }) => (
  <Card>
    <CardHeader>
      <CardTitle>Nearby Fishermen</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-2">
        <Users className="mr-2" />
        <span>{fishermen.length} fishermen nearby</span>
      </div>
      <div className="max-h-40 overflow-y-auto">
        {fishermen.map((fisherman, index) => (
          <div key={index} className="mb-1">
            <strong>{fisherman.name}</strong>: {fisherman.fish.toFixed(0)} fish, ${fisherman.money.toFixed(2)}, Rod Lvl {fisherman.rodLevel} (CR: {fisherman.catchRate.toFixed(1)}/min)
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export default FishermenCard;