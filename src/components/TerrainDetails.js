import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Divider,
  IconButton,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  ArrowBack,
  Edit,
  Delete,
  Phone,
  LocationOn,
  EuroSymbol,
  SportsSoccer,
  Person,
  CalendarMonth,
  AccessTime
} from '@mui/icons-material';

function TerrainDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [terrain, setTerrain] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTerrainDetails = async () => {
      try {
        setLoading(true);
        // Récupérer les données du localStorage
        const terrains = JSON.parse(localStorage.getItem('terrains') || '[]');
        const foundTerrain = terrains.find(t => t.id === parseInt(id));
        
        if (foundTerrain) {
          setTerrain(foundTerrain);
          setError(null);
        } else {
          setError("Terrain non trouvé");
        }
      } catch (err) {
        setError("Erreur lors du chargement des détails du terrain");
      } finally {
        setLoading(false);
      }
    };

    fetchTerrainDetails();
  }, [id]);

  const handleDelete = async () => {
    try {
      // Récupérer les terrains actuels
      const terrains = JSON.parse(localStorage.getItem('terrains') || '[]');
      // Filtrer pour retirer le terrain actuel
      const updatedTerrains = terrains.filter(t => t.id !== parseInt(id));
      // Sauvegarder la nouvelle liste
      localStorage.setItem('terrains', JSON.stringify(updatedTerrains));
      // Rediriger vers la liste des terrains
      navigate('/accueil');
    } catch (err) {
      setError("Erreur lors de la suppression du terrain");
    }
  };

  const handleEdit = () => {
    navigate(`/terrain/edit/${id}`);
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Container>
    );
  }

  if (!terrain) {
    return (
      <Container sx={{ py: 4 }}>
        <Alert severity="info">Terrain non trouvé</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        {/* Header avec bouton retour */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton 
              onClick={() => navigate(-1)} 
              sx={{ mr: 2 }}
              title="Retour"
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" component="h1">
              {terrain.terrainName}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<Edit />}
              onClick={handleEdit}
              sx={{
                backgroundColor: '#c8ff00',
                color: '#000000',
                '&:hover': {
                  backgroundColor: '#a3cc00'
                }
              }}
            >
              Modifier
            </Button>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Delete />}
              onClick={handleDelete}
            >
              Supprimer
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Image du terrain */}
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={terrain.terrainImage || '/placeholder.jpg'}
              alt={terrain.terrainName}
              sx={{
                width: '100%',
                height: 'auto',
                borderRadius: 2,
                boxShadow: 3,
                mb: 2,
                objectFit: 'cover',
                maxHeight: '400px'
              }}
            />
            
            {/* Informations principales */}
            <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Caractéristiques
              </Typography>
              <Grid container spacing={2}>
                {terrain.equipements.map((equipement, index) => (
                  <Grid item xs={6} key={index}>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <SportsSoccer fontSize="small" color="primary" />
                      {equipement}
                    </Typography>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Informations détaillées */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Description
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {terrain.description}
                </Typography>
              </Box>

              <Divider />

              {/* Informations de contact */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Informations de contact
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Person color="primary" />
                  <Typography>
                    Propriétaire: {terrain.proprietaireName}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Phone color="primary" />
                  <Typography>
                    Téléphone: {terrain.phoneNumber}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <LocationOn color="primary" />
                  <Typography>
                    Adresse: {terrain.location}
                  </Typography>
                </Box>
              </Box>

              <Divider />

              {/* Horaires et disponibilité */}
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Horaires et tarifs
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <AccessTime color="primary" />
                  <Typography>
                    Horaires: {terrain.horaires}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CalendarMonth color="primary" />
                  <Typography>
                    Disponibilité: {terrain.disponibilite}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <EuroSymbol color="primary" />
                  <Typography>
                    Prix: {terrain.matchPrice} €/match
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default TerrainDetails; 