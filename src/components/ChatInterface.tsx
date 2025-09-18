import { useState } from 'react';
import { Send, Bot, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatInterfaceProps {
  hasDocuments: boolean;
}

export const ChatInterface = ({ hasDocuments }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !hasDocuments) return;

    const userMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      content: input.trim(),
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (in real app, this would call your AI service)
    setTimeout(() => {
      const aiMessage: Message = {
        id: Math.random().toString(36).substr(2, 9),
        content: "I'm analyzing your PDF documents to answer your question. This is a demo response - in a real application, I would process your uploaded PDFs and provide specific answers based on their content.",
        role: 'assistant',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!hasDocuments) {
    return (
      <Card className="p-8 text-center bg-surface/50 border-border/50">
        <Bot className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold mb-2">Upload PDFs to Start</h3>
        <p className="text-muted-foreground">
          Upload your PDF documents above to begin asking questions about their content.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-surface/50 border-border/50 shadow-card">
        <div className="p-4 border-b border-border/50">
          <h3 className="font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5 text-primary" />
            AI Assistant
          </h3>
          <p className="text-sm text-muted-foreground">
            Ask questions about your uploaded documents
          </p>
        </div>
        
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center py-8">
              <Bot className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-muted-foreground">
                Start by asking a question about your documents...
              </p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`flex gap-3 max-w-[80%] ${
                    message.role === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === 'user'
                        ? 'bg-gradient-primary'
                        : 'bg-gradient-accent'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <Bot className="w-4 h-4 text-accent-foreground" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    <p
                      className={`text-xs mt-1 ${
                        message.role === 'user'
                          ? 'text-primary-foreground/70'
                          : 'text-muted-foreground'
                      }`}
                    >
                      {formatTime(message.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-accent flex items-center justify-center">
                <Bot className="w-4 h-4 text-accent-foreground" />
              </div>
              <div className="bg-secondary text-secondary-foreground rounded-lg p-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.1s]" />
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a question about your documents..."
          className="flex-1 bg-surface border-border focus:border-primary"
          disabled={isLoading}
        />
        <Button
          type="submit"
          variant="premium"
          disabled={!input.trim() || isLoading}
          className="px-6"
        >
          <Send className="w-4 h-4" />
        </Button>
      </form>
    </div>
  );
};