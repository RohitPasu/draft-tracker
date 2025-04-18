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
import { PROSPECTS, Prospect } from "../data/prospects";

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

  const handlePositionChange = (event: any) => {
    setSelectedPosition(event.target.value);
    setPage(0);
  };

  const handleGradeChange = (event: any) => {
    setSelectedGrade(event.target.value);
    setPage(0);
  };

  const handleRoundChange = (event: any) => {
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