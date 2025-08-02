import { useState } from "react";
import { SignUpForm } from "@/components/SignUpForm";
import { DiscoveryScreen } from "@/components/DiscoveryScreen";
import { ThankYouScreen } from "@/components/ThankYouScreen";

type Screen = "signup" | "discovery" | "thankyou";

interface UserData {
  email: string;
  phone: string;
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("signup");
  const [userData, setUserData] = useState<UserData | null>(null);

  // Convert slider numeric value to readable price range text
  const mapPrice = (priceValue: number) => {
    switch (priceValue) {
      case 1: return "$ (10-20)";
      case 2: return "$$ (20-30)";
      case 3: return "$$$ (30-50)";
      case 4: return "$$$$ (50+)";
      default: return "N/A";
    }
  };

  // Handle user signup info and move to the next screen
  const handleSignUpNext = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("discovery");
  };

  // Collect preferences, build JSON, and send to backend
  const handleDiscoverySubmit = async (preferences: any) => {
    const result = {
      user: userData,
      preferences: {
        cuisine: preferences.selectedCuisine,
        allergies: preferences.selectedAllergies,
        location: {
          address: preferences.location,
          radius: preferences.radius
        },
        arrivalTime: `${preferences.arrivalTime.hour}:${preferences.arrivalTime.minute} ${preferences.arrivalTime.period}`,
        priceRange: mapPrice(preferences.priceRange[0]),
        dietary: preferences.dietary
      }
    };

    try {
      // ✅ Send JSON to backend API
      const response = await fetch("https://your-backend-api.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(result)
      });

      if (!response.ok) {
        console.error("Failed to send data to backend");
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }

    // Show Thank You screen
    setCurrentScreen("thankyou");
  };

  // Restart the flow
  const handleStartOver = () => {
    setCurrentScreen("signup");
    setUserData(null);
  };

  switch (currentScreen) {
    case "signup":
      return <SignUpForm onNext={handleSignUpNext} />;

    case "discovery":
      return <DiscoveryScreen onSubmit={handleDiscoverySubmit} />;

    case "thankyou":
      return <ThankYouScreen onStartOver={handleStartOver} />;

    default:
      return <SignUpForm onNext={handleSignUpNext} />;
  }
};

export default Index;

