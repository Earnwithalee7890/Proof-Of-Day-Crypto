# Architecture Overview

This document provides an overview of the Proof of Day architecture and design decisions.

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Frontend (Next.js)                        │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Components │  │    Hooks    │  │        Utils            │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                       API Routes (Next.js)                       │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────────┐  │
│  │  Check-In   │  │  Campaigns  │  │     Notifications       │  │
│  └─────────────┘  └─────────────┘  └─────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│    Supabase     │  │     Neynar      │  │    Base Chain   │
│    (Database)   │  │   (Farcaster)   │  │   (On-chain)    │
└─────────────────┘  └─────────────────┘  └─────────────────┘
```

## Directory Structure

```
proof-of-day/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # Base UI components
│   └── *.tsx             # Feature components
├── contracts/            # Smart contract ABIs
├── hooks/                # Custom React hooks
├── lib/                  # Core libraries
├── types/                # TypeScript types
└── utils/                # Utility functions
```

## Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animations

### Blockchain
- **wagmi** - React hooks for Ethereum
- **viem** - TypeScript Ethereum library
- **RainbowKit** - Wallet connection

### Farcaster Integration
- **Farcaster Frame SDK** - Mini app support
- **Neynar SDK** - Farcaster data API

### Backend
- **Supabase** - Database and auth
- **Vercel** - Hosting and serverless

## Design Principles

### 1. Mobile-First
All components are designed for mobile screens first, then enhanced for larger screens.

### 2. Progressive Enhancement
Core functionality works without JavaScript, enhanced with client-side interactivity.

### 3. Optimistic Updates
UI updates immediately, with rollback on error for better perceived performance.

### 4. Type Safety
Full TypeScript coverage with strict mode enabled.

## Data Flow

### Check-In Flow
1. User initiates check-in
2. Frontend validates eligibility
3. API records check-in in Supabase
4. Smart contract emits event
5. UI updates with new streak

### Campaign Flow
1. Creator submits campaign
2. Funds deposited to contract
3. Users join campaign
4. Verification via Farcaster Hub
5. Rewards distributed on-chain

## Security Considerations

- All user inputs validated server-side
- Rate limiting on all API endpoints
- Signature verification for sensitive operations
- Smart contract audited for vulnerabilities

## Performance Optimizations

- Static page generation where possible
- Image optimization via Next.js
- Code splitting by route
- Aggressive caching headers
