# BookingClone Frontend TODO

This TODO is structured for both human reading and potential agent implementation. Tasks are organized by feature area and include checkboxes for tracking.

## 🚀 Setup
- [ ] Install dependencies:
  - `@shadcn/ui` components
  - `@tanstack/react-query` (optional, if using caching)
  - `zod`, `@hookform/resolvers`, `react-hook-form`
  - `mapbox-gl`, `@mapbox/mapbox-gl-geocoder`
  - `playwright` for E2E tests
  - Tailwind CSS (via shadcn) and any required plugins
- [ ] Create `.env.local` with `NEXT_PUBLIC_BACKEND_URL` and `NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN`.

## 🧱 Core Layout & Providers
- [ ] Configure `app/layout.tsx` with:
  - Fonts (geistSans, geistMono)
  - `<QueryClientProvider>` or other data provider
  - `<html>` and `<body>` wrappers with global classes
- [ ] Add global CSS (`globals.css`) and Tailwind config.

## 🗺️ Data Fetching Utilities
- [ ] Create `lib/api.ts` or `lib/fetchers/*.ts`:
  - `fetchHotels`, `fetchHotelById`, `fetchRoomsByHotel`, etc.
  - Use `fetch` with `process.env.NEXT_PUBLIC_BACKEND_URL`.
  - Parse responses with Zod schemas.
- [ ] Optionally setup React Query hooks in `lib/hooks.ts`.

## 🧭 Authentication
- [ ] Build `/login` and `/register` pages (client components).
- [ ] Forms with `react-hook-form + zod` validation.
- [ ] POST to `/user/guest` or `/user/staff` for registration.
- [ ] Store mock JWT in `localStorage` and create `useAuth` hook.
- [ ] Add middleware (`middleware.ts`) to redirect if unauthenticated.
- [ ] Add `UserContext` or similar for global user state.

## 🏨 Hotel Browsing & Details
- [ ] `app/page.tsx`: server component listing hotels.
- [ ] `app/hotels/[id]/page.tsx`: server component showing hotel info.
- [ ] Integrate Mapbox map on details page.
- [ ] Implement search/filter UI (location, price, type).
- [ ] Add pagination/infinite scroll for listings.

## 📅 Booking Flow
- [ ] Booking form component (client) with date picker, room selection.
- [ ] Validate dates and availability using Zod.
- [ ] POST booking to `/api/booking`.
- [ ] Confirmation page showing booking details.

## 👤 User Profile & Bookings
- [ ] Profile page `/profile`: show guest info and bookings.
- [ ] Fetch bookings via API and display list.
- [ ] Allow cancel (`DELETE /api/booking/{id}`) and view details.

## 🛠️ Staff Dashboard (optional)
- [ ] Add `/staff` area accessible by staff users.
- [ ] CRUD operations for hotels and rooms.
- [ ] Use React Query mutations or plain `fetch`.

## 🎨 UI Components & Styling
- [ ] Build reusable components using shadcn-ui:
  - Button, Card, Input, Form, Modal, Dialog, Toast
- [ ] Implement dark mode toggle.
- [ ] Add skeleton loaders and error alerts.

## 📍 Mapbox Integration
- [ ] Create `components/Map.tsx` for map display.
- [ ] Use geocoder in search page.
- [ ] Place hotel markers with popups.

## ✅ Validation & Error Handling
- [ ] Define Zod schemas for all API responses and forms.
- [ ] Add `error.tsx` and `loading.tsx` in app directory.
- [ ] Implement global error boundary.

## 🧪 Testing & CI
- [ ] Set up Playwright with config and sample tests:
  - login flow
  - hotel search
  - booking creation
- [ ] Create GitHub Actions workflow to run tests on push.

## 📦 Deployment & Production
- [ ] Configure `next.config.ts` for image domains, rewrites.
- [ ] Set up SEO metadata, `next-sitemap`, and robots.txt.
- [ ] Add environment-specific settings (production backend URL).
- [ ] Deploy to Vercel and test end-to-end.
- [ ] Add basic logging/monitoring (Sentry or similar).

## 🧾 Documentation
- [ ] Update `README.md` with setup, environment variables, and build instructions.
- [ ] Include screenshots or demo URL.
- [ ] Document API usage or link to backend Swagger.

---

This task list is suitable for both developers and automated agents. Each line can be treated as a separate implementation step. Tasks can be checked off as they are completed.