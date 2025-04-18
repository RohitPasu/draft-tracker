import React, { useState } from 'react';
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
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Stack,
  InputAdornment,
  TablePagination,
  Chip,
} from '@mui/material';
import { PROSPECTS } from '../data/prospects';
import SearchIcon from '@mui/icons-material/Search';

// List of positions for the filter
const POSITIONS = [
  'QB', 'RB', 'WR', 'TE', 'OT', 'OG', 'C', 'DT', 'DE', 'LB',
  'CB', 'S', 'K', 'P', 'LS', 'EDGE'
];

// Grade color mapping
const GRADE_COLORS = {
  'A+': '#4CAF50', // Green
  'A': '#4CAF50',  // Green
  'A-': '#8BC34A', // Light Green
  'B+': '#2196F3', // Blue
  'B': '#2196F3',  // Blue
  'B-': '#03A9F4', // Light Blue
  'C+': '#FFC107', // Amber
  'C': '#FFC107',  // Amber
  'C-': '#FF9800', // Orange
};

const BigBoard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [selectedRound, setSelectedRound] = useState('all');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  const handlePositionChange = (event: any) => {
    setSelectedPosition(event.target.value);
    setPage(0);
  };

  const handleRoundChange = (event: any) => {
    setSelectedRound(event.target.value);
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter prospects based on search term, position, and round
  const filteredProspects = PROSPECTS.filter(prospect => {
    if (searchQuery && !(
      prospect.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prospect.notes?.toLowerCase().includes(searchQuery.toLowerCase())
    )) {
      return false;
    }

    // Filter by position
    if (selectedPosition !== 'all' && prospect.position !== selectedPosition) {
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

  // Sort prospects by name
  const sortedProspects = [...filteredProspects].sort((a, b) => a.name.localeCompare(b.name));

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
            value={searchQuery}
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
                    <TableCell>{prospect.position}</TableCell>
                    <TableCell>{prospect.college}</TableCell>
                    <TableCell>{prospect.height}</TableCell>
                    <TableCell>{prospect.weight}</TableCell>
                    <TableCell>{prospect.age}</TableCell>
                    <TableCell>
                      <Chip
                        label={prospect.grade}
                        size="small"
                        sx={{
                          backgroundColor: GRADE_COLORS[prospect.grade as keyof typeof GRADE_COLORS] || '#9E9E9E',
                          color: 'white',
                          fontWeight: 'bold',
                        }}
                      />
                    </TableCell>
                    <TableCell>{prospect.projectedPick}</TableCell>
                    <TableCell>{prospect.notes || ''}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50]}
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