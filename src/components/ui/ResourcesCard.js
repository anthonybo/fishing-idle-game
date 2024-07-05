import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Progress } from './progress';
import { Fish, DollarSign, Anchor } from 'lucide-react';

const ResourcesCard = ({ fish, money, rodLevel, catchRate }) => (
  <Card>
    <CardHeader>
      <CardTitle>Resources</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="flex items-center mb-2">
        <Fish className="mr-2" />
        <span>Fish: {fish.toFixed(0)}</span>
      </div>
      <div className="flex items-center mb-2">
        <DollarSign className="mr-2" />
        <span>Money: ${money.toFixed(2)}</span>
      </div>
      <div className="flex items-center mb-2">
        <Anchor className="mr-2" />
        <span>Fishing Rod Level: {rodLevel}</span>
      </div>
      <Progress value={(catchRate / 5) * 100} className="mb-2" />
      <span>Catch Rate: {catchRate.toFixed(1)} fish/minute</span>
    </CardContent>
  </Card>
);

export default ResourcesCard;