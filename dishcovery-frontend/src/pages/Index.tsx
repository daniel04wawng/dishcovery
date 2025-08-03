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

  // ✅ Map price numeric value to readable text
  const mapPrice = (priceValue: number) => {
    switch (priceValue) {
      case 1: return "$ (10-20)";
      case 2: return "$$ (20-30)";
      case 3: return "$$$ (30-50)";
      case 4: return "$$$$ (50+)";
      default: return "Not specified";
    }
  };

  // ✅ Handle user signup info and move to the next screen
  const handleSignUpNext = (data: UserData) => {
    console.log("✅ Signup data received:", data);
    setUserData(data);
    setCurrentScreen("discovery");
  };

  // ✅ Collect preferences, build JSON safely, and send to backend
  const handleDiscoverySubmit = async (preferences: any) => {
    console.log("✅ Discovery preferences received:", preferences);

    // Fallback values to avoid undefined errors
    const safeArrivalTime = preferences.arrivalTime
      ? `${preferences.arrivalTime.hour}:${preferences.arrivalTime.minute} ${preferences.arrivalTime.period}`
      : "Not specified";

    const safeCuisine = preferences.selectedCuisine || "Not specified";
    const safeAllergies = preferences.selectedAllergies || [];
    const safeLocation = preferences.location || "Not specified";
    const safeRadius = preferences.radius || "Not specified";
    const safePrice = preferences.priceRange?.[0]
      ? mapPrice(preferences.priceRange[0])
      : "Not specified";
    const safeDietary = preferences.dietary || [];

    // ✅ Build final JSON payload
    const result = {
      user: userData || { email: "Not provided", phone: "Not provided" },
      preferences: {
        cuisine: safeCuisine,
        allergies: safeAllergies,
        location: {
          address: safeLocation,
          radius: safeRadius,
        },
        arrivalTime: safeArrivalTime,
        priceRange: safePrice,
        dietary: safeDietary,
      },
    };

    console.log("✅ Final JSON payload:", result);

    try {
      const response = await fetch("https://yuvrajsarda.app.n8n.cloud/webhook/726bef14-51c6-47a0-a801-134ce8b79527", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result),
      });

      if (!response.ok) {
        console.error("❌ Failed to send data to backend");
      } else {
        console.log("✅ Data successfully sent to backend");
      }
    } catch (error) {
      console.error("❌ Error sending data:", error);
    }

    // ✅ Move to thank you screen
    setCurrentScreen("thankyou");
  };

  // ✅ Restart the flow
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
