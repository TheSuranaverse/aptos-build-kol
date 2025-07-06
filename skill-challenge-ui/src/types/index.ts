export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  timestamp: number;
  owner: string;
}

export interface Challenge {
  target: string;
  status: 'Pending' | 'Verified' | 'Rejected';
  challenger: string;
  stake: number;
}

export interface Reputation {
  score: number;
  verified_count: number;
  challenged_survived: number;
}

export interface StakeInfo {
  staker: string;
  amount: number;
  target: string;
}

export interface UserProfile {
  address: string;
  skills: Skill[];
  reputation: Reputation;
  stakes: StakeInfo[];
  challenges: Challenge[];
}