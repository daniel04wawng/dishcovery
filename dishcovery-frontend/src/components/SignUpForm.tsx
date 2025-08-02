import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignUpFormProps {
  onNext: (userData: { email: string; phone: string }) => void;
}

export const SignUpForm = ({ onNext }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.email && formData.phone) {
      onNext(formData);
    }
  };

  return (
    <div className="min-h-screen bg-background p-8 flex flex-col justify-center">
      <div className="w-full max-w-sm mx-auto space-y-8">
        {/* Header */}
        <div className="bg-primary text-primary-foreground text-center py-6 rounded-lg">
          <h1 className="text-2xl font-bold pixel-font tracking-wider">Dishcovery</h1>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-lg text-primary pixel-font">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border-2 border-primary rounded-lg h-12 text-lg pixel-font bg-white/80 placeholder:text-gray-400"
              placeholder="Your Email"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-lg text-primary pixel-font">
              Phone number
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="border-2 border-primary rounded-lg h-12 text-lg pixel-font bg-white/80 placeholder:text-gray-400"
              placeholder="+33     0 00 00 00 00"
              required
            />
          </div>
        </form>
        
        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 text-lg pixel-font rounded-lg h-14 mt-12"
        >
          Log in
        </Button>
      </div>
    </div>
  );
};