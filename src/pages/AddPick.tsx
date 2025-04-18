import React, { useState, useEffect } from 'react';
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
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DraftPick } from '../types/draft';
import { PROSPECTS, Prospect } from '../data/prospects';
import { getDraftPicks, addDraftPick, deleteDraftPick } from '../services/draftService';

// List of NFL teams
const NFL_TEAMS = [
  'ARI', 'ATL', 'BAL', 'BUF', 'CAR', 'CHI', 'CIN', 'CLE', 'DAL', 'DEN',
  'DET', 'GB', 'HOU', 'IND', 'JAX', 'KC', 'LAC', 'LAR', 'LV', 'MIA',
  'MIN', 'NE', 'NO', 'NYG', 'NYJ', 'PHI', 'PIT', 'SEA', 'SF', 'TB', 'TEN', 'WAS'
];

// List of positions
// const POSITIONS = [
//   'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
//   'CB', 'S', 'K', 'P', 'LS', 'EDGE'
// ];

const AddPick = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
  const [existingPicks, setExistingPicks] = useState<DraftPick[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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

  useEffect(() => {
    const loadExistingPicks = async () => {
      try {
        setLoading(true);
        const picks = await getDraftPicks();
        setExistingPicks(picks);
        setError(null);
      } catch (err) {
        setError('Failed to load draft picks');
        console.error('Error loading draft picks:', err);
      } finally {
        setLoading(false);
      }
    };

    loadExistingPicks();
  }, []);

  const handleChange = (e: any) => {
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

  const handleRemovePick = async (pickId: string) => {
    try {
      console.log('Removing pick with ID:', pickId);
      
      if (!pickId) {
        console.error('No ID provided for pick to remove');
        setSnackbarMessage('Failed to remove pick: No ID provided');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }
      
      await deleteDraftPick(pickId);
      setExistingPicks(prev => prev.filter(pick => pick.id !== pickId));
      setSnackbarMessage('Pick removed successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    } catch (err) {
      setSnackbarMessage('Failed to remove pick');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error removing pick:', err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const newPick: DraftPick = {
        id: '',
        round: Number(formData.round),
        pick: Number(formData.pick),
        team: formData.team || '',
        player: {
          id: formData.player?.id || '',
          name: formData.player?.name || '',
          position: formData.player?.position || '',
          college: formData.player?.college || '',
          height: formData.player?.height || '',
          weight: formData.player?.weight || '',
          age: Number(formData.player?.age) || 0
        },
        timestamp: new Date().toISOString()
      };
      
      const savedPick = await addDraftPick(newPick);
      setExistingPicks(prev => [...prev, savedPick]);
      
      setSnackbarMessage('Pick added successfully!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      
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
    } catch (err) {
      setSnackbarMessage('Failed to add pick');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      console.error('Error adding pick:', err);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Manage Draft Picks
      </Typography>
      
      {/* Existing Picks Table */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Existing Picks
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Round</TableCell>
                <TableCell>Pick</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Player</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>College</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {existingPicks.map((pick) => (
                <TableRow key={pick.id}>
                  <TableCell>{pick.round}</TableCell>
                  <TableCell>{pick.pick}</TableCell>
                  <TableCell>{pick.team}</TableCell>
                  <TableCell>{pick.player.name}</TableCell>
                  <TableCell>{pick.player.position}</TableCell>
                  <TableCell>{pick.player.college}</TableCell>
                  <TableCell>
                    <IconButton 
                      color="error" 
                      onClick={() => handleRemovePick(pick.id)}
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add New Pick Form */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add New Pick
        </Typography>
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
                onChange={handleChange}
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