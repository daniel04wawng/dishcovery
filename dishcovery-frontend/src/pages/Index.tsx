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

  const handleSignUpNext = (data: UserData) => {
    setUserData(data);
    setCurrentScreen("discovery");
  };

  const handleDiscoverySubmit = (preferences: any) => {
    console.log("User data:", userData);
    console.log("Preferences:", preferences);
    setCurrentScreen("thankyou");
  };

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
