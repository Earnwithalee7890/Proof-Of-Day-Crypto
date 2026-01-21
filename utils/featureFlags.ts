// Feature flags for controlled rollouts
export interface FeatureFlags {
  enableNewDashboard: boolean;
  enableBetaFeatures: boolean;
  enableAnalytics: boolean;
  enableNotifications: boolean;
  maxCampaignBudget: number;
  minCampaignBudget: number;
}

const defaultFlags: FeatureFlags = {
  enableNewDashboard: false,
  enableBetaFeatures: false,
  enableAnalytics: true,
  enableNotifications: true,
  maxCampaignBudget: 10000,
  minCampaignBudget: 3,
};

export const getFeatureFlags = (): FeatureFlags => {
  // In production, this could fetch from a remote config service
  return { ...defaultFlags };
};

export const isFeatureEnabled = (flagName: keyof FeatureFlags): boolean => {
  const flags = getFeatureFlags();
  const flag = flags[flagName];
  return typeof flag === 'boolean' ? flag : false;
};

export const getFeatureValue = <K extends keyof FeatureFlags>(
  flagName: K
): FeatureFlags[K] => {
  return getFeatureFlags()[flagName];
};
