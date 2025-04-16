
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, Send } from 'lucide-react';

interface InputControlsProps {
  onSendMessage: (message: string) => void;
  isListening: boolean;
  onStartListening: () => void;
  onStopListening: () => void;
}

const InputControls: React.FC<InputControlsProps> = ({
  onSendMessage,
  isListening,
  onStartListening,
  onStopListening
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
      
      // Reset textarea height
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md border border-gray-200 p-3">
      <div className="flex items-end gap-2">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message here..."
          className="flex-1 min-h-10 max-h-32 resize-none"
        />
        <div className="flex gap-2">
          <Button
            size="icon"
            variant={isListening ? "destructive" : "outline"}
            className="h-10 w-10 rounded-full"
            onClick={isListening ? onStopListening : onStartListening}
            aria-label={isListening ? "Stop listening" : "Start listening"}
          >
            {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </Button>
          <Button
            disabled={!message.trim()}
            size="icon"
            className="h-10 w-10 rounded-full bg-assistant-primary hover:bg-assistant-primary/90"
            onClick={handleSubmit}
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InputControls;
