# apex-core - Frontend

This is the Next.js 14 frontend for apex-core.

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Environment Variables

Copy `.env.local` and update the values:

- `NEXT_PUBLIC_API_URL`: The URL of your backend API (default: http://localhost:4000/api)

## Features

### Authentication
- Login page: `/login`
- Register page: `/register`
- Dashboard: `/dashboard` (protected route)
- Auth context with JWT token management

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Axios (API client)
- Lucide React (icons)

## Project Structure

```
web/
├── src/
│   ├── app/          # Next.js app router pages
│   ├── context/      # React contexts (Auth)
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript types
│   └── lib/          # Utilities (API client, helpers)
├── public/           # Static assets
└── package.json
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
