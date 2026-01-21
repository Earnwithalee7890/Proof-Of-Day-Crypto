# Deployment Guide

## Prerequisites
- Node.js 18+
- Vercel CLI
- Supabase account

## Environment Variables
Required variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
NEYNAR_API_KEY=your_neynar_key
```

## Deployment Steps

### Development
```bash
npm run dev
```

### Production (Vercel)
```bash
vercel --prod
```

## Post-Deployment
1. Verify environment variables
2. Test critical flows
3. Check error monitoring
4. Validate API endpoints

## Rollback
```bash
vercel rollback
```
