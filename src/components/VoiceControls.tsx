
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceControlsProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  muted: boolean;
  onToggleMute: () => void;
  className?: string;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  volume,
  onVolumeChange,
  muted,
  onToggleMute,
  className
}) => {
  const handleVolumeChange = (value: number[]) => {
    onVolumeChange(value[0]);
  };

  const getVolumeIcon = () => {
    if (muted || volume === 0) return <VolumeX className="h-5 w-5" />;
    if (volume < 0.5) return <Volume1 className="h-5 w-5" />;
    return <Volume2 className="h-5 w-5" />;
  };

  return (
    <div className={cn(
      "flex items-center space-x-4 backdrop-blur-md bg-white/10 rounded-xl p-3 shadow-xl border border-white/20 transition-all hover:bg-white/15",
      className
    )}>
      <Button
        size="icon"
        variant="ghost"
        onClick={onToggleMute}
        className={`text-white hover:text-white/80 hover:bg-white/10 ${muted ? "opacity-50" : ""}`}
      >
        {getVolumeIcon()}
      </Button>
      <Slider
        disabled={muted}
        value={[volume]}
        min={0}
        max={1}
        step={0.01}
        onValueChange={handleVolumeChange}
        className={`w-32 md:w-40 ${muted ? "opacity-50" : ""}`}
      />
      <span className="text-xs font-medium text-white min-w-[40px] text-center px-2 py-1 rounded-md bg-white/20">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};

export default VoiceControls;
