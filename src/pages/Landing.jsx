import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  BookOpen,
  Users,
  Star,
  Zap,
  Shield,
} from "lucide-react";
import { Button } from "../components/common/Button";
import { Card } from "../components/common/Card";

export const Landing = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Chat",
      description:
        "Get instant answers to your study questions with our AI-powered assistant that understands your learning needs.",
    },
    {
      icon: BookOpen,
      title: "Save & Organize",
      description:
        "Keep track of important conversations and resources in your personalized dashboard for easy access.",
    },
    {
      icon: Users,
      title: "Student-Focused",
      description:
        "Designed specifically for students with features that support your academic journey and study goals.",
    },
  ];

  const benefits = [
    { icon: Zap, text: "Instant answers to complex questions" },
    { icon: BookOpen, text: "Curated educational resources" },
    { icon: Shield, text: "Safe and secure learning environment" },
    { icon: Star, text: "24/7 study support available" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent">
                StudySphere
              </span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your personal space for smarter studying.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/chat">
                <Button size="lg" icon={ArrowRight} iconPosition="right">
                  Start Chatting
                </Button>
              </Link>
            </div>

            {/* Hero Illustration */}
            <div className="relative mx-auto max-w-md sm:max-w-lg">
              <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-teal-500 rounded-full opacity-20 animate-pulse"></div>
                <div
                  className="absolute inset-4 bg-gradient-to-br from-blue-500 to-teal-600 rounded-full opacity-30 animate-pulse"
                  style={{ animationDelay: "1s" }}
                ></div>
                <div
                  className="absolute inset-8 bg-gradient-to-br from-blue-600 to-teal-700 rounded-full opacity-40 animate-pulse"
                  style={{ animationDelay: "2s" }}
                ></div>
                <div className="absolute inset-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center">
                  <MessageCircle className="w-16 h-16 text-blue-600 dark:text-teal-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to excel
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              StudySphere combines AI-powered assistance with intuitive design
              to create the perfect study companion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why students choose StudySphere
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                      <benefit.icon className="w-4 h-4 text-teal-600 dark:text-teal-300" />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/chat">
                  <Button size="lg">Get Started Now</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-teal-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to transform your studying?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of students who are already studying smarter with
            StudySphere.
          </p>
          <Link to="/chat">
            <Button size="lg" className="">
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  StudySphere
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                Your personal space for smarter studying. Empowering students
                worldwide.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Resources
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2025 StudySphere. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
