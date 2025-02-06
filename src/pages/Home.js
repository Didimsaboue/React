import React from 'react';
import TerrainList from '../TerrainList';
import { Container, Typography, Box } from '@mui/material';

function Home() {
  return (
    <Box sx={{ py: 4 }}>
      <Container maxWidth="lg">
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom
          sx={{ 
            textAlign: 'center',
            mb: 4,
            fontWeight: 'bold',
            color: '#1976d2'
          }}
        >
          Bienvenue sur notre plateforme
        </Typography>
        <TerrainList />
      </Container>
    </Box>
  );
}

export default Home; 