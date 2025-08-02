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
  // ✅ State variables to track user input
  const [selectedCuisine, setSelectedCuisine] = useState("Japanese");
  const [currentCuisineIndex, setCurrentCuisineIndex] = useState(0);
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [location, setLocation] = useState("");
  const [radius, setRadius] = useState("20Mi");
  const [arrivalTime, setArrivalTime] = useState({ hour: "08", minute: "00", period: "AM" });
  const [priceRange, setPriceRange] = useState([2]); // Default: $$
  const [dietary, setDietary] = useState<string[]>([]);

  // Example cuisine list for carousel
  const cuisines = ["Japanese", "Italian", "Mexican", "Indian", "Chinese"];

  // Move carousel left/right
  const handleCuisineChange = (direction: "left" | "right") => {
    let newIndex = currentCuisineIndex;
    if (direction === "left") {
      newIndex = (currentCuisineIndex - 1 + cuisines.length) % cuisines.length;
    } else {
      newIndex = (currentCuisineIndex + 1) % cuisines.length;
    }
    setCurrentCuisineIndex(newIndex);
    setSelectedCuisine(cuisines[newIndex]);
  };

  // Toggle allergies
  const toggleAllergy = (allergy: string) => {
    setSelectedAllergies((prev) =>
      prev.includes(allergy) ? prev.filter((a) => a !== allergy) : [...prev, allergy]
    );
  };

  // Toggle dietary restrictions
  const toggleDietary = (option: string) => {
    setDietary((prev) =>
      prev.includes(option) ? prev.filter((d) => d !== option) : [...prev, option]
    );
  };

  // ✅ Final submit
  const handleSubmit = () => {
    onSubmit({
      selectedCuisine,
      selectedAllergies,
      location,
      radius,
      arrivalTime,
      priceRange,
      dietary
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Choose Your Preferences</h2>

      {/* Cuisine Carousel */}
      <div>
        <h3>Cuisine</h3>
        <Button onClick={() => handleCuisineChange("left")}><ChevronLeft /></Button>
        <span>{selectedCuisine}</span>
        <Button onClick={() => handleCuisineChange("right")}><ChevronRight /></Button>
      </div>

      {/* Allergies */}
      <div>
        <h3>Allergies</h3>
        {["Peanuts", "Gluten", "Dairy", "Shellfish"].map((allergy) => (
          <Badge
            key={allergy}
            onClick={() => toggleAllergy(allergy)}
            style={{
              cursor: "pointer",
              backgroundColor: selectedAllergies.includes(allergy) ? "lightcoral" : "lightgray",
              margin: "5px"
            }}
          >
            {allergy}
          </Badge>
        ))}
      </div>

      {/* Location */}
      <div>
        <h3>Location</h3>
        <Input
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <select value={radius} onChange={(e) => setRadius(e.target.value)}>
          <option value="10Mi">10 Miles</option>
          <option value="20Mi">20 Miles</option>
          <option value="30Mi">30 Miles</option>
        </select>
      </div>

      {/* Time Picker */}
      <div>
        <h3>Arrival Time</h3>
        <TimePicker value={arrivalTime} onChange={setArrivalTime} />
      </div>

      {/* Price Range */}
      <div>
        <h3>Price Range</h3>
        <Slider
          min={1}
          max={4}
          step={1}
          value={priceRange}
          onValueChange={setPriceRange}
        />
        <div>Selected: {priceRange}</div>
      </div>

      {/* Dietary */}
      <div>
        <h3>Dietary Restrictions</h3>
        {["Vegetarian", "Vegan", "Halal", "Kosher"].map((option) => (
          <Badge
            key={option}
            onClick={() => toggleDietary(option)}
            style={{
              cursor: "pointer",
              backgroundColor: dietary.includes(option) ? "lightgreen" : "lightgray",
              margin: "5px"
            }}
          >
            {option}
          </Badge>
        ))}
      </div>

      {/* Submit Button */}
      <Button style={{ marginTop: "20px" }} onClick={handleSubmit}>
        Submit Preferences
      </Button>
    </div>
  );
};
