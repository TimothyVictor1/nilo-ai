
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Volume2, Volume1, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface VoiceControlsProps {
  volume: number;
  onVolumeChange: (value: number) => void;
  muted: boolean;
  onToggleMute: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({
  volume,
  onVolumeChange,
  muted,
  onToggleMute
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
    <div className="flex items-center space-x-4 bg-white rounded-lg p-3 shadow-md border border-gray-200">
      <Button
        size="icon"
        variant="ghost"
        onClick={onToggleMute}
        className={muted ? "text-muted-foreground" : ""}
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
        className={`w-32 ${muted ? "opacity-50" : ""}`}
      />
      <span className="text-xs text-muted-foreground">
        {Math.round(volume * 100)}%
      </span>
    </div>
  );
};

export default VoiceControls;
