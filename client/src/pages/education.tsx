import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const educationalContent = [
  {
    title: "Common Types of Insurance Fraud",
    content: [
      {
        question: "What is Identity Theft in Insurance?",
        answer:
          "Identity theft in insurance occurs when someone uses stolen personal information to file false claims or obtain coverage under someone else's name.",
      },
      {
        question: "Understanding False Claims",
        answer:
          "False claims involve intentionally misrepresenting facts about an incident or injury to obtain insurance benefits fraudulently.",
      },
      {
        question: "Policy Application Fraud",
        answer:
          "This involves providing false information on insurance applications to obtain lower premiums or coverage that would otherwise be denied.",
      },
    ],
  },
  {
    title: "Prevention Methods",
    content: [
      {
        question: "How to Protect Your Identity",
        answer:
          "Regularly monitor your insurance statements, keep personal information secure, and report suspicious activity immediately.",
      },
      {
        question: "Red Flags to Watch For",
        answer:
          "Be alert to unsolicited insurance offers, pressure to sign documents quickly, or requests for unusual payment methods.",
      },
    ],
  },
];

export default function Education() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Education Center</h1>
        <p className="mt-4 text-xl text-gray-600">
          Learn about insurance fraud and how to protect yourself
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {educationalContent.map((section, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{section.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {section.content.map((item, itemIndex) => (
                  <AccordionItem key={itemIndex} value={`item-${itemIndex}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Resources and Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Report Fraud</h3>
              <p className="text-gray-600">
                If you suspect insurance fraud, contact our dedicated hotline or
                submit a report through our secure online portal.
              </p>
            </div>
            <div className="p-6 bg-primary/5 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Stay Informed</h3>
              <p className="text-gray-600">
                Subscribe to our newsletter for the latest updates on fraud
                prevention and security best practices.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
