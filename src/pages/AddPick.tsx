import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Paper,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  SelectChangeEvent,
  Stack
} from '@mui/material';
import { DraftPick, Player } from '../types/draft';
import { PROSPECTS, Prospect } from './BigBoard';

// List of NFL teams
const NFL_TEAMS = [
  'ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN',
  'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA',
  'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'
];

// List of positions
const POSITIONS = [
  'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
  'CB', 'S', 'K', 'P', 'LS', 'EDGE'
];

const AddPick = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlayerSelect = (e: SelectChangeEvent<string>) => {
    const playerId = e.target.value;
    const selectedPlayer = PROSPECTS.find(p => p.id === playerId);
    if (selectedPlayer) {
      setFormData(prev => ({
        ...prev,
        player: selectedPlayer
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate a unique ID for the pick
    const newPick: DraftPick = {
      id: Date.now().toString(),
      round: Number(formData.round),
      pick: Number(formData.pick),
      team: formData.team || '',
      player: {
        id: formData.player?.id || Date.now().toString(),
        name: formData.player?.name || '',
        position: formData.player?.position || '',
        college: formData.player?.college || '',
        height: formData.player?.height || '',
        weight: formData.player?.weight || '',
        age: Number(formData.player?.age) || 0
      },
      timestamp: new Date().toISOString()
    };
    
    // Get existing picks from localStorage
    const existingPicks = JSON.parse(localStorage.getItem('draftPicks') || '[]');
    
    // Add the new pick
    const updatedPicks = [...existingPicks, newPick];
    
    // Save to localStorage
    localStorage.setItem('draftPicks', JSON.stringify(updatedPicks));
    
    // Show success message
    setSnackbarMessage('Pick added successfully!');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);
    
    // Increment the pick number for the next selection
    setFormData(prev => ({
      ...prev,
      pick: prev.pick ? prev.pick + 1 : 1,
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
    }));
    
    // Don't navigate away - stay on the page
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Add Draft Pick
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Round"
                type="number"
                name="round"
                value={formData.round || ''}
                onChange={handleChange}
                inputProps={{ min: 1, max: 7 }}
                required
              />
              <TextField
                fullWidth
                label="Pick"
                type="number"
                name="pick"
                value={formData.pick || ''}
                onChange={handleChange}
                inputProps={{ min: 1 }}
                required
              />
            </Box>
            <FormControl fullWidth required>
              <InputLabel id="team-label">Team</InputLabel>
              <Select
                labelId="team-label"
                name="team"
                value={formData.team || ''}
                onChange={handleChange as any}
                label="Team"
              >
                {NFL_TEAMS.map((team) => (
                  <MenuItem key={team} value={team}>
                    {team}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth required>
              <InputLabel id="player-label">Player</InputLabel>
              <Select
                labelId="player-label"
                name="player.id"
                value={formData.player?.id || ''}
                onChange={handlePlayerSelect}
                label="Player"
              >
                {PROSPECTS.map((player: Prospect) => (
                  <MenuItem key={player.id} value={player.id}>
                    {player.name} - {player.position} - {player.college}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddPick; 