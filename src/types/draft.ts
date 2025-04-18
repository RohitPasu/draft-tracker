export interface Player {
  id: string;
  name: string;
  position: string;
  college: string;
  height: string;
  weight: string;
  age: number;
}

export interface DraftPick {
  id: string;
  round: number;
  pick: number;
  team: string;
  player: Player;
  timestamp: string;
}

export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo: string;
}

export interface DraftRound {
  round: number;
  picks: DraftPick[];
} 