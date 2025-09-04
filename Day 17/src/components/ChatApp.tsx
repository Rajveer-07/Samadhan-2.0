import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Send, Circle } from 'lucide-react';

// Types define kar rahe hain - basic structure
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
  isCurrentUser: boolean;
}

interface User {
  id: string;
  name: string;
  isOnline: boolean;
}

const ChatApp = () => {
  // State management - yahan saara data store hoga
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hey! Kaise ho? 👋',
      sender: 'Rajesh',
      timestamp: new Date(Date.now() - 10000),
      isCurrentUser: false,
    },
    {
      id: '2', 
      text: 'Main theek hun yaar! Tum batao kya haal hai?',
      sender: 'You',
      timestamp: new Date(Date.now() - 5000),
      isCurrentUser: true,
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState('You');
  
  // Online users ki list - prototype ke liye static data
  const [onlineUsers] = useState<User[]>([
    { id: '1', name: 'Rajesh', isOnline: true },
    { id: '2', name: 'Priya', isOnline: true },
    { id: '3', name: 'Amit', isOnline: false },
    { id: '4', name: 'Sneha', isOnline: true },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom jab naya message aaye
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Mock real-time message simulation - har 15 seconds mein fake message aayega
  useEffect(() => {
    const fakeMessages = [
      'Acha hai yaar! Weekend plan kya hai?',
      'Movie dekhne chalte hain kya?',
      'Haan yaar, sounds good! 🎬',
      'Office mein kaam zyada hai aaj kal',
      'Same here! Bahut busy schedule hai',
    ];

    const interval = setInterval(() => {
      // Random chance ke liye message add karte hain
      if (Math.random() > 0.7) {
        const randomMessage = fakeMessages[Math.floor(Math.random() * fakeMessages.length)];
        const randomUser = onlineUsers.filter(u => u.isOnline && u.name !== 'You')[
          Math.floor(Math.random() * onlineUsers.filter(u => u.isOnline && u.name !== 'You').length)
        ];

        if (randomUser) {
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: randomMessage,
            sender: randomUser.name,
            timestamp: new Date(),
            isCurrentUser: false,
          }]);
        }
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [onlineUsers]);

  // Message send karne ka function
  const sendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: currentUser,
      timestamp: new Date(),
      isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');

    // Mock reply after 2 seconds - realistic lagane ke liye
    setTimeout(() => {
      const replies = [
        'Bilkul sahi kaha! 👍',
        'Haan yaar, agreed!',
        'Nice! 😄',
        'Interesting point!',
        'Sach mein? Wow!',
      ];
      
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      const randomUser = onlineUsers.filter(u => u.isOnline && u.name !== 'You')[0];
      
      if (randomUser) {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: randomReply,
          sender: randomUser.name,
          timestamp: new Date(),
          isCurrentUser: false,
        }]);
      }
    }, 2000);
  };

  // Enter key press pe message send ho jaye
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-2rem)]">
        
        {/* Users sidebar - online/offline status ke saath */}
        <Card className="lg:col-span-1 p-4 bg-card border-border">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Online Users {/* Simple heading - koi fancy nahi */}
          </h2>
          <div className="space-y-3">
            {onlineUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Status indicator - online/offline */}
                  <Circle 
                    className={`absolute -bottom-1 -right-1 w-3 h-3 border-2 border-background rounded-full ${
                      user.isOnline ? 'fill-status-online text-status-online' : 'fill-status-offline text-status-offline'
                    }`}
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {user.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Main chat area */}
        <Card className="lg:col-span-3 flex flex-col bg-card border-border">
          {/* Chat header */}
          <div className="p-4 border-b border-border">
            <h1 className="text-xl font-semibold text-foreground">
              समाधान Chat {/* Hindi naam se professional lagta hai */}
            </h1>
            <p className="text-sm text-muted-foreground">
              {onlineUsers.filter(u => u.isOnline).length} members online
            </p>
          </div>

          {/* Messages container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.isCurrentUser 
                    ? 'bg-chat-user text-primary-foreground' 
                    : 'bg-chat-other text-foreground'
                }`}>
                  {!message.isCurrentUser && (
                    <p className="text-xs font-medium mb-1 opacity-70">
                      {message.sender}
                    </p>
                  )}
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs mt-1 opacity-60">
                    {message.timestamp.toLocaleTimeString('en-IN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            ))}
            {/* Scroll target - yahan automatically scroll ho jayega */}
            <div ref={messagesEndRef} />
          </div>

          {/* Message input area */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Type your message... (Hinglish mein type kar sakte hain!)"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button 
                onClick={sendMessage}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatApp;