
import React, { useEffect, useState } from 'react';
import { User } from 'lucide-react';

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
        return 'bg-emerald-100 text-emerald-600';
      case 'thinking':
        return 'bg-amber-100 text-amber-600';
      case 'concerned':
        return 'bg-rose-100 text-rose-600';
      default:
        return 'bg-indigo-100 text-indigo-600';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className={`avatar-container w-32 h-32 md:w-40 md:h-40 flex items-center justify-center shadow-lg ${getEmotionClasses()}`}>
        {pulseActive && <div className="pulse-ring"></div>}
        <User className="w-16 h-16 md:w-20 md:h-20" />
      </div>
      <div className="mt-2 text-sm text-assistant-text/70">
        {speaking ? 'Speaking...' : 'Listening...'}
      </div>
    </div>
  );
};

export default AvatarDisplay;
