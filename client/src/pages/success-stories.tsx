import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const successStories = [
  {
    title: "Major Identity Theft Ring Uncovered",
    description:
      "Our AI system identified a pattern of suspicious claims, leading to the discovery of a large-scale identity theft operation.",
    image: "https://images.unsplash.com/photo-1455849318743-b2233052fcff",
    impact: "$2.5M in prevented fraud",
  },
  {
    title: "Preventing False Medical Claims",
    description:
      "Advanced pattern recognition helped identify a network of fraudulent medical claims, protecting both insurers and legitimate policyholders.",
    image: "https://images.unsplash.com/photo-1496449903678-68ddcb189a24",
    impact: "98% accuracy rate",
  },
  {
    title: "Real-time Fraud Prevention",
    description:
      "Implementation of real-time monitoring system led to immediate detection of suspicious activity, preventing potential losses.",
    image: "https://images.unsplash.com/photo-1504805572947-34fad45aed93",
    impact: "60% reduction in fraud attempts",
  },
];

export default function SuccessStories() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Success Stories</h1>
        <p className="mt-4 text-xl text-gray-600">
          Real cases where our AI-powered system made a difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {successStories.map((story, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="aspect-w-16 aspect-h-9">
              <img
                src={story.image}
                alt={story.title}
                className="object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{story.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">{story.description}</p>
              <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {story.impact}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
