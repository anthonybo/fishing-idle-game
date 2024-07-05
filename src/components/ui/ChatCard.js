import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './card';
import { Button } from './button';

const ChatCard = ({ messages, playerName, sendMessage }) => (
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
);

export default ChatCard;