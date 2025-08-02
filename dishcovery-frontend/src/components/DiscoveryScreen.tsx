import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { TimePicker } from "./TimePicker";

interface DiscoveryScreenProps {
  onSubmit: (preferences: any) => void;
}

export const DiscoveryScreen = ({ onSubmit }: DiscoveryScreenProps) => {
  const [selectedCuisine, setSelectedCuisine] = useState("Japanese");
  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [location, setLocation] = useState("1083 Western Rd");
  const [radius, setRadius] = useState("20Mi");
  const [arrivalTime, setArrivalTime] = useState({ hour: "08", minute: "00", period: "AM" });
  const [priceRange, setPriceRange] = useState([2]);
  const [dietary, setDietary] = useState<string[]>([]);
  const [groupSize, setGroupSize] = useState(4);

  const cuisines = ["Japanese", "Italian", "Mexican", "Chinese", "Indian", "Thai", "American", "Korean", "French", "Mediterranean"];
  const allergies = ["Peanuts", "Tree Nuts", "Milk / Dairy", "Eggs", "Soy", "Wheat / Gluten", "Sulfites", "Shellfish", "Lupin"];
  const dietaryOptions = ["Vegetarian", "Gluten-Free", "Halal", "Kosher", "Vegan"];
  const radiusOptions = ["10Mi", "20Mi", "30Mi"];
  const priceLabels = ["$", "$$", "$$$", "$$$$"];

  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies(prev => 
      prev.includes(allergy) 
        ? prev.filter(a => a !== allergy)
        : [...prev, allergy]
    );
  };

  const toggleDietary = (option: string) => {
    setDietary(prev => 
      prev.includes(option) 
        ? prev.filter(d => d !== option)
        : [...prev, option]
    );
  };

  const nextCuisine = () => {
    const nextIndex = (currentCuisineIndex + 1) % cuisines.length;
    setCurrentCuisineIndex(nextIndex);
    setSelectedCuisine(cuisines[nextIndex]);
  };

  const prevCuisine = () => {
    const prevIndex = currentCuisineIndex === 0 ? cuisines.length - 1 : currentCuisineIndex - 1;
    setCurrentCuisineIndex(prevIndex);
    setSelectedCuisine(cuisines[prevIndex]);
  };

  const handleSubmit = () => {
    const preferences = {
      cuisine: selectedCuisine,
      allergies: selectedAllergies,
      location,
      radius,
      arrivalTime,
      priceRange: priceRange[0],
      dietary,
      groupSize
    };
    onSubmit(preferences);
  };

  return (
    <div className="min-h-screen bg-background p-3">
      <div className="max-w-sm mx-auto">
        {/* Header */}
        <div className="bg-primary text-primary-foreground text-center py-4 mb-3 rounded-t border-4 border-primary">
          <h1 className="text-2xl font-bold pixel-font tracking-wider">Dishcovery</h1>
        </div>

        {/* Main Container */}
        <div className="border-4 border-primary rounded-b bg-background">
          
          {/* Top Row: Cuisine and Allergies */}
          <div className="grid grid-cols-2 border-b-4 border-primary">
            {/* Cuisine */}
            <div className="border-r-4 border-primary p-3">
              <div className="text-center text-primary font-bold text-sm mb-2 pixel-font">Cuisine</div>
              <div className="bg-secondary border-2 border-primary rounded p-3 h-32 flex flex-col items-center justify-center relative">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute left-0 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/20"
                  onClick={prevCuisine}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div className="text-4xl mb-1">
                  {selectedCuisine === "Japanese" && "🍣"}
                  {selectedCuisine === "Italian" && "🍝"}
                  {selectedCuisine === "Mexican" && "🌮"}
                  {selectedCuisine === "Chinese" && "🥡"}
                  {selectedCuisine === "Indian" && "🍛"}
                  {selectedCuisine === "Thai" && "🍜"}
                  {selectedCuisine === "American" && "🍔"}
                  {selectedCuisine === "Korean" && "🥘"}
                  {selectedCuisine === "French" && "🥐"}
                  {selectedCuisine === "Mediterranean" && "🫒"}
                </div>
                <span className="text-primary font-bold text-sm pixel-font">{selectedCuisine}</span>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-1 hover:bg-primary/20"
                  onClick={nextCuisine}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Allergies */}
            <div className="p-3">
              <div className="text-center text-primary font-bold text-sm mb-2 pixel-font">Allergies?</div>
              <div className="bg-secondary border-2 border-primary rounded p-2 h-32 overflow-y-auto">
                <div className="grid grid-cols-1 gap-1">
                  {allergies.slice(0, 6).map((allergy) => (
                    <button
                      key={allergy}
                      onClick={() => toggleAllergy(allergy)}
                      className={`text-xs h-5 px-1 pixel-font border border-primary rounded text-center ${
                        selectedAllergies.includes(allergy)
                          ? "bg-primary text-primary-foreground" 
                          : "bg-background text-primary hover:bg-primary/10"
                      }`}
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Row: Location and Time */}
          <div className="grid grid-cols-2 border-b-4 border-primary">
            {/* Location */}
            <div className="border-r-4 border-primary p-3">
              <div className="text-center text-primary font-bold text-sm mb-2 pixel-font flex items-center justify-center gap-1">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <div className="bg-secondary border-2 border-primary rounded p-2 space-y-2">
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="text-xs pixel-font text-center border-primary h-6 text-[10px]"
                  placeholder="Enter your location"
                />
                <div className="flex gap-1 justify-center">
                  {radiusOptions.map((option) => (
                    <button
                      key={option}
                      onClick={() => setRadius(option)}
                      className={`text-xs h-5 px-2 pixel-font border border-primary rounded ${
                        radius === option 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-background text-primary hover:bg-primary/10"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Time to Arrive */}
            <div className="p-3">
              <div className="text-center text-primary font-bold text-sm mb-2 pixel-font">Time to Arrive</div>
              <TimePicker 
                time={arrivalTime}
                onChange={setArrivalTime}
              />
            </div>
          </div>

          {/* Price Row */}
          <div className="border-b-4 border-primary p-3">
            <div className="text-center text-primary font-bold text-sm mb-2 pixel-font">Price</div>
            <div className="bg-secondary border-2 border-primary rounded p-3">
              <div className="flex justify-between text-sm mb-2 pixel-font">
                {priceLabels.map((label, index) => (
                  <span key={label} className={index + 1 <= priceRange[0] ? "text-primary" : "text-muted-foreground"}>
                    {label}
                  </span>
                ))}
              </div>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={4}
                min={1}
                step={1}
                className="w-full"
              />
            </div>
          </div>

          {/* Dietary Row */}
          <div className="border-b-4 border-primary p-3">
            <div className="text-center text-primary font-bold text-sm mb-2 pixel-font">Dietary</div>
            <div className="bg-secondary border-2 border-primary rounded p-2">
              <div className="grid grid-cols-2 gap-1">
                {dietaryOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => toggleDietary(option)}
                    className={`text-xs h-5 px-1 pixel-font border border-primary rounded text-center ${
                      dietary.includes(option)
                        ? "bg-primary text-primary-foreground" 
                        : "bg-background text-primary hover:bg-primary/10"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Group Icons */}
          <div className="p-3">
            <div className="flex justify-center gap-1">
              {Array.from({ length: groupSize }, (_, i) => (
                <div key={i} className="w-12 h-12 bg-white border-2 border-primary rounded text-2xl flex items-center justify-center">
                  🙂
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button 
          onClick={handleSubmit}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 mt-3 pixel-font border-4 border-primary rounded"
        >
          Find My Food!
        </Button>
      </div>
    </div>
  );
};