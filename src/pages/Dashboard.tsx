import { Container, Typography, Paper, Box, Chip, Stack, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useState, useEffect } from 'react';
import { DraftPick, DraftRound } from '../types/draft';
import { getDraftPicks } from '../services/draftService';

// List of NFL teams for the filter
const NFL_TEAMS = [
  'ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN',
  'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA',
  'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'
];

// List of positions for the filter
const POSITIONS = [
  'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
  'CB', 'S', 'K', 'P', 'LS', 'EDGE'
];

const Dashboard = () => {
  const [draftRounds, setDraftRounds] = useState<DraftRound[]>([]);
  const [selectedRound, setSelectedRound] = useState<number | 'all'>('all');
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  const [selectedPosition, setSelectedPosition] = useState<string>('all');

  // Function to load and process draft picks
  const loadDraftPicks = () => {
    // Load picks from the service
    const savedPicks = getDraftPicks();
    
    if (savedPicks.length > 0) {
      // Group picks by round
      const picksByRound = savedPicks.reduce((acc: DraftRound[], pick: DraftPick) => {
        const roundIndex = acc.findIndex(r => r.round === pick.round);
        
        if (roundIndex >= 0) {
          acc[roundIndex].picks.push(pick);
        } else {
          acc.push({
            round: pick.round,
            picks: [pick]
          });
        }
        
        return acc;
      }, []);
      
      // Sort rounds and picks
      picksByRound.sort((a: DraftRound, b: DraftRound) => a.round - b.round);
      picksByRound.forEach((round: DraftRound) => {
        round.picks.sort((a: DraftPick, b: DraftPick) => a.pick - b.pick);
      });
      
      setDraftRounds(picksByRound);
    } else {
      // Use mock data if no saved picks
      setDraftRounds([
        {
          round: 1,
          picks: [
            {
              id: '1',
              round: 1,
              pick: 1,
              team: 'CHI',
              player: {
                id: '1',
                name: 'Caleb Williams',
                position: 'QB',
                college: 'USC',
                height: "6'1\"",
                weight: '215',
                age: 22
              },
              timestamp: '2024-04-25T20:00:00Z'
            },
            {
              id: '2',
              round: 1,
              pick: 2,
              team: 'WAS',
              player: {
                id: '2',
                name: 'Jayden Daniels',
                position: 'QB',
                college: 'LSU',
                height: "6'4\"",
                weight: '210',
                age: 23
              },
              timestamp: '2024-04-25T20:15:00Z'
            },
            {
              id: '3',
              round: 1,
              pick: 3,
              team: 'NE',
              player: {
                id: '3',
                name: 'Drake Maye',
                position: 'QB',
                college: 'UNC',
                height: "6'4\"",
                weight: '223',
                age: 21
              },
              timestamp: '2024-04-25T20:30:00Z'
            },
            {
              id: '4',
              round: 1,
              pick: 4,
              team: 'ARI',
              player: {
                id: '4',
                name: 'Marvin Harrison Jr.',
                position: 'WR',
                college: 'Ohio State',
                height: "6'3\"",
                weight: '209',
                age: 21
              },
              timestamp: '2024-04-25T20:45:00Z'
            },
            {
              id: '5',
              round: 1,
              pick: 5,
              team: 'LAC',
              player: {
                id: '5',
                name: 'Joe Alt',
                position: 'OT',
                college: 'Notre Dame',
                height: "6'8\"",
                weight: '321',
                age: 21
              },
              timestamp: '2024-04-25T21:00:00Z'
            },
            {
              id: '6',
              round: 1,
              pick: 6,
              team: 'NYG',
              player: {
                id: '6',
                name: 'Malik Nabers',
                position: 'WR',
                college: 'LSU',
                height: "6'0\"",
                weight: '200',
                age: 20
              },
              timestamp: '2024-04-25T21:15:00Z'
            },
            {
              id: '7',
              round: 1,
              pick: 7,
              team: 'TEN',
              player: {
                id: '7',
                name: 'JC Latham',
                position: 'OT',
                college: 'Alabama',
                height: "6'6\"",
                weight: '342',
                age: 21
              },
              timestamp: '2024-04-25T21:30:00Z'
            },
            {
              id: '8',
              round: 1,
              pick: 8,
              team: 'ATL',
              player: {
                id: '8',
                name: 'Dallas Turner',
                position: 'EDGE',
                college: 'Alabama',
                height: "6'3\"",
                weight: '247',
                age: 21
              },
              timestamp: '2024-04-25T21:45:00Z'
            }
          ]
        },
        {
          round: 2,
          picks: [
            {
              id: '9',
              round: 2,
              pick: 1,
              team: 'CAR',
              player: {
                id: '9',
                name: 'Xavier Legette',
                position: 'WR',
                college: 'South Carolina',
                height: "6'1\"",
                weight: '221',
                age: 23
              },
              timestamp: '2024-04-26T20:00:00Z'
            },
            {
              id: '10',
              round: 2,
              pick: 2,
              team: 'HOU',
              player: {
                id: '10',
                name: 'Kamari Lassiter',
                position: 'CB',
                college: 'Georgia',
                height: "6'0\"",
                weight: '186',
                age: 21
              },
              timestamp: '2024-04-26T20:15:00Z'
            },
            {
              id: '11',
              round: 2,
              pick: 3,
              team: 'MIN',
              player: {
                id: '11',
                name: 'Dallas Turner',
                position: 'EDGE',
                college: 'Alabama',
                height: "6'3\"",
                weight: '247',
                age: 21
              },
              timestamp: '2024-04-26T20:30:00Z'
            },
            {
              id: '12',
              round: 2,
              pick: 4,
              team: 'SEA',
              player: {
                id: '12',
                name: 'Byron Murphy II',
                position: 'DT',
                college: 'Texas',
                height: "6'1\"",
                weight: '297',
                age: 21
              },
              timestamp: '2024-04-26T20:45:00Z'
            },
            {
              id: '13',
              round: 2,
              pick: 5,
              team: 'IND',
              player: {
                id: '13',
                name: 'Adonai Mitchell',
                position: 'WR',
                college: 'Texas',
                height: "6'2\"",
                weight: '205',
                age: 22
              },
              timestamp: '2024-04-26T21:00:00Z'
            },
            {
              id: '14',
              round: 2,
              pick: 6,
              team: 'LAR',
              player: {
                id: '14',
                name: 'Braden Fiske',
                position: 'DT',
                college: 'FSU',
                height: "6'4\"",
                weight: '292',
                age: 24
              },
              timestamp: '2024-04-26T21:15:00Z'
            },
            {
              id: '15',
              round: 2,
              pick: 7,
              team: 'GB',
              player: {
                id: '15',
                name: 'Edgerrin Cooper',
                position: 'LB',
                college: 'Texas A&M',
                height: "6'2\"",
                weight: '230',
                age: 21
              },
              timestamp: '2024-04-26T21:30:00Z'
            },
            {
              id: '16',
              round: 2,
              pick: 8,
              team: 'TB',
              player: {
                id: '16',
                name: 'Chris Braswell',
                position: 'EDGE',
                college: 'Alabama',
                height: "6'3\"",
                weight: '251',
                age: 22
              },
              timestamp: '2024-04-26T21:45:00Z'
            }
          ]
        },
        {
          round: 3,
          picks: [
            {
              id: '17',
              round: 3,
              pick: 1,
              team: 'DEN',
              player: {
                id: '17',
                name: 'Bo Nix',
                position: 'QB',
                college: 'Oregon',
                height: "6'2\"",
                weight: '214',
                age: 24
              },
              timestamp: '2024-04-27T20:00:00Z'
            },
            {
              id: '18',
              round: 3,
              pick: 2,
              team: 'LV',
              player: {
                id: '18',
                name: 'Delmar Glaze',
                position: 'OT',
                college: 'Maryland',
                height: "6'5\"",
                weight: '315',
                age: 22
              },
              timestamp: '2024-04-27T20:15:00Z'
            },
            {
              id: '19',
              round: 3,
              pick: 3,
              team: 'NO',
              player: {
                id: '19',
                name: 'Spencer Rattler',
                position: 'QB',
                college: 'South Carolina',
                height: "6'1\"",
                weight: '217',
                age: 23
              },
              timestamp: '2024-04-27T20:30:00Z'
            },
            {
              id: '20',
              round: 3,
              pick: 4,
              team: 'CLE',
              player: {
                id: '20',
                name: 'Zak Zinter',
                position: 'OG',
                college: 'Michigan',
                height: "6'6\"",
                weight: '309',
                age: 22
              },
              timestamp: '2024-04-27T20:45:00Z'
            },
            {
              id: '21',
              round: 3,
              pick: 5,
              team: 'MIA',
              player: {
                id: '21',
                name: 'Payton Wilson',
                position: 'LB',
                college: 'NC State',
                height: "6'4\"",
                weight: '233',
                age: 24
              },
              timestamp: '2024-04-27T21:00:00Z'
            },
            {
              id: '22',
              round: 3,
              pick: 6,
              team: 'DAL',
              player: {
                id: '22',
                name: 'Cooper Beebe',
                position: 'OG',
                college: 'Kansas State',
                height: "6'3\"",
                weight: '322',
                age: 23
              },
              timestamp: '2024-04-27T21:15:00Z'
            },
            {
              id: '23',
              round: 3,
              pick: 7,
              team: 'DET',
              player: {
                id: '23',
                name: 'Giovanni Manu',
                position: 'OT',
                college: 'British Columbia',
                height: "6'7\"",
                weight: '352',
                age: 23
              },
              timestamp: '2024-04-27T21:30:00Z'
            },
            {
              id: '24',
              round: 3,
              pick: 8,
              team: 'BAL',
              player: {
                id: '24',
                name: 'Devin Witherspoon',
                position: 'CB',
                college: 'Illinois',
                height: "6'0\"",
                weight: '181',
                age: 23
              },
              timestamp: '2024-04-27T21:45:00Z'
            }
          ]
        },
        {
          round: 4,
          picks: [
            {
              id: '25',
              round: 4,
              pick: 1,
              team: 'KC',
              player: {
                id: '25',
                name: 'Jared Wiley',
                position: 'TE',
                college: 'TCU',
                height: "6'6\"",
                weight: '249',
                age: 23
              },
              timestamp: '2024-04-28T20:00:00Z'
            },
            {
              id: '26',
              round: 4,
              pick: 2,
              team: 'SF',
              player: {
                id: '26',
                name: 'Isaac Guerendo',
                position: 'RB',
                college: 'Louisville',
                height: "6'0\"",
                weight: '221',
                age: 23
              },
              timestamp: '2024-04-28T20:15:00Z'
            },
            {
              id: '27',
              round: 4,
              pick: 3,
              team: 'JAX',
              player: {
                id: '27',
                name: 'Javon Foster',
                position: 'OT',
                college: 'Missouri',
                height: "6'5\"",
                weight: '309',
                age: 24
              },
              timestamp: '2024-04-28T20:30:00Z'
            },
            {
              id: '28',
              round: 4,
              pick: 4,
              team: 'CIN',
              player: {
                id: '28',
                name: 'Erick All',
                position: 'TE',
                college: 'Iowa',
                height: "6'5\"",
                weight: '252',
                age: 24
              },
              timestamp: '2024-04-28T20:45:00Z'
            },
            {
              id: '29',
              round: 4,
              pick: 5,
              team: 'NYJ',
              player: {
                id: '29',
                name: 'Braelon Allen',
                position: 'RB',
                college: 'Wisconsin',
                height: "6'1\"",
                weight: '235',
                age: 20
              },
              timestamp: '2024-04-28T21:00:00Z'
            },
            {
              id: '30',
              round: 4,
              pick: 6,
              team: 'PIT',
              player: {
                id: '30',
                name: 'Roman Wilson',
                position: 'WR',
                college: 'Michigan',
                height: "5'11\"",
                weight: '185',
                age: 22
              },
              timestamp: '2024-04-28T21:15:00Z'
            },
            {
              id: '31',
              round: 4,
              pick: 7,
              team: 'PHI',
              player: {
                id: '31',
                name: 'Will Shipley',
                position: 'RB',
                college: 'Clemson',
                height: "5'11\"",
                weight: '206',
                age: 21
              },
              timestamp: '2024-04-28T21:30:00Z'
            },
            {
              id: '32',
              round: 4,
              pick: 8,
              team: 'BUF',
              player: {
                id: '32',
                name: 'Cole Bishop',
                position: 'S',
                college: 'Utah',
                height: "6'2\"",
                weight: '206',
                age: 21
              },
              timestamp: '2024-04-28T21:45:00Z'
            }
          ]
        },
        {
          round: 5,
          picks: [
            {
              id: '33',
              round: 5,
              pick: 1,
              team: 'CHI',
              player: {
                id: '33',
                name: 'Rome Odunze',
                position: 'WR',
                college: 'Washington',
                height: "6'3\"",
                weight: '212',
                age: 21
              },
              timestamp: '2024-04-29T20:00:00Z'
            }
          ]
        }
      ]);
    }
  };

  useEffect(() => {
    // Load picks on initial render
    loadDraftPicks();
    
    // Listen for updates to draft picks
    const handleDraftPicksUpdated = () => {
      loadDraftPicks();
    };
    
    window.addEventListener('draftPicksUpdated', handleDraftPicksUpdated);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('draftPicksUpdated', handleDraftPicksUpdated);
    };
  }, []);

  // const totalPicks = draftRounds.reduce((acc, round) => acc + round.picks.length, 0);
  
  // Filter picks based on selected round, team, and position
  const filteredPicks = draftRounds.flatMap(round => round.picks)
    .filter(pick => {
      // First filter by round if a specific round is selected
      if (selectedRound !== 'all' && pick.round !== selectedRound) {
        return false;
      }
      
      // Then filter by team if a specific team is selected
      if (selectedTeam !== 'all' && pick.team !== selectedTeam) {
        return false;
      }
      
      // Then filter by position if a specific position is selected
      if (selectedPosition !== 'all' && pick.player.position !== selectedPosition) {
        return false;
      }
      
      return true;
    });

  const handleRoundChange = (event: any) => {
    setSelectedRound(event.target.value);
  };

  const handleTeamChange = (event: any) => {
    setSelectedTeam(event.target.value);
  };

  const handlePositionChange = (event: any) => {
    setSelectedPosition(event.target.value);
  };

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
        NFL Draft Tracker
      </Typography>
      
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3, gap: 2 }}>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="team-selector-label">Team</InputLabel>
          <Select
            labelId="team-selector-label"
            id="team-selector"
            value={selectedTeam}
            label="Team"
            onChange={handleTeamChange}
            size="small"
          >
            <MenuItem value="all">All Teams</MenuItem>
            {NFL_TEAMS.map((team) => (
              <MenuItem key={team} value={team}>
                {team}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="position-selector-label">Position</InputLabel>
          <Select
            labelId="position-selector-label"
            id="position-selector"
            value={selectedPosition}
            label="Position"
            onChange={handlePositionChange}
            size="small"
          >
            <MenuItem value="all">All Positions</MenuItem>
            {POSITIONS.map((position) => (
              <MenuItem key={position} value={position}>
                {position}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      
      <Stack spacing={3} alignItems="center">
        <Box sx={{ width: '100%', maxWidth: '900px' }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                {selectedRound === 'all' ? 'All Round Picks' : `Round ${selectedRound} Picks`}
              </Typography>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="round-selector-label">Round</InputLabel>
                <Select
                  labelId="round-selector-label"
                  id="round-selector"
                  value={selectedRound}
                  label="Round"
                  onChange={handleRoundChange}
                  size="small"
                >
                  <MenuItem value="all">All Rounds</MenuItem>
                  {draftRounds.map((round) => (
                    <MenuItem key={round.round} value={round.round}>
                      Round {round.round}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ 
              maxHeight: '400px', 
              overflowY: 'auto',
              pr: 1, // Add some padding on the right for the scrollbar
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: '#f1f1f1',
                borderRadius: '10px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '10px',
                '&:hover': {
                  backgroundColor: '#555',
                },
              },
            }}>
              {filteredPicks.length > 0 ? (
                filteredPicks.map((pick) => (
                  <Box key={pick.id} sx={{ mb: 2, p: 1, borderBottom: '1px solid #eee' }}>
                    <Typography variant="subtitle1">
                      Round {pick.round}, Pick {pick.pick} - {pick.team}
                    </Typography>
                    <Typography variant="body1" fontWeight="bold">
                      {pick.player.name}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mt: 1, flexWrap: 'wrap' }}>
                      <Chip label={pick.player.position} size="small" />
                      <Chip label={pick.player.college} size="small" variant="outlined" />
                      <Chip label={pick.player.height} size="small" variant="outlined" />
                      <Chip label={`${pick.player.weight} lbs`} size="small" variant="outlined" />
                      <Chip label={`Age: ${pick.player.age}`} size="small" variant="outlined" />
                    </Box>
                  </Box>
                ))
              ) : (
                <Typography variant="body1" align="center" sx={{ py: 2 }}>
                  No picks found for this round.
                </Typography>
              )}
            </Box>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
};

export default Dashboard; 