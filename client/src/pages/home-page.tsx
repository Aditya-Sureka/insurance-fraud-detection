import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Shield, TrendingUp, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-primary/90 to-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-6">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                AI-Powered Insurance Fraud Detection
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Protect your business with our state-of-the-art fraud detection system.
                Leveraging AI and machine learning to ensure trust and security in insurance.
              </p>
              <div className="mt-10">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-6">
              <div className="aspect-w-5 aspect-h-3">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
                  alt="Insurance Professional"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose Our Platform?
            </h2>
          </div>
          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Shield className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Advanced Protection
              </h3>
              <p className="mt-2 text-base text-gray-600 text-center">
                AI-powered detection algorithms that identify suspicious patterns and
                anomalies in real-time.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <TrendingUp className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Proven Results
              </h3>
              <p className="mt-2 text-base text-gray-600 text-center">
                Track record of reducing fraud attempts by up to 60% while maintaining
                customer satisfaction.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-6 text-xl font-semibold text-gray-900">
                Expert Support
              </h3>
              <p className="mt-2 text-base text-gray-600 text-center">
                Dedicated team of fraud prevention experts available 24/7 to assist
                with investigations.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
