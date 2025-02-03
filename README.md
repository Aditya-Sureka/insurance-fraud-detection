# Insurance Fraud Detection Platform

An advanced web-based insurance fraud detection platform leveraging AI technologies to provide proactive fraud prevention and user-friendly risk management.

## Features

- React.js frontend with interactive dashboards
- AI-powered fraud detection algorithms
- Real-time claim tracking and risk assessment
- OpenAI-integrated chatbot for fraud query support
- Responsive design for multiple device support

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya-Sureka/insurance-fraud-detection.git
   cd insurance-fraud-detection
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the values in `.env` with your actual credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open http://localhost:5000 in your browser

## Environment Variables

Make sure to set up the following environment variables in your `.env` file:

- `OPENAI_API_KEY`: Your OpenAI API key for the chatbot functionality
- `VITE_OPENAI_API_KEY`: Same OpenAI API key for frontend access
- `SESSION_SECRET`: A random string for session encryption

## Tech Stack

- Frontend: React.js with TypeScript
- Backend: Express.js
- UI Components: shadcn/ui
- Authentication: Passport.js
- AI Integration: OpenAI API
- Charts: Recharts

## Development

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run start`: Start production server

## License

MIT License - feel free to use this code for your own projects!
