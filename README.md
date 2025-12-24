# 🔵 Proof Of Day

<div align="center">

**The Daily Onchain Ritual for Building Habits & Earning Rewards**

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Base](https://img.shields.io/badge/Base-Mainnet-0052FF?style=for-the-badge&logo=coinbase)](https://base.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Wagmi](https://img.shields.io/badge/Wagmi-2.14-black?style=for-the-badge)](https://wagmi.sh)

*Show up. Build streaks. Earn onchain.*

[Live Demo](#) • [Documentation](#) • [Smart Contract](https://basescan.org/address/0x44b80503aec711f5f36958604d79547adc7d07e)

</div>

---

## 🌟 What is Proof Of Day?

**Proof Of Day** is a premium daily check-in application built on Base mainnet that rewards users for showing up consistently. It's proof that you showed up today, recorded onchain forever.

### The Concept

In a world where attention spans are shrinking, **Proof Of Day** helps you build lasting habits through:
- 🎯 **Daily commitment** - Check in once every 24 hours
- 🔥 **Streak building** - Track consecutive days onchain  
- 💎 **Real rewards** - Earn ETH for each check-in
- 📱 **Social proof** - Share achievements on Farcaster

---

## ✨ Key Features

### 🔵 Fully Onchain
- All data stored on Base mainnet
- Transparent smart contract logic
- Immutable proof of your commitment
- No centralized database

### 🎨  Premium UI/UX
- **Glassmorphism** design with Base blue theme
- **Animated backgrounds** with floating particles
- **Confetti celebrations** on successful check-ins
- **Smooth animations** and micro-interactions
- **Mobile-responsive** across all devices

### 🔥 Streak System
- Build consecutive day streaks
- **Milestone achievements**:
  - 🌱 Getting Started (0-2 days)
  - 💪 Warming Up (3-6 days)
  - ⚡ Hot Streak (7-29 days)
  - 🔥 On Fire (30-99 days)
  - 👑 Legendary (100+ days)

### 💰 Reward Mechanism
- Earn ETH rewards for each daily check-in
- Accumulate rewards over time
- Claim anytime to your wallet
- Gas-efficient transactions on Base

### 📱 Farcaster Native
- **Auto-fetch Farcaster profile** - Shows username, PFP, and badge
- **Basename support** - Displays ENS on Base
- **One-click sharing** - Post achievements to Farcaster
- **Social verification** - Link wallet to Farcaster identity

### 🔐 Web3 Integration
- **RainbowKit** for seamless wallet connection
- **wagmi v2** for modern Web3 hooks
- **viem** for type-safe Ethereum interactions
- Support for all major wallets

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript 5.7 |
| **Styling** | Tailwind CSS with custom animations |
| **Web3** | wagmi v2 + viem + RainbowKit |
| **Blockchain** | Base Mainnet (Ethereum L2) |
| **State Management** | TanStack Query |
| **Social** | Neynar SDK (Farcaster) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- MetaMask or compatible Web3 wallet
- Base mainnet ETH (for transactions)

### Installation

```bash
# Clone the repository
git clone https://github.com/Earnwithalee7890/Proof-Of-Day-Crypto.git

# Navigate to project
cd Proof-Of-Day-Crypto

# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local and add your API keys

# Run development server
npm run dev
```

Visit `http://localhost:3000` and connect your wallet!

### Environment Variables

Create `.env.local` with:

```env
# WalletConnect Project ID (from https://cloud.walletconnect.com)
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id

# Neynar API Key (from https://neynar.com)
NEXT_PUBLIC_NEYNAR_API_KEY=your_neynar_key
```

---

## 📝 Smart Contract

**Deployed on Base Mainnet**: [`0x44b80503aec711f5f36958604d79547adc7d07e`](https://basescan.org/address/0x44b80503aec711f5f36958604d79547adc7d07e)

### Core Functions

```solidity
// Check in once every 24 hours
function checkIn() external

// Claim accumulated rewards
function claimRewards() external

// View user stats
function users(address) external view returns (
    uint256 lastCheckIn,
    uint256 streak,
    uint256 pendingRewards
)
```

### Contract Features
- ⏰ 24-hour check-in interval enforcement
- 🔥 Automatic streak tracking
- 💎 Reward accumulation per check-in
- 🔒 Secure and audited logic
- ⛽ Gas-optimized for Base

---

## 🎯 How It Works

### 1. Connect Wallet
Connect your Web3 wallet (MetaMask, Coinbase Wallet, etc.) to Base mainnet.

### 2. Check In Daily
Click the glowing "Check In Now" button once every 24 hours to record your proof onchain.

### 3. Build Your Streak
Maintain consecutive days to build your streak and unlock milestone achievements.

### 4. Earn Rewards
Each check-in earns you ETH rewards that accumulate in your account.

### 5. Claim Anytime
Withdraw your accumulated rewards to your wallet whenever you want.

### 6. Share Your Progress
Post your achievements to Farcaster and inspire others to join!

---

## 🌈 Design Philosophy

**Proof Of Day** was designed with three core principles:

### 1. **Premium First**
Every interaction should feel premium and delightful. From the glassmorphism effects to the confetti celebrations, we've obsessed over every detail.

### 2. **Onchain Native**
Everything happens onchain. Your streaks, rewards, and achievements are all permanent records on Base mainnet.

### 3. **Social by Default**
Building habits is easier with community. Farcaster integration makes sharing your progress seamless and fun.

---

## 📊 Project Structure

```
proof-of-day/
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── farcaster/       # Farcaster data endpoint
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Main landing page
│   └── globals.css          # Global styles & animations
├── components/              # React components
│   ├── CheckInButton.tsx    # Daily check-in with confetti
│   ├── StatsCard.tsx        # Animated stats display
│   ├── ClaimButton.tsx      # Reward claiming
│   ├── StreakVisual.tsx     # Streak & milestones
│   ├── ShareButton.tsx      # Farcaster sharing
│   ├── UserProfile.tsx      # Profile with FC data
│   ├── AnimatedBackground.tsx # Particle effects
│   └── Confetti.tsx         # Celebration animation
├── hooks/                   # Custom React hooks
│   ├── useCheckIn.ts        # Check-in transaction
│   ├── useClaimRewards.ts   # Claim transaction
│   ├── useUserStats.ts      # User data fetching
│   ├── useFarcasterAccount.ts # FC account data
│   └── useBaseAccount.ts    # Basename fetching
├── lib/                     # Utilities
│   ├── wagmi.ts             # Wagmi configuration
│   └── neynar.ts            # Neynar client
├── contracts/               # Smart contract ABI
│   └── DailyCheckIn.ts      # Contract interface
└── utils/                   # Helper functions
    └── time.ts              # Time formatting
```

---

## 🎨 Visual Highlights

### Animations & Effects
- ✨ **Particle background** with floating elements
- 🌊 **Gradient orbs** that pulse and move
- 💫 **Glass hover effects** with shimmer
- 🎯 **Rotating gradient borders** on cards
- 🎉 **Confetti bursts** on check-in success
- 🔥 **Fire animations** for hot streaks
- 💎 **Glow pulses** on active buttons

### Responsive Design
- 📱 Mobile-first approach
- 💻 Optimized for all screen sizes
- 🎨 Consistent experience across devices

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create your feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

---

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🔗 Links

- **Website**: [Coming Soon](#)
- **Smart Contract**: [View on BaseScan](https://basescan.org/address/0x44b80503aec711f5f36958604d79547adc7d07e)
- **Farcaster**: [Follow us on Warpcast](#)
- **Documentation**: [Read the Docs](#)

---

## 💡 Future Roadmap

- [ ] NFT badges for milestone achievements
- [ ] Leaderboard for top streakers
- [ ] Referral system with bonuses
- [ ] Variable daily themes
- [ ] Surprise random rewards
- [ ] Streak recovery (1x per month)
- [ ] Community days with 2x rewards
- [ ] Multi-chain support

---

## 🙏 Acknowledgments

Built with 💙 on **Base** using:
- [Next.js](https://nextjs.org) - The React Framework
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS
- [wagmi](https://wagmi.sh) - React Hooks for Ethereum
- [RainbowKit](https://www.rainbowkit.com) - Wallet Connection
- [Neynar](https://neynar.com) - Farcaster Infrastructure
- [Base](https://base.org) - Ethereum L2

---

<div align="center">

**Proof Of Day** - *Show up. Build streaks. Earn onchain.*

Made with ❤️ for the Base & Farcaster community

[⭐ Star this repo](https://github.com/Earnwithalee7890/Proof-Of-Day-Crypto) if you find it useful!

</div>
