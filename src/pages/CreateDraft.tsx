import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  MenuItem,
  Stack,
} from '@mui/material';
import { useState } from 'react';
import { DraftPick, Player } from '../types/draft';
import { PROSPECTS, Prospect } from '../data/prospects';

const NFL_TEAMS = [
  'ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN',
  'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA',
  'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'
];

// const POSITIONS = [
//   'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
//   'CB', 'S', 'K', 'P', 'LS'
// ];

const CreateDraft = () => {
  const [formData, setFormData] = useState<Partial<DraftPick>>({
    round: 1,
    pick: 1,
    team: '',
    player: {
      id: '',
      name: '',
      position: '',
      college: '',
      height: '',
      weight: '',
      age: 0
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('player.')) {
      const playerField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        player: {
          ...prev.player as Player,
          [playerField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handlePlayerSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const playerId = e.target.value;
    const selectedPlayer = PROSPECTS.find((p: Prospect) => p.id === playerId);
    
    if (selectedPlayer) {
      setFormData(prev => ({
        ...prev,
        player: {
          id: selectedPlayer.id,
          name: selectedPlayer.name,
          position: selectedPlayer.position,
          college: selectedPlayer.college,
          height: selectedPlayer.height,
          weight: selectedPlayer.weight,
          age: selectedPlayer.age
        }
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement draft pick creation logic
    console.log('Form submitted:', formData);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Draft Pick
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Round"
                type="number"
                name="round"
                value={formData.round || ''}
                onChange={handleChange}
                inputProps={{ min: 1, max: 7 }}
              />
              <TextField
                fullWidth
                label="Pick"
                type="number"
                name="pick"
                value={formData.pick || ''}
                onChange={handleChange}
                inputProps={{ min: 1 }}
              />
            </Box>
            
            <TextField
              fullWidth
              select
              label="Team"
              name="team"
              value={formData.team || ''}
              onChange={handleChange}
            >
              {NFL_TEAMS.map((team) => (
                <MenuItem key={team} value={team}>
                  {team}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              select
              label="Player"
              name="player.id"
              value={formData.player?.id || ''}
              onChange={handlePlayerSelect}
            >
              {PROSPECTS.map((player: Prospect) => (
                <MenuItem key={player.id} value={player.id}>
                  {player.name} - {player.position} - {player.college}
                </MenuItem>
              ))}
            </TextField>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Position"
                name="player.position"
                value={formData.player?.position || ''}
                disabled
              />
              <TextField
                fullWidth
                label="College"
                name="player.college"
                value={formData.player?.college || ''}
                disabled
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Height"
                name="player.height"
                value={formData.player?.height || ''}
                disabled
              />
              <TextField
                fullWidth
                label="Weight"
                name="player.weight"
                value={formData.player?.weight || ''}
                disabled
              />
              <TextField
                fullWidth
                label="Age"
                name="player.age"
                type="number"
                value={formData.player?.age || ''}
                disabled
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" type="submit">
                Add Pick
              </Button>
            </Box>
          </Stack>
        </form>
      </Paper>
    </Container>
  );
};

export default CreateDraft; 