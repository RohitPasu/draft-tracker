// Define the Prospect interface
export interface Prospect {
  id: string;
  name: string;
  position: string;
  college: string;
  height: string;
  weight: string;
  age: number;
  grade: string;
  projectedRound: number;
  projectedPick: string;
  notes: string;
}

// Mock data for 2025 NFL draft prospects
export const PROSPECTS: Prospect[] = [
  {
    id: '1',
    name: 'Cameron Ward',
    position: 'QB',
    college: 'Miami (FL)',
    height: "6'2\"",
    weight: '225',
    age: 22,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-1',
    notes: 'Elite arm talent with good mobility and decision-making.'
  },
  {
    id: '2',
    name: 'Travis Hunter',
    position: 'CB',
    college: 'Colorado',
    height: "6'1\"",
    weight: '185',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-2',
    notes: 'Elite athlete with shutdown corner potential and ball skills.'
  },
  {
    id: '3',
    name: 'James Pearce Jr.',
    position: 'EDGE',
    college: 'Tennessee',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-3',
    notes: 'Explosive edge rusher with elite length and bend.'
  },
  {
    id: '4',
    name: 'Malachi Corley',
    position: 'WR',
    college: 'Western Kentucky',
    height: "6'0\"",
    weight: '210',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-4',
    notes: 'Physical receiver with elite YAC ability and route running.'
  },
  {
    id: '5',
    name: 'Luther Burden III',
    position: 'WR',
    college: 'Missouri',
    height: "5'11\"",
    weight: '200',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-5',
    notes: 'Elite athlete with great route running and ball skills.'
  },
  {
    id: '6',
    name: 'Shedeur Sanders',
    position: 'QB',
    college: 'Colorado',
    height: "6'2\"",
    weight: '215',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-6',
    notes: 'Elite arm talent with good mobility and decision-making.'
  },
  {
    id: '7',
    name: 'Denzel Burke',
    position: 'CB',
    college: 'Ohio State',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-7',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '8',
    name: 'Tyleik Williams',
    position: 'DL',
    college: 'Ohio State',
    height: "6'3\"",
    weight: '320',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-8',
    notes: 'Massive interior defender with good power and quickness.'
  },
  {
    id: '9',
    name: 'J.J. McCarthy',
    position: 'QB',
    college: 'Michigan',
    height: "6'3\"",
    weight: '220',
    age: 21,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-9',
    notes: 'Athletic quarterback with good arm talent and decision-making.'
  },
  {
    id: '10',
    name: 'Evan Stewart',
    position: 'WR',
    college: 'Texas A&M',
    height: "6'0\"",
    weight: '185',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-10',
    notes: 'Elite athlete with great route running and ball skills.'
  }
]; 