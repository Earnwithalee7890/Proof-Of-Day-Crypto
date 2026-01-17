/**
 * Type definitions for campaign-related data
 */

export interface Campaign {
    id: string;
    name: string;
    description: string;
    type: CampaignType;
    status: CampaignStatus;
    budget: bigint;
    spent: bigint;
    startDate: Date;
    endDate: Date;
    targetAudience: TargetAudience;
    rewards: RewardConfig;
    metrics: CampaignMetrics;
    createdAt: Date;
    updatedAt: Date;
    creatorAddress: string;
    participantCount: number;
}

export type CampaignType =
    | 'follow'
    | 'like'
    | 'recast'
    | 'reply'
    | 'cast'
    | 'open_app'
    | 'custom';

export type CampaignStatus =
    | 'draft'
    | 'pending'
    | 'active'
    | 'paused'
    | 'completed'
    | 'cancelled';

export interface TargetAudience {
    minFollowers?: number;
    maxFollowers?: number;
    minNeynarScore?: number;
    verifiedOnly?: boolean;
    powerBadgeOnly?: boolean;
    regions?: string[];
    interests?: string[];
}

export interface RewardConfig {
    type: 'fixed' | 'weighted' | 'lottery';
    amount: bigint;
    token: TokenInfo;
    maxParticipants?: number;
    weightingFactors?: WeightingFactor[];
}

export interface TokenInfo {
    address: string;
    symbol: string;
    decimals: number;
    name: string;
    logoUrl?: string;
}

export interface WeightingFactor {
    factor: 'followers' | 'neynar_score' | 'account_age' | 'engagement';
    weight: number;
}

export interface CampaignMetrics {
    impressions: number;
    engagements: number;
    uniqueParticipants: number;
    completionRate: number;
    averageReward: bigint;
}

export interface CampaignParticipant {
    id: string;
    campaignId: string;
    userFid: number;
    status: ParticipantStatus;
    joinedAt: Date;
    completedAt?: Date;
    reward?: bigint;
    proofHash?: string;
}

export type ParticipantStatus =
    | 'pending'
    | 'verified'
    | 'rewarded'
    | 'rejected'
    | 'expired';

export interface CampaignFilters {
    status?: CampaignStatus[];
    type?: CampaignType[];
    minBudget?: bigint;
    maxBudget?: bigint;
    startDateFrom?: Date;
    startDateTo?: Date;
    creatorAddress?: string;
}

export interface CampaignSortOptions {
    field: 'createdAt' | 'budget' | 'participantCount' | 'startDate' | 'endDate';
    direction: 'asc' | 'desc';
}
