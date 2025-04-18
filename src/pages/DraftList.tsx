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
  Chip,
  Box,
} from '@mui/material';
import { useState, useEffect } from 'react';
import { DraftRound } from '../types/draft';

const DraftList = () => {
  const [draftRounds, setDraftRounds] = useState<DraftRound[]>([]);

  useEffect(() => {
    // TODO: Fetch draft data from backend
    // For now, using mock data
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
          }
        ]
      }
    ]);
  }, []);

  const allPicks = draftRounds.flatMap(round => round.picks);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        NFL Draft Picks
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Round</TableCell>
              <TableCell>Pick</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Player</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>College</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allPicks.map((pick) => (
              <TableRow key={pick.id}>
                <TableCell>{pick.round}</TableCell>
                <TableCell>{pick.pick}</TableCell>
                <TableCell>{pick.team}</TableCell>
                <TableCell>{pick.player.name}</TableCell>
                <TableCell>
                  <Chip label={pick.player.position} size="small" />
                </TableCell>
                <TableCell>{pick.player.college}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Typography variant="body2">
                      Height: {pick.player.height}
                    </Typography>
                    <Typography variant="body2">
                      Weight: {pick.player.weight}
                    </Typography>
                    <Typography variant="body2">
                      Age: {pick.player.age}
                    </Typography>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DraftList; 