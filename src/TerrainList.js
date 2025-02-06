import React, { useState } from 'react';
import ModifyTerrainForm from './components/ModifyTerrainForm';
import AjouterTerrain from './components/AjouterTerrain';
import { 
  Button, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Container,
  Paper,
  Typography,
  Box,
  Divider,
  Card,
  CardContent,
  Grid
} from '@mui/material';
import { 
  Edit, 
  Delete, 
  Add, 
  SportsSoccer,
  Phone,
  LocationOn,
  EuroSymbol,
  Visibility
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

function TerrainList() {
  const navigate = useNavigate();
  const [isModifyDialogOpen, setIsModifyDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedTerrain, setSelectedTerrain] = useState(null);
  
  const [terrains, setTerrains] = useState([
    {
      id: 1,
      proprietaireName: "John Doe",
      phoneNumber: "0612345678",
      terrainName: "Terrain A",
      matchPrice: "100",
      location: "Paris"
    },
    {
      id: 2,
      proprietaireName: "Jane Smith",
      phoneNumber: "0687654321",
      terrainName: "Terrain B",
      matchPrice: "120",
      location: "Lyon"
    }
  ]);

  const handleModify = (terrain) => {
    setSelectedTerrain(terrain);
    setIsModifyDialogOpen(true);
  };

  const handleModifySubmit = (modifiedData) => {
    const updatedTerrains = terrains.map(terrain => 
      terrain.id === selectedTerrain.id ? { ...terrain, ...modifiedData } : terrain
    );
    setTerrains(updatedTerrains);
    setIsModifyDialogOpen(false);
  };

  const handleDelete = (terrainId) => {
    setTerrains(terrains.filter(terrain => terrain.id !== terrainId));
  };

  const handleAddSubmit = (newTerrain) => {
    setTerrains([...terrains, { ...newTerrain, id: terrains.length + 1 }]);
    setIsAddDialogOpen(false);
  };

  const handleView = (terrainId) => {
    navigate(`/terrain/${terrainId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <SportsSoccer sx={{ fontSize: 40 }} />
            Liste des Terrains
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Add />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.5,
              background: 'linear-gradient(45deg, #1976d2, #2196f3)'
            }}
          >
            Ajouter un Terrain
          </Button>
        </Box>

        <Grid container spacing={3}>
          {terrains.map((terrain) => (
            <Grid item xs={12} md={6} key={terrain.id}>
              <Card 
                elevation={2}
                sx={{
                  transition: 'transform 0.2s, box-shadow 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 4
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" gutterBottom>
                      {terrain.terrainName}
                    </Typography>
                    <Box>
                      <IconButton 
                        onClick={() => handleView(terrain.id)}
                        color="primary"
                        sx={{ mr: 1 }}
                        title="Voir les détails"
                      >
                        <Visibility />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleModify(terrain)}
                        color="primary"
                        sx={{ mr: 1 }}
                        title="Modifier"
                      >
                        <Edit />
                      </IconButton>
                      <IconButton 
                        onClick={() => handleDelete(terrain.id)}
                        color="error"
                        title="Supprimer"
                      >
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Phone fontSize="small" color="action" />
                      <Typography variant="body2">{terrain.proprietaireName} - {terrain.phoneNumber}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOn fontSize="small" color="action" />
                      <Typography variant="body2">{terrain.location}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EuroSymbol fontSize="small" color="action" />
                      <Typography variant="body2">{terrain.matchPrice} €/match</Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Formulaire de modification */}
        <ModifyTerrainForm
          terrain={selectedTerrain}
          open={isModifyDialogOpen}
          onClose={() => setIsModifyDialogOpen(false)}
          onSubmit={handleModifySubmit}
        />

        {/* Formulaire d'ajout */}
        <AjouterTerrain
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onSubmit={handleAddSubmit}
        />
      </Paper>
    </Container>
  );
}

export default TerrainList; 