# 🚚 Supply Chalao – Modern Supply Management System

**Supply Chalao** is a sleek, scalable, and user-friendly supply management web app built with the latest tech stack. Designed for fast-growing teams, it combines order tracking, messaging, and user settings — all in one beautiful, responsive interface.

---

## 🌟 Features

- **Intuitive Dashboard** for managing and tracking supply orders at a glance
- **Full CRUD Operations** for orders: create, read, update, and delete
- **Real-time Messaging System** for team collaboration
- **Secure User Authentication** powered by Supabase Auth
- **Responsive Design** for seamless experience on desktop and mobile
- **Modern UI** built with Next.js 14, Tailwind CSS, and `shadcn/ui`
- **Sleek Icons** using Lucide React

---

## 🚀 Tech Stack

- **Frontend:** Next.js 14, React, TypeScript
- **Backend:** Supabase (PostgreSQL, Auth, Realtime)
- **Styling:** Tailwind CSS, `shadcn/ui`
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended) or Netlify

---

## 🛠️ Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/supply-chalao.git
   cd supply-chalao
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Create a Supabase project**

   - Go to [supabase.com](https://supabase.com) and create a new project.

4. **Configure environment variables**

   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Fill in your Supabase credentials in `.env.local`:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
     ```

5. **Set up the database**

   - In the Supabase dashboard, go to SQL Editor.
   - Run the SQL script in `scripts/create-tables.sql` to set up tables and policies.

6. **Run the development server**

   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## 🧩 Database Schema

- **users:** User profiles and authentication
- **orders:** Supply orders with status, description, quantity, supplier, etc.
- **messages:** Team chat messages
- **settings:** User preferences

---

## 🚢 Deployment

### Vercel (Recommended)
- Import your repository to [Vercel](https://vercel.com/)
- Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel dashboard
- Deploy!

### Netlify
- Build the project: `npm run build`
- Deploy the `out` folder
- Set environment variables in Netlify dashboard

---

## 🤝 Contributing

1. Fork this repo
2. Create a feature branch
3. Make changes and commit
4. Create a pull request

---

## ❓ Support

For any help, create an issue in this repo or contact [your-email@example.com].

---

## 📄 License

MIT License

---

> Streamlining supply chains, one order at a time.
