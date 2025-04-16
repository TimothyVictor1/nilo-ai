
import React, { useEffect, useState } from 'react';
import { Bot } from 'lucide-react';

interface AvatarDisplayProps {
  speaking: boolean;
  emotion?: 'neutral' | 'happy' | 'thinking' | 'concerned';
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ speaking, emotion = 'neutral' }) => {
  const [pulseActive, setPulseActive] = useState(false);

  useEffect(() => {
    if (speaking) {
      setPulseActive(true);
    } else {
      setPulseActive(false);
    }
  }, [speaking]);

  // Get emotion-specific classes
  const getEmotionClasses = () => {
    switch (emotion) {
      case 'happy':
        return 'bg-gradient-to-br from-emerald-200 to-emerald-400 text-emerald-700';
      case 'thinking':
        return 'bg-gradient-to-br from-amber-200 to-amber-400 text-amber-700';
      case 'concerned':
        return 'bg-gradient-to-br from-rose-200 to-rose-400 text-rose-700';
      default:
        return 'bg-gradient-to-br from-indigo-200 to-indigo-400 text-indigo-700';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`avatar-container w-40 h-40 md:w-52 md:h-52 flex items-center justify-center rounded-full shadow-xl ${getEmotionClasses()} relative overflow-hidden`}>
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform scale-110 animate-pulse-light"></div>
          {Array.from({ length: 6 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-30"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: 'pulse 3s infinite ease-in-out'
              }}
            ></div>
          ))}
        </div>

        {pulseActive && (
          <div className="pulse-ring absolute inset-0 border-4 border-white/30 rounded-full"></div>
        )}
        
        <Bot className="w-20 h-20 md:w-24 md:h-24 relative z-10" />
      </div>
      <div className="mt-4 text-base font-medium text-white bg-primary/80 px-4 py-1 rounded-full shadow-md">
        {speaking ? 'Speaking...' : 'Listening...'}
      </div>
    </div>
  );
};

export default AvatarDisplay;
