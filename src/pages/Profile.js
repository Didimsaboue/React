import React from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

function Profile() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Mon Profil
        </Typography>
        {/* Contenu de la page Profile */}
      </Paper>
    </Container>
  );
}

export default Profile; 