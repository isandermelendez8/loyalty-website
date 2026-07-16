# LOYALTY - Premium Beauty & Lifestyle Services

A production-ready luxury website with a complete appointment booking and notification system.

## Features

- **Bilingual** (English / Spanish) with language switcher
- **Dark luxury theme** with gold accents, glassmorphism, Framer Motion animations
- **Full booking system** with Supabase database, availability rules, email notifications
- **Admin dashboard** at `/admin` for managing appointments and employees
- **Automatic reminders** via Vercel Cron (24h before appointment)
- **Email system** via Resend (customer confirmation, employee notification, reminders)
- **Formspree fallback** for contact and booking notifications
- **WhatsApp integration** for instant messaging
- **Image gallery** with lightbox, reviews carousel, Google Maps

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, Tailwind CSS, Framer Motion |
| Database | Supabase (PostgreSQL) |
| Email | Resend API |
| Hosting | Vercel |
| Automation | Vercel Cron Jobs |
| Fallback | Formspree |

## Quick Start

```bash
npm install
cp .env.example .env.local
# Fill in your API keys (see Setup below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin dashboard: [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Setup Guide (Free Tier)

### 1. Supabase (Database)

1. Create a free project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Go to **Settings > API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY`

### 2. Resend (Email)

1. Create a free account at [resend.com](https://resend.com) (100 emails/day free)
2. Add and verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key → `RESEND_API_KEY`
4. Set `RESEND_FROM_EMAIL=LOYALTY <bookings@yourdomain.com>`
5. Set `ADMIN_EMAIL=your-email@example.com`

### 3. Admin Dashboard

Set a secure password in `.env.local`:
```
ADMIN_PASSWORD=your_secure_password_here
ADMIN_SECRET=random_string_for_session_signing
```

Access at `/admin/login`

### 4. Vercel Cron (Reminders)

Set a secret for the cron endpoint:
```
CRON_SECRET=your_random_cron_secret
```

The cron runs daily at 9:00 AM UTC and sends 24h reminders to customers and employees.

When deploying to Vercel, add `CRON_SECRET` as an environment variable. Vercel automatically reads `vercel.json` for cron configuration.

### 5. Formspree (Fallback)

Optional backup for email notifications:
1. Create form at [formspree.io](https://formspree.io)
2. Set `NEXT_PUBLIC_FORMSPREE_ID=your_form_id`

---

## Appointment Rules

| Rule | Value |
|------|-------|
| Duration | 4 hours per appointment |
| Max per day | 2 appointments |
| Slot 1 | 10:00 AM - 2:00 PM |
| Slot 2 | 3:00 PM - 7:00 PM |
| Closed | Sundays |
| Conflict prevention | Database unique constraint on date + time |

When both slots are booked for a day, that date is automatically hidden from the calendar.

---

## Email Flow

```
Customer books appointment
        │
        ├──► Customer receives confirmation email (Resend)
        ├──► Employee receives notification email (Resend)
        ├──► Admin receives notification email (Resend)
        └──► Formspree fallback (if Resend not configured)

24 hours before appointment (Vercel Cron)
        │
        ├──► Customer receives reminder email
        └──► Employee receives reminder email
```

---

## API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/bookings` | POST | Public | Create appointment |
| `/api/bookings/availability` | GET | Public | Check available slots |
| `/api/employees` | GET | Public | List active employees |
| `/api/contact` | POST | Public | Contact form |
| `/api/admin/auth` | POST/DELETE/GET | Password | Admin login/logout |
| `/api/admin/appointments` | GET | Admin | List appointments |
| `/api/admin/appointments/[id]` | PATCH/DELETE | Admin | Update/cancel |
| `/api/admin/employees` | GET/POST | Admin | Manage employees |
| `/api/admin/employees/[id]` | PATCH | Admin | Update employee |
| `/api/cron/reminders` | GET | CRON_SECRET | Send 24h reminders |

---

## Deploy to Vercel

1. Push to GitHub
2. Import at [vercel.com](https://vercel.com)
3. Add ALL environment variables from `.env.example`
4. Deploy

Vercel Cron requires a **Pro plan** for production cron jobs. On the free Hobby plan, you can manually trigger reminders:
```bash
curl -H "Authorization: Bearer YOUR_CRON_SECRET" https://your-site.vercel.app/api/cron/reminders
```

Alternatively, use a free external cron service like [cron-job.org](https://cron-job.org) to hit the endpoint daily.

---

## Project Structure

```
src/
├── app/
│   ├── api/           # Booking, admin, cron, contact APIs
│   ├── admin/         # Admin dashboard pages
│   └── page.tsx       # Main website
├── components/
│   ├── sections/      # Hero, Services, Booking, etc.
│   ├── admin/         # Admin UI components
│   ├── modals/        # Popups
│   └── ui/            # Shared UI
├── data/              # Editable static data
├── lib/
│   ├── booking/       # Rules, service, types
│   ├── email/         # Resend + HTML templates
│   ├── supabase/      # Database clients
│   └── auth/          # Admin authentication
├── i18n/              # Translations EN/ES
└── types/             # TypeScript types
supabase/
└── schema.sql         # Database schema + seed data
```

## Editable Data Files

| File | Content |
|------|---------|
| `src/data/business.ts` | Phone, email, address, hours |
| `src/data/services.ts` | Services, prices, descriptions |
| `src/data/employees.ts` | Fallback employee data |
| `src/data/reviews.ts` | Customer reviews |
| `src/data/packages.ts` | Packages and promotions |
| `src/data/gallery.ts` | Gallery images |
| `src/i18n/translations.ts` | All UI text EN/ES |

---

## License

Private — LOYALTY Studio
