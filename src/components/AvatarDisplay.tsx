
import React, { useEffect, useState } from 'react';
import { Bot, CircleUser, Sparkles } from 'lucide-react';

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
        return 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-emerald-100';
      case 'thinking':
        return 'bg-gradient-to-br from-amber-400 to-amber-600 text-amber-100';
      case 'concerned':
        return 'bg-gradient-to-br from-rose-400 to-rose-600 text-rose-100';
      default:
        return 'bg-gradient-to-br from-indigo-400 to-indigo-600 text-indigo-100';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`avatar-container w-40 h-40 md:w-52 md:h-52 flex items-center justify-center rounded-full shadow-2xl ${getEmotionClasses()} relative overflow-hidden`}>
        {/* Glow effect */}
        <div className="absolute inset-0 w-full h-full bg-white opacity-20 rounded-full filter blur-xl transform scale-90"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform scale-110 animate-pulse-light"></div>
          {Array.from({ length: 8 }).map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-white opacity-60"
              style={{
                width: `${Math.random() * 40 + 15}px`,
                height: `${Math.random() * 40 + 15}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animation: 'float 6s infinite ease-in-out'
              }}
            ></div>
          ))}
        </div>

        {/* Sparkles animation */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 5 }).map((_, i) => (
            <Sparkles 
              key={i} 
              className="absolute text-white/60" 
              style={{
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: 'float 5s infinite ease-in-out, pulse 2s infinite'
              }}
            />
          ))}
        </div>

        {pulseActive && (
          <div className="pulse-ring absolute inset-0 border-4 border-white/50 rounded-full animate-ripple"></div>
        )}
        
        <Bot className="w-20 h-20 md:w-24 md:h-24 relative z-10 drop-shadow-lg" />
      </div>
      <div className="mt-4 text-base font-medium text-white bg-gradient-to-r from-indigo-500/70 to-purple-500/70 px-4 py-1.5 rounded-full shadow-lg backdrop-blur-sm">
        {speaking ? 'Speaking...' : 'Listening...'}
      </div>
    </div>
  );
};

export default AvatarDisplay;
