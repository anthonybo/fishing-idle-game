import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

const ActionsCard = ({ rodCost, upgradeFishingRod, sellFish }) => (
  <Card>
    <CardHeader>
      <CardTitle>Actions</CardTitle>
    </CardHeader>
    <CardContent>
      <Button onClick={upgradeFishingRod} className="w-full mb-2">
        Upgrade Fishing Rod (${rodCost})
      </Button>
      <Button onClick={sellFish} className="w-full">
        Sell Fish
      </Button>
    </CardContent>
  </Card>
);

export default ActionsCard;