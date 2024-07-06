import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Fish, DollarSign, Users, Anchor, Clock } from 'lucide-react';
import { fishTypes } from '../utils/constants';

const GameUI = ({
  inventory = {},
  fish = 0,
  money = 0,
  rodLevel = 1,
  rodCost = 20,
  catchRate = 1,
  messages = [],
  fishermen = [],
  playerName = 'You',
  gameTime = 0,
  fishLog = [],
  upgradeFishingRod,
  sellFish,
  sellAllFish,
  sendMessage,
  showAnimation,
  onLogout
}) => {
  const [showPlayerLogsOnly, setShowPlayerLogsOnly] = useState(false);

  const filteredLogs = showPlayerLogsOnly 
    ? fishLog.filter(log => log.isPlayer)
    : fishLog;

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 rounded-lg shadow-md mb-4">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Fishing Idle Game</h1>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <Fish className="mr-2" size={20} />
              <span>{fish}</span>
            </div>
            <div className="flex items-center">
              <DollarSign className="mr-2" size={20} />
              <span>${money.toFixed(2)}</span>
            </div>
            <div className="flex items-center">
              <Anchor className="mr-2" size={20} />
              <span>Rod Lvl {rodLevel}</span>
            </div>
            <Button onClick={onLogout} className="bg-red-500 hover:bg-red-600">
              Logout
            </Button>
          </div>
        </div>
        <div>
          <Progress value={(catchRate / 5) * 100} className="mb-1" />
          <span className="text-sm">Catch Rate: {catchRate.toFixed(1)} fish/minute</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            {inventory && fishTypes.map(fishType => (
              <div key={fishType.name} className="flex justify-between items-center mb-2">
                <span>{fishType.name}: {inventory[fishType.name] || 0}</span>
                <Button onClick={() => sellFish(fishType.name, 1)} disabled={!inventory[fishType.name]}>
                  Sell 1 (${fishType.value})
                </Button>
              </div>
            ))}
            <Button onClick={sellAllFish} className="w-full mt-2">Sell All Fish</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button onClick={upgradeFishingRod} className="w-full mb-2">
              Upgrade Fishing Rod (${rodCost})
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-40 overflow-y-auto mb-2">
              {messages.map((msg, index) => (
                <div key={index} className="mb-1">
                  <span className="text-sm text-gray-500">{msg.timestamp}</span> 
                  <strong className="mr-1">{msg.sender}:</strong> 
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow border rounded-l px-2 py-1"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    sendMessage(playerName, e.target.value);
                    e.target.value = '';
                  }
                }}
              />
              <Button onClick={() => sendMessage(playerName, "Hello, fishermen!")} className="rounded-l-none">
                Send
              </Button>
            </div>
          </CardContent>
        </Card>

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

        <Card>
          <CardHeader>
            <CardTitle>Fishing Log</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowPlayerLogsOnly(!showPlayerLogsOnly)}
              className="mb-2"
            >
              {showPlayerLogsOnly ? "Show All Logs" : "Show Player Logs Only"}
            </Button>
            <div className="h-40 overflow-y-auto">
              {filteredLogs.slice().reverse().map((entry, index) => (
                <div key={index} className="mb-1 text-sm">
                  <span className="text-gray-500">{entry.time}</span> {entry.message}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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
      </div>

      {showAnimation && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <span className="text-6xl animate-bounce">🐟</span>
        </div>
      )}
    </div>
  );
};

export default GameUI;