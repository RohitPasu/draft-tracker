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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDraftPicks = async () => {
      try {
        setLoading(true);
        const picks = await getDraftPicks();
        
        if (picks.length > 0) {
          // Group picks by round
          const picksByRound = picks.reduce((acc: DraftRound[], pick: DraftPick) => {
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
        }
        setError(null);
      } catch (err) {
        setError('Failed to load draft picks');
        console.error('Error loading draft picks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadDraftPicks();
  }, []);
  
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