import { useState } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  Stack
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

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

// Mock data for 2025 NFL draft prospects based on NFL Mock Draft Database consensus big board
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
    notes: 'Elite arm talent with improved decision-making. Prototypical NFL quarterback build.'
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
    notes: 'Two-way star with elite athleticism. Dominant cornerback with receiver skills.'
  },
  {
    id: '3',
    name: 'Abdul Carter',
    position: 'EDGE',
    college: 'Penn State',
    height: "6'3\"",
    weight: '250',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-3',
    notes: 'Explosive edge rusher with elite bend and speed. High upside pass rusher.'
  },
  {
    id: '4',
    name: 'Mason Graham',
    position: 'DL',
    college: 'Michigan',
    height: "6'3\"",
    weight: '318',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-5',
    notes: 'Dominant interior defender with excellent technique. Run-stopping force.'
  },
  {
    id: '5',
    name: 'Will Campbell',
    position: 'OT',
    college: 'LSU',
    height: "6'6\"",
    weight: '320',
    age: 20,
    grade: 'A+',
    projectedRound: 1,
    projectedPick: '1-4',
    notes: 'Prototypical left tackle with excellent footwork and strength.'
  },
  {
    id: '6',
    name: 'Shedeur Sanders',
    position: 'QB',
    college: 'Colorado',
    height: "6'2\"",
    weight: '215',
    age: 22,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-9',
    notes: 'Poised pocket passer with NFL bloodlines. Improved decision-making and accuracy.'
  },
  {
    id: '7',
    name: 'Ashton Jeanty',
    position: 'RB',
    college: 'Boise State',
    height: "5'9\"",
    weight: '210',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-6',
    notes: 'Explosive runner with excellent vision and contact balance.'
  },
  {
    id: '8',
    name: 'Jalon Walker',
    position: 'EDGE',
    college: 'Georgia',
    height: "6'2\"",
    weight: '245',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-8',
    notes: 'Explosive edge rusher with excellent bend and speed.'
  },
  {
    id: '9',
    name: 'Shedeur Sanders',
    position: 'QB',
    college: 'Colorado',
    height: "6'2\"",
    weight: '215',
    age: 22,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-9',
    notes: 'Poised pocket passer with NFL bloodlines. Improved decision-making and accuracy.'
  },
  {
    id: '10',
    name: 'Tyler Warren',
    position: 'TE',
    college: 'Penn State',
    height: "6'6\"",
    weight: '260',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-10',
    notes: 'Versatile tight end with excellent blocking and receiving skills.'
  },
  {
    id: '11',
    name: 'Will Johnson',
    position: 'CB',
    college: 'Michigan',
    height: "6'2\"",
    weight: '202',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-11',
    notes: 'Physical corner with excellent size and ball skills. Shutdown potential.'
  },
  {
    id: '12',
    name: 'Tetairoa McMillan',
    position: 'WR',
    college: 'Arizona',
    height: "6'5\"",
    weight: '210',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-12',
    notes: 'Physical receiver with excellent size and ball skills.'
  },
  {
    id: '13',
    name: 'Kelvin Banks',
    position: 'OT',
    college: 'Texas',
    height: "6'5\"",
    weight: '320',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-13',
    notes: 'Athletic tackle with excellent footwork and strength.'
  },
  {
    id: '14',
    name: 'Colston Loveland',
    position: 'TE',
    college: 'Michigan',
    height: "6'5\"",
    weight: '245',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-14',
    notes: 'Athletic tight end with excellent receiving skills and blocking potential.'
  },
  {
    id: '15',
    name: 'Mike Green',
    position: 'EDGE',
    college: 'Marshall',
    height: "6'3\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-15',
    notes: 'Explosive edge rusher with excellent bend and speed.'
  },
  {
    id: '16',
    name: 'Jahdae Barron',
    position: 'CB',
    college: 'Texas',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-16',
    notes: 'Versatile corner with excellent instincts and tackling ability.'
  },
  {
    id: '17',
    name: 'Mykel Williams',
    position: 'EDGE',
    college: 'Georgia',
    height: "6'6\"",
    weight: '265',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-17',
    notes: 'Explosive edge rusher with excellent length and athleticism.'
  },
  {
    id: '18',
    name: 'Grey Zabel',
    position: 'IOL',
    college: 'North Dakota State',
    height: "6'6\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-18',
    notes: 'Athletic interior lineman with excellent footwork and strength.'
  },
  {
    id: '19',
    name: 'Jihaad Campbell',
    position: 'LB',
    college: 'Alabama',
    height: "6'3\"",
    weight: '230',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-19',
    notes: 'Athletic linebacker with excellent range and coverage ability.'
  },
  {
    id: '20',
    name: 'Omarion Hampton',
    position: 'RB',
    college: 'North Carolina',
    height: "6'0\"",
    weight: '220',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-20',
    notes: 'Powerful runner with excellent vision and contact balance.'
  },
  {
    id: '21',
    name: 'Jaxson Dart',
    position: 'QB',
    college: 'Mississippi',
    height: "6'2\"",
    weight: '220',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-21',
    notes: 'Athletic quarterback with excellent arm strength and mobility.'
  },
  {
    id: '22',
    name: 'Kenneth Grant',
    position: 'DL',
    college: 'Michigan',
    height: "6'3\"",
    weight: '335',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-22',
    notes: 'Massive interior defender with excellent strength and run-stopping ability.'
  },
  {
    id: '23',
    name: 'Derrick Harmon',
    position: 'DL',
    college: 'Oregon',
    height: "6'5\"",
    weight: '320',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-23',
    notes: 'Powerful interior defender with excellent strength and technique.'
  },
  {
    id: '24',
    name: 'Malaki Starks',
    position: 'S',
    college: 'Georgia',
    height: "6'1\"",
    weight: '205',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-24',
    notes: 'Versatile safety with excellent range and tackling ability.'
  },
  {
    id: '25',
    name: 'Josh Simmons',
    position: 'OT',
    college: 'Ohio State',
    height: "6'5\"",
    weight: '310',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-25',
    notes: 'Athletic tackle with excellent footwork and strength.'
  },
  {
    id: '26',
    name: 'Maxwell Hairston',
    position: 'CB',
    college: 'Kentucky',
    height: "6'1\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-26',
    notes: 'Athletic corner with excellent ball skills and coverage ability.'
  },
  {
    id: '27',
    name: 'James Pearce Jr.',
    position: 'EDGE',
    college: 'Tennessee',
    height: "6'5\"",
    weight: '242',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-27',
    notes: 'Explosive edge rusher with elite bend and speed. High upside pass rusher.'
  },
  {
    id: '28',
    name: 'Donovan Ezeiruaku',
    position: 'EDGE',
    college: 'Boston College',
    height: "6'2\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-28',
    notes: 'Explosive edge rusher with excellent bend and speed.'
  },
  {
    id: '29',
    name: 'Shemar Stewart',
    position: 'EDGE',
    college: 'Texas A&M',
    height: "6'4\"",
    weight: '275',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-29',
    notes: 'Powerful edge defender with excellent strength and technique.'
  },
  {
    id: '30',
    name: 'Walter Nolen',
    position: 'DL',
    college: 'Mississippi',
    height: "6'4\"",
    weight: '340',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-30',
    notes: 'Explosive interior defender with excellent first step and strength.'
  },
  {
    id: '31',
    name: 'Josh Conerly Jr.',
    position: 'OT',
    college: 'Oregon',
    height: "6'5\"",
    weight: '310',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-31',
    notes: 'Athletic tackle with excellent footwork and strength.'
  },
  {
    id: '32',
    name: 'Nick Emmanwori',
    position: 'S',
    college: 'South Carolina',
    height: "6'4\"",
    weight: '220',
    age: 20,
    grade: 'A',
    projectedRound: 1,
    projectedPick: '1-32',
    notes: 'Physical safety with excellent size and tackling ability.'
  },
  {
    id: '33',
    name: 'Emeka Egbuka',
    position: 'WR',
    college: 'Ohio State',
    height: "6'1\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-33',
    notes: 'Explosive receiver with excellent speed and route-running ability.'
  },
  {
    id: '34',
    name: 'Luther Burden',
    position: 'WR',
    college: 'Missouri',
    height: "5'11\"",
    weight: '208',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-34',
    notes: 'Dynamic playmaker with elite speed and YAC ability. Versatile offensive weapon.'
  },
  {
    id: '35',
    name: 'Donovan Jackson',
    position: 'IOL',
    college: 'Ohio State',
    height: "6'4\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-35',
    notes: 'Powerful interior lineman with excellent strength and technique.'
  },
  {
    id: '36',
    name: 'Trey Amos',
    position: 'CB',
    college: 'Mississippi',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-36',
    notes: 'Physical corner with excellent size and ball skills.'
  },
  {
    id: '37',
    name: 'Shavon Revel Jr.',
    position: 'CB',
    college: 'East Carolina',
    height: "6'0\"",
    weight: '180',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-37',
    notes: 'Technically sound corner with excellent instincts and coverage ability.'
  },
  {
    id: '38',
    name: 'Tyler Booker',
    position: 'IOL',
    college: 'Alabama',
    height: "6'5\"",
    weight: '330',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-38',
    notes: 'Powerful interior lineman with excellent strength and technique.'
  },
  {
    id: '39',
    name: 'Matthew Golden',
    position: 'WR',
    college: 'Texas',
    height: "6'1\"",
    weight: '195',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-39',
    notes: 'Explosive receiver with excellent speed and route-running ability.'
  },
  {
    id: '40',
    name: 'Arland Bruce IV',
    position: 'WR',
    college: 'Iowa',
    height: "5'10\"",
    weight: '195',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-40',
    notes: 'Quick-twitch receiver with excellent route-running and YAC ability.'
  },
  {
    id: '41',
    name: 'Jalen Milroe',
    position: 'QB',
    college: 'Alabama',
    height: "6'2\"",
    weight: '220',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-41',
    notes: 'Athletic quarterback with excellent arm strength and mobility.'
  },
  {
    id: '42',
    name: 'TreVeyon Henderson',
    position: 'RB',
    college: 'Ohio State',
    height: "5'10\"",
    weight: '215',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-42',
    notes: 'Explosive runner with excellent vision and contact balance.'
  },
  {
    id: '43',
    name: 'Azareye\'h Thomas',
    position: 'CB',
    college: 'Florida State',
    height: "6'2\"",
    weight: '190',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-43',
    notes: 'Physical corner with excellent size and ball skills.'
  },
  {
    id: '44',
    name: 'Tyleik Williams',
    position: 'DL',
    college: 'Ohio State',
    height: "6'2\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-44',
    notes: 'Disruptive interior defender with excellent first step. Run-stopping force.'
  },
  {
    id: '45',
    name: 'Mason Taylor',
    position: 'TE',
    college: 'LSU',
    height: "6'6\"",
    weight: '250',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-45',
    notes: 'Athletic tight end with excellent receiving skills and blocking potential.'
  },
  {
    id: '46',
    name: 'Benjamin Morrison',
    position: 'CB',
    college: 'Notre Dame',
    height: "6'0\"",
    weight: '185',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-46',
    notes: 'Technically sound corner with excellent instincts and coverage ability.'
  },
  {
    id: '47',
    name: 'Aireontae Ersery',
    position: 'OT',
    college: 'Minnesota',
    height: "6'6\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-47',
    notes: 'Athletic tackle with excellent footwork and strength.'
  },
  {
    id: '48',
    name: 'Carson Schwesinger',
    position: 'LB',
    college: 'UCLA',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-48',
    notes: 'Athletic linebacker with excellent range and coverage ability.'
  },
  {
    id: '49',
    name: 'Jayden Higgins',
    position: 'WR',
    college: 'Iowa State',
    height: "6'4\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-49',
    notes: 'Physical receiver with excellent size and ball skills.'
  },
  {
    id: '50',
    name: 'Landon Jackson',
    position: 'EDGE',
    college: 'Arkansas',
    height: "6'7\"",
    weight: '280',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-50',
    notes: 'Explosive edge rusher with excellent length and athleticism.'
  },
  {
    id: '51',
    name: 'Xavier Watts',
    position: 'S',
    college: 'Notre Dame',
    height: "6'1\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-51',
    notes: 'Versatile safety with excellent range and ball skills.'
  },
  {
    id: '52',
    name: 'Darius Alexander',
    position: 'DL',
    college: 'Toledo',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-52',
    notes: 'Disruptive interior defender with excellent first step.'
  },
  {
    id: '53',
    name: 'J.T. Tuimoloau',
    position: 'EDGE',
    college: 'Ohio State',
    height: "6'4\"",
    weight: '270',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-53',
    notes: 'Explosive edge rusher with excellent power and technique.'
  },
  {
    id: '54',
    name: 'Quinshon Judkins',
    position: 'RB',
    college: 'Ohio State',
    height: "5'11\"",
    weight: '210',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-54',
    notes: 'Dynamic runner with excellent vision and contact balance.'
  },
  {
    id: '55',
    name: 'Princely Umanmielen',
    position: 'EDGE',
    college: 'Mississippi',
    height: "6'4\"",
    weight: '255',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-55',
    notes: 'Athletic edge rusher with excellent bend and speed.'
  },
  {
    id: '56',
    name: 'Elijah Arroyo',
    position: 'TE',
    college: 'Miami (FL)',
    height: "6'4\"",
    weight: '240',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-56',
    notes: 'Athletic tight end with excellent receiving skills.'
  },
  {
    id: '57',
    name: 'T.J. Sanders',
    position: 'DL',
    college: 'South Carolina',
    height: "6'3\"",
    weight: '310',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-57',
    notes: 'Powerful interior defender with excellent strength.'
  },
  {
    id: '58',
    name: 'Alfred Collins',
    position: 'DL',
    college: 'Texas',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-58',
    notes: 'Massive interior defender with excellent power.'
  },
  {
    id: '59',
    name: 'Jonah Savaiinaea',
    position: 'IOL',
    college: 'Arizona',
    height: "6'5\"",
    weight: '330',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-59',
    notes: 'Powerful interior lineman with excellent strength.'
  },
  {
    id: '60',
    name: 'Tate Ratledge',
    position: 'IOL',
    college: 'Georgia',
    height: "6'6\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-60',
    notes: 'Athletic interior lineman with excellent technique.'
  },
  {
    id: '61',
    name: 'Kaleb Johnson',
    position: 'RB',
    college: 'Iowa',
    height: "6'0\"",
    weight: '215',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-61',
    notes: 'Physical runner with excellent vision and power.'
  },
  {
    id: '62',
    name: 'Jack Sawyer',
    position: 'EDGE',
    college: 'Ohio State',
    height: "6'4\"",
    weight: '265',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-62',
    notes: 'Versatile edge defender with excellent power.'
  },
  {
    id: '63',
    name: 'Tre Harris',
    position: 'WR',
    college: 'Mississippi',
    height: "6'2\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-63',
    notes: 'Physical receiver with excellent ball skills.'
  },
  {
    id: '64',
    name: 'Jaylin Noel',
    position: 'WR',
    college: 'Iowa State',
    height: "5'10\"",
    weight: '180',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-64',
    notes: 'Quick-twitch receiver with excellent route-running.'
  },
  {
    id: '65',
    name: 'Bradyn Swinson',
    position: 'EDGE',
    college: 'LSU',
    height: "6'4\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-65',
    notes: 'Explosive edge rusher with excellent speed.'
  },
  {
    id: '66',
    name: 'Demetrius Knight',
    position: 'LB',
    college: 'South Carolina',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-66',
    notes: 'Athletic linebacker with excellent range.'
  },
  {
    id: '67',
    name: 'Tyler Shough',
    position: 'QB',
    college: 'Louisville',
    height: "6'5\"",
    weight: '225',
    age: 24,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-67',
    notes: 'Experienced quarterback with excellent arm talent.'
  },
  {
    id: '68',
    name: 'Jack Bech',
    position: 'WR',
    college: 'TCU',
    height: "6'2\"",
    weight: '215',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-68',
    notes: 'Physical receiver with excellent ball skills.'
  },
  {
    id: '69',
    name: 'Oluwafemi Oladejo',
    position: 'EDGE',
    college: 'UCLA',
    height: "6'3\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-69',
    notes: 'Explosive edge rusher with excellent power.'
  },
  {
    id: '70',
    name: 'Elic Ayomanor',
    position: 'WR',
    college: 'Stanford',
    height: "6'2\"",
    weight: '210',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-70',
    notes: 'Athletic receiver with excellent route-running.'
  },
  {
    id: '71',
    name: 'Jordan Burch',
    position: 'EDGE',
    college: 'Oregon',
    height: "6'6\"",
    weight: '275',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-71',
    notes: 'Versatile edge defender with excellent length.'
  },
  {
    id: '72',
    name: 'Marcus Mbow',
    position: 'IOL',
    college: 'Purdue',
    height: "6'5\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-72',
    notes: 'Athletic interior lineman with excellent technique.'
  },
  {
    id: '73',
    name: 'Darien Porter',
    position: 'CB',
    college: 'Iowa State',
    height: "6'1\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-73',
    notes: 'Athletic corner with excellent speed.'
  },
  {
    id: '74',
    name: 'Harold Fannin Jr.',
    position: 'TE',
    college: 'Bowling Green',
    height: "6'4\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-74',
    notes: 'Athletic tight end with excellent receiving skills.'
  },
  {
    id: '75',
    name: 'Joshua Farmer',
    position: 'DL',
    college: 'Florida State',
    height: "6'3\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-75',
    notes: 'Powerful interior defender with excellent strength.'
  },
  {
    id: '76',
    name: 'Shemar Turner',
    position: 'DL',
    college: 'Texas A&M',
    height: "6'4\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-76',
    notes: 'Versatile interior defender with excellent power.'
  },
  {
    id: '77',
    name: 'Andrew Mukuba',
    position: 'S',
    college: 'Texas',
    height: "6'0\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-77',
    notes: 'Versatile safety with excellent range.'
  },
  {
    id: '78',
    name: 'Jared Wilson',
    position: 'IOL',
    college: 'Georgia',
    height: "6'4\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-78',
    notes: 'Powerful interior lineman with excellent strength.'
  },
  {
    id: '79',
    name: 'Isaiah Bond',
    position: 'WR',
    college: 'Texas',
    height: "6'0\"",
    weight: '185',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-79',
    notes: 'Explosive receiver with excellent speed.'
  },
  {
    id: '80',
    name: 'Josaiah Stewart',
    position: 'EDGE',
    college: 'Michigan',
    height: "6'1\"",
    weight: '245',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-80',
    notes: 'Explosive edge rusher with excellent speed.'
  },
  {
    id: '81',
    name: 'Wyatt Milum',
    position: 'OT',
    college: 'West Virginia',
    height: "6'6\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-81',
    notes: 'Athletic tackle with excellent footwork.'
  },
  {
    id: '82',
    name: 'Ozzy Trapilo',
    position: 'OT',
    college: 'Boston College',
    height: "6'7\"",
    weight: '310',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-82',
    notes: 'Massive tackle with excellent length.'
  },
  {
    id: '83',
    name: 'Cameron Skattebo',
    position: 'RB',
    college: 'Arizona State',
    height: "5'10\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-83',
    notes: 'Physical runner with excellent vision.'
  },
  {
    id: '84',
    name: 'Omarr Norman-Lott',
    position: 'DL',
    college: 'Tennessee',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-84',
    notes: 'Versatile interior defender with excellent power.'
  },
  {
    id: '85',
    name: 'Jalen Royals',
    position: 'WR',
    college: 'Utah State',
    height: "6'2\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-85',
    notes: 'Athletic receiver with excellent ball skills.'
  },
  {
    id: '86',
    name: 'Savion Williams',
    position: 'WR',
    college: 'TCU',
    height: "6'4\"",
    weight: '215',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-86',
    notes: 'Physical receiver with excellent size.'
  },
  {
    id: '87',
    name: 'Kevin Winston Jr.',
    position: 'S',
    college: 'Penn State',
    height: "6'1\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-87',
    notes: 'Versatile safety with excellent instincts.'
  },
  {
    id: '88',
    name: 'Cameron Williams',
    position: 'OT',
    college: 'Texas',
    height: "6'6\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-88',
    notes: 'Massive tackle with excellent power.'
  },
  {
    id: '89',
    name: 'Dylan Sampson',
    position: 'RB',
    college: 'Tennessee',
    height: "5'11\"",
    weight: '210',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-89',
    notes: 'Explosive runner with excellent speed.'
  },
  {
    id: '90',
    name: 'Kyle Williams',
    position: 'WR',
    college: 'Washington State',
    height: "6'0\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-90',
    notes: 'Quick-twitch receiver with excellent route-running.'
  },
  {
    id: '91',
    name: 'Jacob Parrish',
    position: 'CB',
    college: 'Kansas State',
    height: "5'11\"",
    weight: '180',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-91',
    notes: 'Technically sound corner with excellent instincts.'
  },
  {
    id: '92',
    name: 'Ashton Gillotte',
    position: 'EDGE',
    college: 'Louisville',
    height: "6'3\"",
    weight: '255',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-92',
    notes: 'Explosive edge rusher with excellent power.'
  },
  {
    id: '93',
    name: 'Will Howard',
    position: 'QB',
    college: 'Ohio State',
    height: "6'5\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-93',
    notes: 'Athletic quarterback with excellent arm talent.'
  },
  {
    id: '94',
    name: 'Emery Jones Jr.',
    position: 'OT',
    college: 'LSU',
    height: "6'6\"",
    weight: '320',
    age: 20,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-94',
    notes: 'Massive tackle with excellent power.'
  },
  {
    id: '95',
    name: 'Anthony Belton',
    position: 'OT',
    college: 'NC State',
    height: "6'6\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-95',
    notes: 'Athletic tackle with excellent footwork.'
  },
  {
    id: '96',
    name: 'Kyle Kennard',
    position: 'EDGE',
    college: 'South Carolina',
    height: "6'4\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-96',
    notes: 'Explosive edge rusher with excellent speed.'
  },
  {
    id: '97',
    name: 'Denzel Burke',
    position: 'CB',
    college: 'Ohio State',
    height: "6'0\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-97',
    notes: 'Physical corner with excellent ball skills.'
  },
  {
    id: '98',
    name: 'Charles Grant',
    position: 'IOL',
    college: 'William & Mary',
    height: "6'4\"",
    weight: '315',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-98',
    notes: 'Powerful interior lineman with excellent strength.'
  },
  {
    id: '99',
    name: 'Terrance Ferguson',
    position: 'TE',
    college: 'Oregon',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-99',
    notes: 'Athletic tight end with excellent receiving skills.'
  },
  {
    id: '100',
    name: 'Jahiem Bell',
    position: 'TE',
    college: 'Florida State',
    height: "6'3\"",
    weight: '240',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-100',
    notes: 'Versatile tight end with excellent receiving skills.'
  },
  {
    id: '101',
    name: 'Ty Robinson',
    position: 'DL',
    college: 'Nebraska',
    height: "6'6\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-1',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '102',
    name: 'D.J. Giddens',
    position: 'RB',
    college: 'Kansas State',
    height: "6'1\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-2',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '103',
    name: 'Billy Bowman',
    position: 'S',
    college: 'Oklahoma',
    height: "6'0\"",
    weight: '195',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-3',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '104',
    name: 'Gunnar Helm',
    position: 'TE',
    college: 'Texas',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-4',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '105',
    name: 'Chris Paul Jr.',
    position: 'LB',
    college: 'Mississippi',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-5',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '106',
    name: 'Dorian Strong',
    position: 'CB',
    college: 'Virginia Tech',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-6',
    notes: 'Physical corner with good size and ball skills.'
  },
  {
    id: '107',
    name: 'Tory Horton',
    position: 'WR',
    college: 'Colorado State',
    height: "6'2\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-7',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '108',
    name: 'Danny Stutsman',
    position: 'LB',
    college: 'Oklahoma',
    height: "6'3\"",
    weight: '235',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-8',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '109',
    name: 'Quinn Ewers',
    position: 'QB',
    college: 'Texas',
    height: "6'2\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-9',
    notes: 'Poised pocket passer with good arm talent and decision-making.'
  },
  {
    id: '110',
    name: 'Quincy Riley',
    position: 'CB',
    college: 'Louisville',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-10',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '111',
    name: 'Barrett Carter',
    position: 'LB',
    college: 'Clemson',
    height: "6'1\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-11',
    notes: 'Versatile linebacker with good instincts and coverage ability.'
  },
  {
    id: '112',
    name: 'Jared Ivey',
    position: 'EDGE',
    college: 'Mississippi',
    height: "6'5\"",
    weight: '265',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-12',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '113',
    name: 'C.J. West',
    position: 'DL',
    college: 'Indiana',
    height: "6'3\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-13',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '114',
    name: 'R.J. Harvey Jr.',
    position: 'RB',
    college: 'UCF',
    height: "5'9\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-14',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '115',
    name: 'Damien Martinez',
    position: 'RB',
    college: 'Miami (FL)',
    height: "6'0\"",
    weight: '220',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-15',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '116',
    name: 'Saivion Jones',
    position: 'EDGE',
    college: 'LSU',
    height: "6'5\"",
    weight: '260',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-16',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '117',
    name: 'Nohl Williams',
    position: 'CB',
    college: 'California',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-17',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '118',
    name: 'Dylan Fairchild',
    position: 'IOL',
    college: 'Georgia',
    height: "6'4\"",
    weight: '310',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-18',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '119',
    name: 'Tez Johnson',
    position: 'WR',
    college: 'Oregon',
    height: "5'10\"",
    weight: '175',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-19',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '120',
    name: 'Jordan Phillips',
    position: 'DL',
    college: 'Maryland',
    height: "6'3\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-20',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '121',
    name: 'Kyle McCord',
    position: 'QB',
    college: 'Syracuse',
    height: "6'3\"",
    weight: '215',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-21',
    notes: 'Poised pocket passer with good arm talent and decision-making.'
  },
  {
    id: '122',
    name: 'Xavier Restrepo',
    position: 'WR',
    college: 'Miami (FL)',
    height: "5'10\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-22',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '123',
    name: 'Lathan Ransom',
    position: 'S',
    college: 'Ohio State',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-23',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '124',
    name: 'Bhayshul Tuten',
    position: 'RB',
    college: 'Virginia Tech',
    height: "5'9\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-24',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '125',
    name: 'Vernon Broughton',
    position: 'DL',
    college: 'Texas',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-25',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '126',
    name: 'Devin Neal',
    position: 'RB',
    college: 'Kansas',
    height: "5'11\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-26',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '127',
    name: 'Aeneas Peebles',
    position: 'DL',
    college: 'Virginia Tech',
    height: "6'2\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-27',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '128',
    name: 'Smael Mondon Jr.',
    position: 'LB',
    college: 'Georgia',
    height: "6'2\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-28',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '129',
    name: 'Ollie Gordon II',
    position: 'RB',
    college: 'Oklahoma State',
    height: "6'1\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-29',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '130',
    name: 'Jamaree Caldwell',
    position: 'DL',
    college: 'Oregon',
    height: "6'2\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-30',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '131',
    name: 'David Walker',
    position: 'EDGE',
    college: 'Central Arkansas',
    height: "6'3\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-31',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '132',
    name: 'Jonas Sanker',
    position: 'S',
    college: 'Virginia',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-32',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '133',
    name: 'Jackson Slater',
    position: 'IOL',
    college: 'Sacramento State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-33',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '134',
    name: 'Seth McLaughlin',
    position: 'IOL',
    college: 'Ohio State',
    height: "6'4\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-34',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '135',
    name: 'Jeffrey Bassa',
    position: 'LB',
    college: 'Oregon',
    height: "6'2\"",
    weight: '225',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-35',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '136',
    name: 'Caleb Rogers',
    position: 'IOL',
    college: 'Texas Tech',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-36',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '137',
    name: 'Chase Lundt',
    position: 'OT',
    college: 'UConn',
    height: "6'6\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-37',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '138',
    name: 'Malachi Moore',
    position: 'S',
    college: 'Alabama',
    height: "6'0\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-38',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '139',
    name: 'Hollin Pierce',
    position: 'OT',
    college: 'Rutgers',
    height: "6'7\"",
    weight: '320',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-39',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '140',
    name: 'Zah Frazier',
    position: 'CB',
    college: 'UTSA',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-40',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '141',
    name: 'Jaylen Reed',
    position: 'S',
    college: 'Penn State',
    height: "6'1\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-41',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '142',
    name: 'Tai Felton',
    position: 'WR',
    college: 'Maryland',
    height: "6'2\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-42',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '143',
    name: 'J.J. Pegues',
    position: 'DL',
    college: 'Mississippi',
    height: "6'3\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-43',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '144',
    name: 'Carson Vinson',
    position: 'IOL',
    college: 'Alabama A&M',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-44',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '145',
    name: 'Jaydon Blue',
    position: 'RB',
    college: 'Texas',
    height: "6'0\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-45',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '146',
    name: 'Cobee Bryant',
    position: 'CB',
    college: 'Kansas',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-46',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '147',
    name: 'Miles Frazier',
    position: 'IOL',
    college: 'LSU',
    height: "6'5\"",
    weight: '320',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-47',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '148',
    name: 'Zy Alexander',
    position: 'CB',
    college: 'LSU',
    height: "6'2\"",
    weight: '190',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-48',
    notes: 'Physical corner with good size and ball skills.'
  },
  {
    id: '149',
    name: 'Jalen Travis',
    position: 'OT',
    college: 'Iowa State',
    height: "6'6\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-49',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '150',
    name: 'Mitchell Evans',
    position: 'TE',
    college: 'Notre Dame',
    height: "6'5\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-50',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '151',
    name: 'Brashard Smith',
    position: 'RB',
    college: 'SMU',
    height: "5'11\"",
    weight: '195',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-51',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '152',
    name: 'Jalen Rivers',
    position: 'OT',
    college: 'Miami (FL)',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-52',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '153',
    name: 'Ty Hamilton',
    position: 'DL',
    college: 'Ohio State',
    height: "6'3\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-53',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '154',
    name: 'Logan Brown',
    position: 'OT',
    college: 'Kansas',
    height: "6'6\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-54',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '155',
    name: 'Ajani Cornelius',
    position: 'OT',
    college: 'Oregon',
    height: "6'5\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-55',
    notes: 'Athletic tackle with good footwork and strength.'
  },
  {
    id: '156',
    name: 'Rylie Mills',
    position: 'DL',
    college: 'Notre Dame',
    height: "6'5\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-56',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '157',
    name: 'Antwaun Powell-Ryland',
    position: 'EDGE',
    college: 'Virginia Tech',
    height: "6'3\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-57',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '158',
    name: 'Barryn Sorrell',
    position: 'EDGE',
    college: 'Texas',
    height: "6'3\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-58',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '159',
    name: 'Upton Stout',
    position: 'CB',
    college: 'Western Kentucky',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-59',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '160',
    name: 'Trevor Etienne',
    position: 'RB',
    college: 'Georgia',
    height: "5'9\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-60',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '161',
    name: 'Kobe King',
    position: 'LB',
    college: 'Penn State',
    height: "6'1\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-61',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '162',
    name: 'Caleb Ransaw',
    position: 'S',
    college: 'Tulane',
    height: "6'1\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-62',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '163',
    name: 'Elijah Roberts',
    position: 'DL',
    college: 'SMU',
    height: "6'3\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-63',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '164',
    name: 'Sebastian Castro',
    position: 'S',
    college: 'Iowa',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-64',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '165',
    name: 'Nick Martin',
    position: 'LB',
    college: 'Oklahoma State',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-65',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '166',
    name: 'Dillon Gabriel',
    position: 'QB',
    college: 'Oregon',
    height: "6'0\"",
    weight: '200',
    age: 24,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-66',
    notes: 'Experienced quarterback with good arm talent and decision-making.'
  },
  {
    id: '167',
    name: 'Que Robinson',
    position: 'EDGE',
    college: 'Alabama',
    height: "6'3\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-67',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '168',
    name: 'Jack Kiser',
    position: 'LB',
    college: 'Notre Dame',
    height: "6'2\"",
    weight: '230',
    age: 23,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-68',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '169',
    name: 'Riley Leonard',
    position: 'QB',
    college: 'Notre Dame',
    height: "6'4\"",
    weight: '215',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-69',
    notes: 'Athletic quarterback with good arm talent and mobility.'
  },
  {
    id: '170',
    name: 'Jordan James',
    position: 'RB',
    college: 'Oregon',
    height: "5'10\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-70',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '171',
    name: 'Jake Majors',
    position: 'IOL',
    college: 'Texas',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-71',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '172',
    name: 'Oronde Gadsden II',
    position: 'TE',
    college: 'Syracuse',
    height: "6'5\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-72',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '173',
    name: 'Jackson Hawes',
    position: 'TE',
    college: 'Georgia Tech',
    height: "6'5\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-73',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '174',
    name: 'Pat Bryant',
    position: 'WR',
    college: 'Illinois',
    height: "6'3\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-74',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '175',
    name: 'Jah Joyner',
    position: 'EDGE',
    college: 'Minnesota',
    height: "6'3\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-75',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '176',
    name: 'Dont\'e Thornton',
    position: 'WR',
    college: 'Tennessee',
    height: "6'5\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-76',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '177',
    name: 'Raheim Sanders',
    position: 'RB',
    college: 'South Carolina',
    height: "6'2\"",
    weight: '220',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-77',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '178',
    name: 'Luke Kandra',
    position: 'IOL',
    college: 'Cincinnati',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-78',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '179',
    name: 'Joshua Gray',
    position: 'IOL',
    college: 'Oregon State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-79',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '180',
    name: 'Connor Colby',
    position: 'IOL',
    college: 'Iowa',
    height: "6'6\"",
    weight: '310',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-80',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '181',
    name: 'Willie Lampkin',
    position: 'IOL',
    college: 'North Carolina',
    height: "6'2\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-81',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '182',
    name: 'Kyle Monangai',
    position: 'RB',
    college: 'Rutgers',
    height: "5'9\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-82',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '183',
    name: 'Isaac TeSlaa',
    position: 'WR',
    college: 'Arkansas',
    height: "6'4\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-83',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '184',
    name: 'Luke Lachey',
    position: 'TE',
    college: 'Iowa',
    height: "6'6\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-84',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '185',
    name: 'Howard Cross III',
    position: 'DL',
    college: 'Notre Dame',
    height: "6'1\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-85',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '186',
    name: 'Drew Kendall',
    position: 'IOL',
    college: 'Boston College',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-86',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '187',
    name: 'Jack Nelson',
    position: 'OT',
    college: 'Wisconsin',
    height: "6'7\"",
    weight: '320',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-87',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '188',
    name: 'Tommi Hill',
    position: 'CB',
    college: 'Nebraska',
    height: "6'1\"",
    weight: '190',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-88',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '189',
    name: 'Jarquez Hunter',
    position: 'RB',
    college: 'Auburn',
    height: "5'10\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-89',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '190',
    name: 'Jaylin Lane',
    position: 'WR',
    college: 'Virginia Tech',
    height: "5'10\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-90',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '191',
    name: 'Jay Higgins',
    position: 'LB',
    college: 'Iowa',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-91',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '192',
    name: 'Jordan Hancock',
    position: 'CB',
    college: 'Ohio State',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-92',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '193',
    name: 'Tyler Baron',
    position: 'EDGE',
    college: 'Miami (FL)',
    height: "6'4\"",
    weight: '260',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-93',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '194',
    name: 'Teddye Buchanan',
    position: 'LB',
    college: 'California',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-94',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '195',
    name: 'Maxen Hook',
    position: 'S',
    college: 'Toledo',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-95',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '196',
    name: 'Jalin Conyers',
    position: 'TE',
    college: 'Texas Tech',
    height: "6'4\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-96',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '197',
    name: 'Kalel Mullings',
    position: 'RB',
    college: 'Michigan',
    height: "6'1\"",
    weight: '220',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-97',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '198',
    name: 'Cam Jackson',
    position: 'DL',
    college: 'Florida',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-98',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '199',
    name: 'Kaimon Rucker',
    position: 'EDGE',
    college: 'North Carolina',
    height: "6'2\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-99',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '200',
    name: 'Mitchell Evans',
    position: 'TE',
    college: 'Notre Dame',
    height: "6'5\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-100',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '201',
    name: 'Kitan Crawford',
    position: 'S',
    college: 'Nevada',
    height: "6'0\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-51',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '202',
    name: 'R.J. Mickens',
    position: 'S',
    college: 'Clemson',
    height: "6'1\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-52',
    notes: 'Versatile safety with good instincts and tackling ability.'
  },
  {
    id: '203',
    name: 'Jake Briningstool',
    position: 'TE',
    college: 'Clemson',
    height: "6'6\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-53',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '204',
    name: 'Cody Simon',
    position: 'LB',
    college: 'Ohio State',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-54',
    notes: 'Athletic linebacker with good instincts and coverage ability.'
  },
  {
    id: '205',
    name: 'Kobe Hudson',
    position: 'WR',
    college: 'UCF',
    height: "6'1\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-55',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '206',
    name: 'Andres Borregales',
    position: 'K',
    college: 'Miami (FL)',
    height: "5'10\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-1',
    notes: 'Reliable kicker with strong leg and good accuracy.'
  },
  {
    id: '207',
    name: 'Nick Nash',
    position: 'WR',
    college: 'San Jose State',
    height: "6'2\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-1',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '208',
    name: 'Hunter Wohler',
    position: 'S',
    college: 'Wisconsin',
    height: "6'1\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-10',
    notes: 'Physical safety with good instincts and tackling ability.'
  },
  {
    id: '209',
    name: 'Jo\'Quavious Marks',
    position: 'RB',
    college: 'USC',
    height: "5'10\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-2',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '210',
    name: 'Mello Dotson',
    position: 'CB',
    college: 'Kansas',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 6,
    projectedPick: '6-1',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '211',
    name: 'Mac McWilliams',
    position: 'S',
    college: 'UCF',
    height: "6'1\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-3',
    notes: 'Versatile safety with good range and ball skills.'
  },
  {
    id: '212',
    name: 'Fadil Diggs',
    position: 'EDGE',
    college: 'Syracuse',
    height: "6'5\"",
    weight: '260',
    age: 22,
    grade: 'A',
    projectedRound: 6,
    projectedPick: '6-2',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '213',
    name: 'Clay Webb',
    position: 'IOL',
    college: 'Jacksonville State',
    height: "6'3\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 6,
    projectedPick: '6-3',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '214',
    name: 'Thomas Fidone II',
    position: 'TE',
    college: 'Nebraska',
    height: "6'6\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-56',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '215',
    name: 'Justin Walley',
    position: 'CB',
    college: 'Minnesota',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 7,
    projectedPick: '7-1',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '216',
    name: 'Bilhal Kone',
    position: 'CB',
    college: 'Western Michigan',
    height: "6'1\"",
    weight: '190',
    age: 22,
    grade: 'A',
    projectedRound: 9,
    projectedPick: '9-1',
    notes: 'Physical corner with good size and ball skills.'
  },
  {
    id: '217',
    name: 'Jaylin Smith',
    position: 'CB',
    college: 'USC',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-11',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '218',
    name: 'Benjamin Yurosek',
    position: 'TE',
    college: 'Georgia',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-57',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '219',
    name: 'Robert Longerbeam',
    position: 'CB',
    college: 'Rutgers',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-4',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '220',
    name: 'Tahj Brooks',
    position: 'RB',
    college: 'Texas Tech',
    height: "5'10\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-12',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '221',
    name: 'Ja\'Corey Brooks',
    position: 'WR',
    college: 'Louisville',
    height: "6'2\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-5',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '222',
    name: 'Tim Smith',
    position: 'DL',
    college: 'Alabama',
    height: "6'4\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-18',
    notes: 'Powerful interior defender with good size and strength.'
  },
  {
    id: '223',
    name: 'Jabbar Muhammad',
    position: 'CB',
    college: 'Oregon',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-6',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '224',
    name: 'Ricky White',
    position: 'WR',
    college: 'UNLV',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-7',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '225',
    name: 'Garrett Dellinger',
    position: 'IOL',
    college: 'LSU',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-8',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '226',
    name: 'Tonka Hemingway',
    position: 'DL',
    college: 'South Carolina',
    height: "6'3\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-9',
    notes: 'Versatile interior defender with good power.'
  },
  {
    id: '227',
    name: 'Collin Oliver',
    position: 'EDGE',
    college: 'Oklahoma State',
    height: "6'2\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-10',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '228',
    name: 'Tyler Cooper',
    position: 'IOL',
    college: 'Minnesota',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-11',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '229',
    name: 'Cam Horsley',
    position: 'DL',
    college: 'Boston College',
    height: "6'3\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-12',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '230',
    name: 'Andrew Armstrong',
    position: 'WR',
    college: 'Arkansas',
    height: "6'4\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-13',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '231',
    name: 'Tyrion Ingram-Dawkins',
    position: 'EDGE',
    college: 'Georgia',
    height: "6'5\"",
    weight: '275',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-14',
    notes: 'Explosive edge rusher with good length and power.'
  },
  {
    id: '232',
    name: 'Will Sheppard',
    position: 'WR',
    college: 'Colorado',
    height: "6'3\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-1',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '233',
    name: 'Kaden Prather',
    position: 'WR',
    college: 'Maryland',
    height: "6'3\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-2',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '234',
    name: 'Donovan Edwards',
    position: 'RB',
    college: 'Michigan',
    height: "5'11\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-58',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '235',
    name: 'Cody Lindenberg',
    position: 'LB',
    college: 'Minnesota',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-13',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '236',
    name: 'Dean Clark',
    position: 'S',
    college: 'Fresno State',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-3',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '237',
    name: 'Simeon Barrow Jr.',
    position: 'DL',
    college: 'Miami (FL)',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-12',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '238',
    name: 'Jason Marshall Jr.',
    position: 'CB',
    college: 'Florida',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 6,
    projectedPick: '6-4',
    notes: 'Physical corner with good size and ball skills.'
  },
  {
    id: '239',
    name: 'Yahya Black',
    position: 'DL',
    college: 'Iowa',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-14',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '240',
    name: 'C.J. Dippre',
    position: 'TE',
    college: 'Alabama',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-15',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '241',
    name: 'LeQuint Allen Jr.',
    position: 'RB',
    college: 'Syracuse',
    height: "6'0\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-16',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '242',
    name: 'Marcus Yarns',
    position: 'RB',
    college: 'Delaware',
    height: "5'10\"",
    weight: '195',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-17',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '243',
    name: 'Antwane Wells Jr.',
    position: 'WR',
    college: 'Mississippi',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-18',
    notes: 'Physical receiver with good route running and ball skills.'
  },
  {
    id: '244',
    name: 'Jimmy Horn Jr.',
    position: 'WR',
    college: 'Colorado',
    height: "5'10\"",
    weight: '180',
    age: 21,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-14',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '245',
    name: 'Ahmed Hassanein',
    position: 'DL',
    college: 'Boise State',
    height: "6'3\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-19',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '246',
    name: 'Brandon Crenshaw-Dickson',
    position: 'OT',
    college: 'Florida',
    height: "6'6\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-20',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '247',
    name: 'Alijah Huzzie',
    position: 'CB',
    college: 'North Carolina',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-21',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '248',
    name: 'Kurtis Rourke',
    position: 'QB',
    college: 'Indiana',
    height: "6'3\"",
    weight: '215',
    age: 23,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-13',
    notes: 'Poised pocket passer with good arm talent and decision-making.'
  },
  {
    id: '249',
    name: 'Dan Jackson',
    position: 'S',
    college: 'Georgia',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-14',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '250',
    name: 'Tyler Batty',
    position: 'EDGE',
    college: 'BYU',
    height: "6'5\"",
    weight: '275',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-51',
    notes: 'Explosive edge rusher with good length and power.'
  },
  {
    id: '251',
    name: 'Shemar James',
    position: 'LB',
    college: 'Florida',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-52',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '252',
    name: 'Shaun Dolac',
    position: 'LB',
    college: 'Buffalo',
    height: "6'1\"",
    weight: '225',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-53',
    notes: 'Physical linebacker with good instincts and tackling ability.'
  },
  {
    id: '253',
    name: 'Junior Tafuna',
    position: 'DL',
    college: 'Utah',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-1',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '254',
    name: 'Kain Medrano',
    position: 'LB',
    college: 'UCLA',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-2',
    notes: 'Athletic linebacker with good instincts and coverage ability.'
  },
  {
    id: '255',
    name: 'Keandre Lambert-Smith',
    position: 'WR',
    college: 'Auburn',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-54',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '256',
    name: 'Konata Mumpfield',
    position: 'WR',
    college: 'Pittsburgh',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-55',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '257',
    name: 'Max Brosmer',
    position: 'QB',
    college: 'Minnesota',
    height: "6'2\"",
    weight: '215',
    age: 22,
    grade: 'A',
    projectedRound: 7,
    projectedPick: '7-1',
    notes: 'Poised pocket passer with good arm talent and decision-making.'
  },
  {
    id: '258',
    name: 'Nazir Stackhouse',
    position: 'DL',
    college: 'Georgia',
    height: "6'3\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-56',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '259',
    name: 'Craig Woodson',
    position: 'S',
    college: 'California',
    height: "6'1\"",
    weight: '200',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-3',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '260',
    name: 'Xavier Truss',
    position: 'OT',
    college: 'Georgia',
    height: "6'7\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-4',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '261',
    name: 'Isaiah Neyor',
    position: 'WR',
    college: 'Nebraska',
    height: "6'3\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-5',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '262',
    name: 'Samuel Brown',
    position: 'WR',
    college: 'Miami (FL)',
    height: "6'2\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-6',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '263',
    name: 'Jackson Woodard',
    position: 'LB',
    college: 'UNLV',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-7',
    notes: 'Physical linebacker with good instincts and tackling ability.'
  },
  {
    id: '264',
    name: 'LaJohntay Wester',
    position: 'WR',
    college: 'Colorado',
    height: "5'11\"",
    weight: '180',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-8',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '265',
    name: 'Chimere Dike',
    position: 'WR',
    college: 'Florida',
    height: "6'1\"",
    weight: '195',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-9',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '266',
    name: 'Jermari Harris',
    position: 'CB',
    college: 'Iowa',
    height: "6'1\"",
    weight: '190',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-10',
    notes: 'Physical corner with good size and ball skills.'
  },
  {
    id: '267',
    name: 'Eli Cox',
    position: 'IOL',
    college: 'Kentucky',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-1',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '268',
    name: 'Moliki Matavao',
    position: 'TE',
    college: 'UCLA',
    height: "6'6\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-2',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '269',
    name: 'Gerad Christian-Lichtenhan',
    position: 'OT',
    college: 'Oregon State',
    height: "6'8\"",
    weight: '320',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-3',
    notes: 'Massive tackle with good size and strength.'
  },
  {
    id: '270',
    name: 'John Williams',
    position: 'OT',
    college: 'Cincinnati',
    height: "6'6\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-4',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '271',
    name: 'Warren Brinson',
    position: 'DL',
    college: 'Georgia',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-11',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '272',
    name: 'Ja\'Quinden Jackson',
    position: 'RB',
    college: 'Arkansas',
    height: "6'0\"",
    weight: '220',
    age: 21,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-1',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '273',
    name: 'Jay Toia',
    position: 'DL',
    college: 'UCLA',
    height: "6'3\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-2',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '274',
    name: 'Trey Wedig',
    position: 'OT',
    college: 'Indiana',
    height: "6'7\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-3',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '275',
    name: 'Luke Newman',
    position: 'IOL',
    college: 'Michigan State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 6,
    projectedPick: '6-1',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '276',
    name: 'Bru McCoy',
    position: 'WR',
    college: 'Tennessee',
    height: "6'3\"",
    weight: '220',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-12',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '277',
    name: 'O\'Donnell Fortune',
    position: 'CB',
    college: 'South Carolina',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-4',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '278',
    name: 'James Burnip',
    position: 'P',
    college: 'Alabama',
    height: "6'4\"",
    weight: '220',
    age: 22,
    grade: 'A',
    projectedRound: 10,
    projectedPick: '10-1',
    notes: 'Strong-legged punter with good hang time and placement.'
  },
  {
    id: '279',
    name: 'Zeek Biggers',
    position: 'DL',
    college: 'Georgia Tech',
    height: "6'4\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-13',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '280',
    name: 'Eugene Asante',
    position: 'LB',
    college: 'Auburn',
    height: "6'1\"",
    weight: '225',
    age: 22,
    grade: 'A',
    projectedRound: 11,
    projectedPick: '11-1',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '281',
    name: 'Jamon Dumas-Johnson',
    position: 'LB',
    college: 'Kentucky',
    height: "6'1\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 15,
    projectedPick: '15-1',
    notes: 'Physical linebacker with good instincts and tackling ability.'
  },
  {
    id: '282',
    name: 'Arian Smith',
    position: 'WR',
    college: 'Georgia',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-57',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '283',
    name: 'Tyreem Powell',
    position: 'LB',
    college: 'Rutgers',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-5',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '284',
    name: 'Joe Huber',
    position: 'IOL',
    college: 'Wisconsin',
    height: "6'5\"",
    weight: '315',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-6',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '285',
    name: 'Marques Sigle',
    position: 'S',
    college: 'Kansas State',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-7',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '286',
    name: 'Branson Taylor',
    position: 'OT',
    college: 'Pittsburgh',
    height: "6'7\"",
    weight: '320',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-8',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '287',
    name: 'Seth Henigan',
    position: 'QB',
    college: 'Memphis',
    height: "6'3\"",
    weight: '215',
    age: 21,
    grade: 'A',
    projectedRound: 7,
    projectedPick: '7-2',
    notes: 'Athletic quarterback with good arm talent and mobility.'
  },
  {
    id: '288',
    name: 'Bryce Cabeldue',
    position: 'IOL',
    college: 'Kansas',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 14,
    projectedPick: '14-1',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '289',
    name: 'Myles Hinton',
    position: 'OT',
    college: 'Michigan',
    height: "6'7\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-14',
    notes: 'Physical tackle with good size and strength.'
  },
  {
    id: '290',
    name: 'Karene Reid',
    position: 'LB',
    college: 'Utah',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-15',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '291',
    name: 'Brandon Adams',
    position: 'CB',
    college: 'UCF',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-16',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '292',
    name: 'Caden Prieskorn',
    position: 'TE',
    college: 'Mississippi',
    height: "6'6\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-17',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '293',
    name: 'Corey Kiner',
    position: 'RB',
    college: 'Cincinnati',
    height: "5'10\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-18',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '294',
    name: 'Jordan Oladokun',
    position: 'CB',
    college: 'Bowling Green',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-19',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '295',
    name: 'Elijhah Badger',
    position: 'WR',
    college: 'Florida',
    height: "6'2\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-20',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '296',
    name: 'Alijah Clark',
    position: 'S',
    college: 'Syracuse',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-21',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '297',
    name: 'Brady Cook',
    position: 'QB',
    college: 'Missouri',
    height: "6'2\"",
    weight: '215',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-22',
    notes: 'Poised pocket passer with good arm talent and decision-making.'
  },
  {
    id: '298',
    name: 'R.J. Oben',
    position: 'EDGE',
    college: 'Notre Dame',
    height: "6'4\"",
    weight: '260',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-23',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '299',
    name: 'Da\'Quan Felton',
    position: 'WR',
    college: 'Virginia Tech',
    height: "6'3\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-24',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '300',
    name: 'Dante Trader Jr.',
    position: 'QB',
    college: 'Maryland',
    height: "6'2\"",
    weight: '215',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-25',
    notes: 'Athletic quarterback with good arm talent and mobility.'
  },
  {
    id: '301',
    name: 'Jordan Watkins',
    position: 'WR',
    college: 'Mississippi',
    height: "6'1\"",
    weight: '195',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-26',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '302',
    name: 'Jacob Gideon',
    position: 'IOL',
    college: 'Western Michigan',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-27',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '303',
    name: 'Efton Chism III',
    position: 'WR',
    college: 'Eastern Washington',
    height: "6'2\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-28',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '304',
    name: 'Marcus Harris',
    position: 'CB',
    college: 'California',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-29',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '305',
    name: 'Francisco Mauigoa',
    position: 'LB',
    college: 'Miami (FL)',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-30',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '306',
    name: 'Joey Hobert',
    position: 'WR',
    college: 'Texas State',
    height: "6'1\"",
    weight: '190',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-31',
    notes: 'Athletic receiver with good route running and ball skills.'
  },
  {
    id: '307',
    name: 'Johnny Walker Jr.',
    position: 'EDGE',
    college: 'Missouri',
    height: "6'3\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-32',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '308',
    name: 'Isas Waxter',
    position: 'CB',
    college: 'Villanova',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-33',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '309',
    name: 'Shilo Sanders',
    position: 'S',
    college: 'Colorado',
    height: "6'1\"",
    weight: '205',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-34',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '310',
    name: 'Montrell Johnson',
    position: 'RB',
    college: 'Florida',
    height: "5'11\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-35',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '311',
    name: 'Dominic Lovett',
    position: 'WR',
    college: 'Georgia',
    height: "5'10\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-36',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '312',
    name: 'Jackson Meeks',
    position: 'WR',
    college: 'Syracuse',
    height: "6'2\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-37',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '313',
    name: 'Lan Larison',
    position: 'RB',
    college: 'UC Davis',
    height: "6'0\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-38',
    notes: 'Versatile running back with good vision and receiving ability.'
  },
  {
    id: '314',
    name: 'Mario Anderson',
    position: 'RB',
    college: 'Memphis',
    height: "5'10\"",
    weight: '210',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-39',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '315',
    name: 'Weston Franklin',
    position: 'IOL',
    college: 'Georgia Tech',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-40',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '316',
    name: 'Shamari Simmons',
    position: 'CB',
    college: 'Arizona State',
    height: "6'1\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-41',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '317',
    name: 'Malik Verdon',
    position: 'S',
    college: 'Iowa State',
    height: "6'2\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-42',
    notes: 'Physical safety with good instincts and tackling ability.'
  },
  {
    id: '318',
    name: 'Phil Mafah',
    position: 'RB',
    college: 'Clemson',
    height: "6'1\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-43',
    notes: 'Physical runner with good vision and contact balance.'
  },
  {
    id: '319',
    name: 'Adin Huntington',
    position: 'DL',
    college: 'Tulane',
    height: "6'3\"",
    weight: '290',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-58',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '320',
    name: 'Jared Harrison-Hunte',
    position: 'DL',
    college: 'SMU',
    height: "6'4\"",
    weight: '300',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-44',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '321',
    name: 'Gavin Bartholomew',
    position: 'TE',
    college: 'Pittsburgh',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-9',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '322',
    name: 'Addison West',
    position: 'IOL',
    college: 'Western Michigan',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-10',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '323',
    name: 'Kenny Gallop Jr.',
    position: 'S',
    college: 'Howard',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-45',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '324',
    name: 'Jacob Bayer',
    position: 'IOL',
    college: 'Arkansas State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-46',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '325',
    name: 'Drew Moss',
    position: 'IOL',
    college: 'Colorado State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-47',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '326',
    name: 'Bam Martin-Scott',
    position: 'LB',
    college: 'South Carolina',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-48',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '327',
    name: 'Brant Kuithe',
    position: 'TE',
    college: 'Utah',
    height: "6'5\"",
    weight: '250',
    age: 22,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-5',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '328',
    name: 'Nash Jones',
    position: 'IOL',
    college: 'Texas State',
    height: "6'4\"",
    weight: '310',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-11',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '329',
    name: 'Javontez Spraggins',
    position: 'IOL',
    college: 'Tennessee',
    height: "6'3\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-49',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '330',
    name: 'Robbie Ouzts',
    position: 'TE',
    college: 'Alabama',
    height: "6'4\"",
    weight: '260',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-50',
    notes: 'Physical tight end with good blocking and receiving skills.'
  },
  {
    id: '331',
    name: 'Jalen McLeod',
    position: 'LB',
    college: 'Auburn',
    height: "6'1\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-51',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '332',
    name: 'Fentrell Cypress',
    position: 'CB',
    college: 'Florida State',
    height: "6'0\"",
    weight: '185',
    age: 21,
    grade: 'A',
    projectedRound: 10,
    projectedPick: '10-2',
    notes: 'Athletic corner with good ball skills and tackling ability.'
  },
  {
    id: '333',
    name: 'Glendon Miller',
    position: 'S',
    college: 'Maryland',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 3,
    projectedPick: '3-12',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '334',
    name: 'Theo Wease',
    position: 'WR',
    college: 'Missouri',
    height: "6'3\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 21,
    projectedPick: '21-1',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '335',
    name: 'Rayuan Lane III',
    position: 'S',
    college: 'Navy',
    height: "6'1\"",
    weight: '205',
    age: 22,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-59',
    notes: 'Athletic safety with good range and ball skills.'
  },
  {
    id: '336',
    name: 'Jacory Croskey-Merritt',
    position: 'RB',
    college: 'Arizona',
    height: "5'10\"",
    weight: '200',
    age: 21,
    grade: 'A',
    projectedRound: 2,
    projectedPick: '2-60',
    notes: 'Explosive runner with good vision and contact balance.'
  },
  {
    id: '337',
    name: 'Thor Griffith',
    position: 'DL',
    college: 'Louisville',
    height: "6'3\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 11,
    projectedPick: '11-2',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '338',
    name: 'Bryson Nesbit',
    position: 'TE',
    college: 'North Carolina',
    height: "6'6\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-52',
    notes: 'Athletic tight end with good receiving skills and blocking potential.'
  },
  {
    id: '339',
    name: 'Carson Bruener',
    position: 'LB',
    college: 'Washington',
    height: "6'2\"",
    weight: '230',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-53',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '340',
    name: 'Jacolby George',
    position: 'WR',
    college: 'Miami (FL)',
    height: "6'0\"",
    weight: '190',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-54',
    notes: 'Explosive receiver with good route running and ball skills.'
  },
  {
    id: '341',
    name: 'Ben Sauls',
    position: 'K',
    college: 'Pittsburgh',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 5,
    projectedPick: '5-6',
    notes: 'Reliable kicker with strong leg and good accuracy.'
  },
  {
    id: '342',
    name: 'Elijah Simmons',
    position: 'DL',
    college: 'Tennessee',
    height: "6'4\"",
    weight: '340',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-55',
    notes: 'Massive interior defender with good power.'
  },
  {
    id: '343',
    name: 'Ryan Fitzgerald',
    position: 'K',
    college: 'Florida State',
    height: "6'0\"",
    weight: '185',
    age: 22,
    grade: 'A',
    projectedRound: 20,
    projectedPick: '20-1',
    notes: 'Reliable kicker with strong leg and good accuracy.'
  },
  {
    id: '344',
    name: 'Traeshon Holden',
    position: 'WR',
    college: 'Oregon',
    height: "6'3\"",
    weight: '210',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-56',
    notes: 'Physical receiver with good size and ball skills.'
  },
  {
    id: '345',
    name: 'Ethan Downs',
    position: 'EDGE',
    college: 'Oklahoma',
    height: "6'4\"",
    weight: '260',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-57',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '346',
    name: 'Steve Linton',
    position: 'EDGE',
    college: 'Baylor',
    height: "6'5\"",
    weight: '250',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-58',
    notes: 'Explosive edge rusher with good length and bend.'
  },
  {
    id: '347',
    name: 'Hayden Conner',
    position: 'IOL',
    college: 'Texas',
    height: "6'5\"",
    weight: '320',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-59',
    notes: 'Physical interior lineman with good strength and technique.'
  },
  {
    id: '348',
    name: 'DeAndre Jules',
    position: 'DL',
    college: 'South Carolina',
    height: "6'3\"",
    weight: '300',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-60',
    notes: 'Physical interior defender with good size and strength.'
  },
  {
    id: '349',
    name: 'Power Echols',
    position: 'LB',
    college: 'North Carolina',
    height: "6'1\"",
    weight: '225',
    age: 21,
    grade: 'A',
    projectedRound: 4,
    projectedPick: '4-61',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  },
  {
    id: '350',
    name: 'Chandler Martin',
    position: 'LB',
    college: 'Memphis',
    height: "6'2\"",
    weight: '230',
    age: 22,
    grade: 'A',
    projectedRound: 15,
    projectedPick: '15-2',
    notes: 'Athletic linebacker with good instincts and tackling ability.'
  }
];

// List of positions for the filter
const POSITIONS = [
  'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
  'CB', 'S', 'K', 'P', 'LS', 'EDGE'
];

// List of grades for the filter
const GRADES = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-'];

const BigBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedRound, setSelectedRound] = useState('all');

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handlePositionChange = (event: unknown) => {
    setSelectedPosition(event.target.value);
    setPage(0);
  };

  const handleGradeChange = (event: unknown) => {
    setSelectedGrade(event.target.value);
    setPage(0);
  };

  const handleRoundChange = (event: unknown) => {
    setSelectedRound(event.target.value);
    setPage(0);
  };

  // Filter prospects based on search term, position, grade, and round
  const filteredProspects = PROSPECTS.filter(prospect => {
    // Filter by search term (name, college, or notes)
    if (searchTerm && !(
      prospect.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
      prospect.notes.toLowerCase().includes(searchTerm.toLowerCase())
    )) {
      return false;
    }

    // Filter by position
    if (selectedPosition !== 'all' && prospect.position !== selectedPosition) {
      return false;
    }

    // Filter by grade
    if (selectedGrade !== 'all' && prospect.grade !== selectedGrade) {
      return false;
    }

    // Filter by projected round
    if (selectedRound !== 'all') {
      const round = parseInt(selectedRound);
      if (prospect.projectedRound !== round) {
        return false;
      }
    }

    return true;
  });

  // Sort prospects by grade (A+ to C-) and then by name
  const sortedProspects = [...filteredProspects].sort((a, b) => {
    // First sort by grade
    const gradeOrder = { 'A+': 0, 'A': 1, 'A-': 2, 'B+': 3, 'B': 4, 'B-': 5, 'C+': 6, 'C': 7, 'C-': 8 };
    const gradeComparison = gradeOrder[a.grade as keyof typeof gradeOrder] - gradeOrder[b.grade as keyof typeof gradeOrder];
    
    if (gradeComparison !== 0) {
      return gradeComparison;
    }
    
    // Then sort by name
    return a.name.localeCompare(b.name);
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        align="center"
        sx={{ 
          fontFamily: 'Merriweather, serif',
          fontWeight: 'bold'
        }}
      >
        NFL Draft Big Board 2025
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search prospects..."
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            size="small"
          />
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="position-filter-label">Position</InputLabel>
            <Select
              labelId="position-filter-label"
              id="position-filter"
              value={selectedPosition}
              label="Position"
              onChange={handlePositionChange}
            >
              <MenuItem value="all">All Positions</MenuItem>
              {POSITIONS.map((position) => (
                <MenuItem key={position} value={position}>
                  {position}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="grade-filter-label">Grade</InputLabel>
            <Select
              labelId="grade-filter-label"
              id="grade-filter"
              value={selectedGrade}
              label="Grade"
              onChange={handleGradeChange}
            >
              <MenuItem value="all">All Grades</MenuItem>
              {GRADES.map((grade) => (
                <MenuItem key={grade} value={grade}>
                  {grade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="round-filter-label">Round</InputLabel>
            <Select
              labelId="round-filter-label"
              id="round-filter"
              value={selectedRound}
              label="Round"
              onChange={handleRoundChange}
            >
              <MenuItem value="all">All Rounds</MenuItem>
              {[1, 2, 3, 4, 5, 6, 7].map((round) => (
                <MenuItem key={round} value={round}>
                  Round {round}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Height</TableCell>
                <TableCell>Weight</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Grade</TableCell>
                <TableCell>Projected</TableCell>
                <TableCell>Notes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedProspects
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((prospect, index) => (
                  <TableRow key={prospect.id}>
                    <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                    <TableCell>{prospect.name}</TableCell>
                    <TableCell>
                      <Chip label={prospect.position} size="small" />
                    </TableCell>
                    <TableCell>{prospect.college}</TableCell>
                    <TableCell>{prospect.height}</TableCell>
                    <TableCell>{prospect.weight}</TableCell>
                    <TableCell>{prospect.age}</TableCell>
                    <TableCell>
                      <Chip 
                        label={prospect.grade} 
                        size="small" 
                        color={
                          prospect.grade === 'A+' ? 'success' : 
                          prospect.grade === 'A' ? 'success' : 
                          prospect.grade === 'A-' ? 'primary' : 
                          prospect.grade === 'B+' ? 'primary' : 
                          prospect.grade === 'B' ? 'info' : 
                          prospect.grade === 'B-' ? 'info' : 
                          prospect.grade === 'C+' ? 'warning' : 
                          prospect.grade === 'C' ? 'warning' : 
                          'error'
                        }
                      />
                    </TableCell>
                    <TableCell>{prospect.projectedPick}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>{prospect.notes}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={sortedProspects.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default BigBoard; 