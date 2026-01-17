/**
 * Type definitions for user-related data
 */

export interface User {
    fid: number;
    username: string;
    displayName: string;
    pfpUrl?: string;
    bio?: string;
    followerCount: number;
    followingCount: number;
    verifications: string[];
    activeStatus: UserActiveStatus;
    powerBadge: boolean;
    neynarScore: number;
    createdAt: Date;
}

export type UserActiveStatus = 'active' | 'inactive';

export interface UserStats {
    totalCheckIns: number;
    currentStreak: number;
    longestStreak: number;
    totalRewardsEarned: bigint;
    totalCampaignsJoined: number;
    totalCampaignsCompleted: number;
    reputationScore: number;
    tier: UserTier;
    achievements: Achievement[];
    lastCheckIn?: Date;
}

export type UserTier =
    | 'bronze'
    | 'silver'
    | 'gold'
    | 'platinum'
    | 'diamond';

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: string;
    unlockedAt: Date;
    rarity: AchievementRarity;
}

export type AchievementRarity =
    | 'common'
    | 'uncommon'
    | 'rare'
    | 'epic'
    | 'legendary';

export interface UserActivity {
    id: string;
    type: ActivityType;
    timestamp: Date;
    details: Record<string, unknown>;
    reward?: bigint;
}

export type ActivityType =
    | 'check_in'
    | 'campaign_joined'
    | 'campaign_completed'
    | 'reward_claimed'
    | 'achievement_unlocked'
    | 'streak_milestone'
    | 'referral_bonus';

export interface UserPreferences {
    notifications: NotificationPreferences;
    privacy: PrivacyPreferences;
    display: DisplayPreferences;
}

export interface NotificationPreferences {
    dailyReminder: boolean;
    campaignUpdates: boolean;
    rewardAlerts: boolean;
    weeklyDigest: boolean;
}

export interface PrivacyPreferences {
    showOnLeaderboard: boolean;
    showStats: boolean;
    showActivity: boolean;
}

export interface DisplayPreferences {
    theme: 'dark' | 'light' | 'system';
    compactMode: boolean;
    animationsEnabled: boolean;
}

export interface LeaderboardEntry {
    rank: number;
    user: Pick<User, 'fid' | 'username' | 'displayName' | 'pfpUrl' | 'powerBadge'>;
    stats: Pick<UserStats, 'currentStreak' | 'totalRewardsEarned' | 'tier'>;
    score: number;
}

export interface ReferralInfo {
    referralCode: string;
    referredBy?: number;
    referralCount: number;
    totalBonusEarned: bigint;
    referrals: ReferralRecord[];
}

export interface ReferralRecord {
    referredFid: number;
    referredUsername: string;
    joinedAt: Date;
    bonus: bigint;
}
