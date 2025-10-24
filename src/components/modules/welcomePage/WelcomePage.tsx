import { useState, useEffect } from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router";
import animation from "../../../assets/animation/Welcome.json";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleGetStarted = () => {
    navigate("/signin");
  };

  return (
    <div className="min-h-screen bg-[#181024] flex items-center justify-center px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-6xl space-y-8 md:space-y-0">
        {/* Left Side Content */}
        <div
          className={`w-full md:w-1/2 space-y-8 text-center md:text-left transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-10"
          }`}
        >
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-yellow-600">
              Grouply
            </h1>
            <p className="text-xl text-gray-300">
              All-in-One Professional Collaboration Platform
            </p>
          </div>

          {/* Main Description */}
          <p className="text-lg text-white leading-relaxed">
            Grouply combines powerful messaging, smart task management, and
            seamless team collaboration into one unified platform. Perfect for
            modern teams who value efficiency and productivity.
          </p>

          {/* Features List */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white text-lg">
                Real-time Group & Private Chat
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white text-lg">Smart Task Management</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white text-lg">
                Team Collaboration Spaces
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-yellow-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">✓</span>
              </div>
              <span className="text-white text-lg">File Sharing & Storage</span>
            </div>
          </div>

          {/* Coming Soon Features */}
          <div className="bg-[#2d1a4d] rounded-xl p-4 border border-purple-500/30">
            <h4 className="text-yellow-500 font-semibold mb-3 text-lg">
              ✨ Coming Soon
            </h4>
            <div className="flex flex-wrap gap-3 text-white text-sm">
              <span className="bg-purple-600/30 px-3 py-2 rounded-full">
                Video Calls
              </span>
              <span className="bg-purple-600/30 px-3 py-2 rounded-full">
                Personal Reminders
              </span>
              <span className="bg-purple-600/30 px-3 py-2 rounded-full">
                Smart Notifications
              </span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleGetStarted}
            className="bg-yellow-600 text-white py-4 px-8 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl w-full md:w-auto"
          >
            Get Started
          </button>

          {/* User Types */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <div className="flex-1 bg-[#2d1a4d] rounded-xl p-4 border border-yellow-600/30">
              <div className="text-yellow-500 font-semibold mb-2 text-lg">
                Admin
              </div>
              <p className="text-gray-300 text-sm">
                Create teams, assign tasks, manage projects
              </p>
            </div>
            <div className="flex-1 bg-[#2d1a4d] rounded-xl p-4 border border-purple-500/30">
              <div className="text-purple-400 font-semibold mb-2 text-lg">
                Team Member
              </div>
              <p className="text-gray-300 text-sm">
                Collaborate, communicate, track progress
              </p>
            </div>
          </div>
        </div>

        {/* Right Side Lottie Animation */}
        <div
          className={`w-full md:w-1/2 flex justify-center items-center transition-all duration-1000 delay-300 ${
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
          }`}
        >
          <Lottie
            animationData={animation}
            loop={true}
            className="w-full max-w-xl"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
