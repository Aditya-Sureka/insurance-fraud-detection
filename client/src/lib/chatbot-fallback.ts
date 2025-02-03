// Pre-defined responses for common fraud-related questions
const fallbackResponses = {
  keywords: {
    "identity theft": [
      "Identity theft in insurance occurs when someone uses stolen personal information to file false claims. To protect yourself: 1) Never share policy details online, 2) Regularly monitor your statements, 3) Use strong passwords, 4) Report suspicious activity immediately.",
      "For more detailed information about identity theft prevention, please visit our Education Center.",
    ],
    "suspicious activity": [
      "Common signs of suspicious activity include: 1) Unexpected policy changes, 2) Unrecognized claims, 3) Communications from unknown sources claiming to be your insurer. Always verify by contacting your insurance provider directly.",
    ],
    "report fraud": [
      "To report suspected insurance fraud: 1) Document all relevant details, 2) Contact your insurance provider's fraud hotline, 3) File a report with local law enforcement if necessary, 4) Keep records of all communications.",
    ],
    "prevention": [
      "Key fraud prevention tips: 1) Regularly review your policy documents, 2) Keep detailed records of all claims and communications, 3) Verify the credentials of insurance professionals, 4) Use secure passwords and never share sensitive information online.",
    ],
    "claim": [
      "When filing a claim, always: 1) Document everything thoroughly, 2) Submit accurate information, 3) Keep copies of all supporting documents, 4) Report any suspicious activity immediately to your insurance provider.",
    ],
  },
  default: [
    "I'm currently operating in offline mode. For immediate assistance with fraud-related questions, please check our Education Center or contact our support team. You can also find helpful resources in our Prevention Tips section.",
    "While I'm in offline mode, I can provide general guidance about fraud prevention and detection. For specific cases or detailed assistance, please reach out to our support team.",
  ]
};

export function getFallbackResponse(message: string): string {
  // Convert message to lowercase for matching
  const lowercaseMessage = message.toLowerCase();
  
  // Check for keyword matches
  for (const [keyword, responses] of Object.entries(keywords)) {
    if (lowercaseMessage.includes(keyword)) {
      return responses[Math.floor(Math.random() * responses.length)];
    }
  }
  
  // Return a random default response if no keywords match
  return fallbackResponses.default[Math.floor(Math.random() * fallbackResponses.default.length)];
}
