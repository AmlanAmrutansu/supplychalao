# Supply Chalao - Supply Management System

A modern, full-stack supply management website built with Next.js and Supabase.

## 🚨 IMPORTANT: Setup Required

Before running the application, you **MUST** configure your Supabase environment variables:

### Quick Setup Steps:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Get your credentials** from Project Settings → API
3. **Create `.env.local`** in your project root:
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   \`\`\`
4. **Run the database script** from `scripts/create-tables.sql` in your Supabase SQL Editor
5. **Start the development server**: `npm run dev`

## Features

- 🔐 **Authentication**: Secure email/password authentication with Supabase
- 📦 **Order Management**: Create, read, update, and delete supply orders
- 💬 **Real-time Messaging**: Team communication with live updates
- ⚙️ **Settings Management**: User profile and application preferences
- 📱 **Responsive Design**: Works perfectly on desktop and mobile
- 🔄 **Real-time Updates**: Live updates for orders and messages
- 🎨 **Modern UI**: Clean, light-themed interface with Tailwind CSS

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Styling**: Tailwind CSS, shadcn/ui components
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd supply-chalao
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **⚠️ CRITICAL: Set up environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   **You MUST fill in your Supabase credentials:**
   \`\`\`env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   \`\`\`
   
   **Where to find these values:**
   - Go to your Supabase project dashboard
   - Navigate to Settings → API
   - Copy the "Project URL" and "Project API keys" → "anon public"

4. **Set up the database**
   - Go to your Supabase project dashboard
   - Navigate to the SQL Editor
   - Copy and run the entire SQL script from `scripts/create-tables.sql`
   - This creates all necessary tables and security policies

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## ⚠️ Troubleshooting

### "supabaseUrl is required" Error
This means your environment variables are not configured. Make sure:
- You have a `.env.local` file in your project root
- The file contains both `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- You've restarted your development server after adding the variables

### Database Errors
Make sure you've run the SQL script from `scripts/create-tables.sql` in your Supabase dashboard.

## Database Schema

The application uses the following tables:

- **users**: User profiles and information
- **orders**: Supply orders with status tracking
- **messages**: Team communication messages
- **settings**: User preferences and app settings

## Deployment

### Netlify

1. Build the project:
   \`\`\`bash
   npm run build
   \`\`\`

2. Deploy the `out` folder to Netlify

3. **IMPORTANT**: Set environment variables in Netlify dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. **IMPORTANT**: Set environment variables in Vercel dashboard
3. Deploy automatically on push

## Features Overview

### Authentication
- Email/password registration and login
- Protected routes with automatic redirects
- User session management

### Dashboard
- Welcome message with user name
- Order overview with status badges
- Quick actions for creating/editing orders
- Real-time order updates

### Order Management
- Create new orders with title, description, and status
- Edit existing orders
- Delete orders with confirmation
- Status tracking (Pending, In Progress, Delivered, Cancelled)

### Messaging System
- Real-time team chat
- Message history
- User identification in messages
- Auto-scroll to latest messages

### Settings
- Profile management (name, email)
- Password updates
- Application preferences
- Notification settings

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For support, please contact [your-email@example.com] or create an issue in the repository.

## License

This project is licensed under the MIT License.
