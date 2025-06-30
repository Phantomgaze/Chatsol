# ChatSol - AI-Powered Conversational Platform

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ChatSol-brightgreen)](https://chatsol.vercel.app/)

ChatSol is a modern, full-stack conversational AI platform that enables seamless interactions between businesses and their customers through intelligent chatbots, appointment scheduling, and payment processing.

## 🌟 Features

- 🤖 AI-Powered Chatbot with natural language processing
- 📅 Integrated appointment scheduling system
- 💳 Secure payment processing with Stripe
- 🔐 User authentication with Clerk
- 📊 Analytics dashboard for business insights
- 🎨 Modern, responsive UI with dark/light mode
- 🔄 Real-time updates with WebSockets

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Shadcn/UI** - Beautifully designed components
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Unstyled, accessible UI components
- **Lenis** - Buttery smooth scrolling
- **Framer Motion** - Animation library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Type-safe database ORM
- **PostgreSQL** - Primary database
- **Stripe** - Payment processing
- **Clerk** - Authentication and user management
- **WebSockets** - Real-time communication

### DevOps
- **Vercel** - Hosting and deployment
- **GitHub** - Version control
- **Prisma Migrate** - Database migrations
- **Environment Variables** - Secure configuration

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- PostgreSQL database
- Stripe account
- Clerk account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chatsol.git
   cd chatsol
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   # or
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/chatsol"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. Run database migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Deployment

The application is configured for seamless deployment on Vercel:

1. Push your code to a GitHub/GitLab repository
2. Import the project on Vercel
3. Add your environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fchatsol&env=DATABASE_URL,NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,NEXT_PUBLIC_APP_URL&envDescription=Required%20environment%20variables&envLink=https%3A%2F%2Fgithub.com%2Fyourusername%2Fchatsol%23environment-variables)

## 📚 Documentation

For detailed documentation, please refer to the [Documentation Wiki](https://github.com/yourusername/chatsol/wiki).

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Shadcn/UI](https://ui.shadcn.com/)
- [Stripe Documentation](https://stripe.com/docs)
- [Clerk Documentation](https://clerk.com/docs)
