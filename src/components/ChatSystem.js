export const sendMessage = (sender, text, setMessages) => {
    const newMessage = { sender, text, timestamp: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev.slice(-49), newMessage]);
  };
  
  export const botChat = (bot, setMessages) => {
    const messages = [
      `I've caught ${bot.fish.toFixed(0)} fish so far!`,
      `My rod is level ${bot.rodLevel}. How about yours?`,
      `The fishing is ${Math.random() < 0.5 ? 'great' : 'slow'} today.`,
      `I'm aiming to upgrade my rod soon.`,
      `Anyone want to have a fishing contest?`,
      `I've earned $${bot.money.toFixed(2)} from fishing!`,
    ];
    sendMessage(bot.name, messages[Math.floor(Math.random() * messages.length)], setMessages);
  };
  
  export const botConversation = (fishermen, setMessages) => {
    if (fishermen.length < 2) return;
    const bot1 = fishermen[Math.floor(Math.random() * fishermen.length)];
    let bot2;
    do {
      bot2 = fishermen[Math.floor(Math.random() * fishermen.length)];
    } while (bot2 === bot1);
  
    const conversations = [
      [`Hey ${bot2.name}, how's your fishing going?`, `Pretty good, ${bot1.name}! I've caught ${bot2.fish.toFixed(0)} fish so far.`],
      [`${bot2.name}, what's your secret to catching so many fish?`, `No secret, ${bot1.name}. Just patience and a good rod!`],
      [`Do you think the weather affects the fish, ${bot2.name}?`, `Absolutely, ${bot1.name}. I always catch more on sunny days.`],
    ];
    const [msg1, msg2] = conversations[Math.floor(Math.random() * conversations.length)];
    sendMessage(bot1.name, msg1, setMessages);
    setTimeout(() => sendMessage(bot2.name, msg2, setMessages), 2000);
  };