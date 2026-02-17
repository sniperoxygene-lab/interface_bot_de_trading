# 🚀 Binance Crypto Dashboard

A professional, secure, and premium-designed investment dashboard connected to Binance Futures API.

## 🌟 Features
- **Real-time Capital Tracking**: Syncs USDT & EUR value from Binance Futures.
- **Investor Management**: Track distinct investors with "Unit Share" logic (dynamic share value).
- **Performance Metrics**: ROI, PnL, Drawdown.
- **Security**: 
  - Read-Only API keys.
  - Hashed investor PINs.
  - Secure Cron Job for data syncing.
- **Tech Stack**: Next.js 14, Tailwind CSS, Prisma, Supabase.

## 🛠️ Setup & Deployment

### 1. Database (Supabase)
1. Create a new Supabase project.
2. Get your `DATABASE_URL` and `DIRECT_URL` from Settings -> Database.

### 2. Environment Variables
Rename `.env` to `.env.local` (for local dev) or set these in Vercel:

```bash
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."
BINANCE_API_KEY="your_api_key"
BINANCE_API_SECRET="your_api_secret"
CRON_SECRET="make_up_a_secure_password"
```

### 3. Local Installation
```bash
npm install
npx prisma db push  # Pushes schema to Supabase
npm run dev
```

### 4. Vercel Deployment (Recommended)
1. Push this code to GitHub.
2. Import project into Vercel.
3. Add the Environment Variables in Vercel.
4. Redeploy.
5. **Setup Cron Job**:
   - Vercel automatically detects `vercel.json` (if added) or you can use a service like GitHub Actions or standard Cron logic.
   - We use Vercel Cron. The `app/api/cron/sync-binance/route.ts` is ready.
   - Go to Vercel Dashboard -> Settings -> Cron Jobs to verify.

## 📂 Project Structure
- `/app`: Next.js App Router pages and API routes.
- `/components`: UI components (Cards, Charts).
- `/lib`: Backend logic (Binance client, Financial math).
- `/prisma`: Database schema.

## 🔐 Security Note
- Never commit your `.env` file.
- The `CRON_SECRET` protects your sync endpoint from unauthorized calls.
