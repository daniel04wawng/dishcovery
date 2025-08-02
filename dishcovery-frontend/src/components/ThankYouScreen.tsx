import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface ThankYouScreenProps {
  onStartOver: () => void;
}

export const ThankYouScreen = ({ onStartOver }: ThankYouScreenProps) => {
  return (
    <div className="min-h-screen bg-background p-3 flex items-center justify-center">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="bg-primary text-primary-foreground text-center py-4 mb-3 rounded-t border-4 border-primary">
          <h1 className="text-2xl font-bold pixel-font tracking-wider flex items-center justify-center gap-2">
            <CheckCircle className="h-8 w-8" />
            Success!
          </h1>
        </div>
        
        {/* Content Container */}
        <div className="border-4 border-primary rounded-b bg-background p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          
          <h2 className="text-2xl font-bold text-foreground pixel-font mb-4">
            Thank You!
          </h2>
          
          <p className="text-muted-foreground leading-relaxed mb-6 pixel-font text-sm">
            Your food preferences have been submitted successfully. Our AI is now working to find the perfect restaurant recommendations just for you!
          </p>
          
          <div className="space-y-3 text-sm text-muted-foreground mb-6 pixel-font">
            <p>✨ Analyzing your preferences</p>
            <p>🔍 Searching nearby restaurants</p>
            <p>📱 You'll receive recommendations soon</p>
          </div>
          
          <Button 
            onClick={onStartOver}
            className="w-full border-4 border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-background pixel-font font-bold py-3"
          >
            Start New Search
          </Button>
        </div>
      </div>
    </div>
  );
};