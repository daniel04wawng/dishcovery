import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

interface TimePickerProps {
  time: { hour: string; minute: string; period: string };
  onChange: (time: { hour: string; minute: string; period: string }) => void;
}

export const TimePicker = ({ time, onChange }: TimePickerProps) => {
  const incrementHour = () => {
    const currentHour = parseInt(time.hour);
    const newHour = currentHour === 1 ? 12 : currentHour - 1;
    onChange({ ...time, hour: newHour.toString().padStart(2, '0') });
  };

  const decrementHour = () => {
    const currentHour = parseInt(time.hour);
    const newHour = currentHour === 12 ? 1 : currentHour + 1;
    onChange({ ...time, hour: newHour.toString().padStart(2, '0') });
  };

  const incrementMinute = () => {
    const currentMinute = parseInt(time.minute);
    const newMinute = currentMinute === 0 ? 59 : currentMinute - 1;
    onChange({ ...time, minute: newMinute.toString().padStart(2, '0') });
  };

  const decrementMinute = () => {
    const currentMinute = parseInt(time.minute);
    const newMinute = currentMinute === 59 ? 0 : currentMinute + 1;
    onChange({ ...time, minute: newMinute.toString().padStart(2, '0') });
  };

  const togglePeriod = () => {
    onChange({ ...time, period: time.period === 'AM' ? 'PM' : 'AM' });
  };

  return (
    <div className="bg-secondary border-2 border-primary rounded p-2">
      <div className="flex items-center justify-center gap-2">
        {/* Hour */}
        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={incrementHour}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <span className="text-lg font-bold pixel-font w-8 text-center">{time.hour}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={decrementHour}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        {/* Separator */}
        <span className="text-lg font-bold pixel-font">:</span>

        {/* Minute */}
        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={incrementMinute}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <span className="text-lg font-bold pixel-font w-8 text-center">{time.minute}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={decrementMinute}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>

        {/* AM/PM */}
        <div className="flex flex-col items-center">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={togglePeriod}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronUp className="h-3 w-3" />
          </Button>
          <span className="text-sm font-bold pixel-font w-8 text-center">{time.period}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={togglePeriod}
            className="h-4 w-4 p-0 hover:bg-primary/20"
          >
            <ChevronDown className="h-3 w-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};