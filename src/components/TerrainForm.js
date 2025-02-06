import React, { useState, useEffect } from 'react';
import '../TerrainForm.css';
import {
  Container,
  Card,
  CardBody,
} from 'reactstrap';

import { 
  TextField, 
  Button, 
  Grid, 
  Typography,
  IconButton,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Person,
  Phone,
  SportsSoccer,
  EuroSymbol,
  LocationOn,
  PhotoCamera,
  Save,
  Cancel,
  Edit
} from '@mui/icons-material';

function AjouterTerrainForm({ terrain, open, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    proprietaireName: '',
    phoneNumber: '',
    terrainName: '',
    matchPrice: '',
    terrainImage: null,
    location: ''
  });

  const [imagePreview, setImagePreview] = useState(null);

  // Charger les données du terrain lorsque le composant est monté
  useEffect(() => {
    if (terrain) {
      setFormData({
        proprietaireName: terrain.proprietaireName || '',
        phoneNumber: terrain.phoneNumber || '',
        terrainName: terrain.terrainName || '',
        matchPrice: terrain.matchPrice || '',
        location: terrain.location || '',
        terrainImage: terrain.terrainImage || null
      });
      setImagePreview(terrain.terrainImage);
    }
  }, [terrain]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prevState => ({
        ...prevState,
        terrainImage: file
      }));
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Box className="form-header">
          <Edit className="header-icon" />
          <Typography variant="h4" component="h1">
          Ajouter un Terrain          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom du Propriétaire"
                name="proprietaireName"
                value={formData.proprietaireName}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Person className="input-icon" />
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Numéro de Téléphone"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <Phone className="input-icon" />
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Nom du Terrain"
                name="terrainName"
                value={formData.terrainName}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <SportsSoccer className="input-icon" />
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Prix du Match"
                name="matchPrice"
                type="number"
                value={formData.matchPrice}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <EuroSymbol className="input-icon" />
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Localisation"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                required
                InputProps={{
                  startAdornment: <LocationOn className="input-icon" />
                }}
                variant="outlined"
              />
            </Grid>

            <Grid item xs={12}>
              <Box className="image-upload-container">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="terrain-image-input-modify"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="terrain-image-input-modify">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<PhotoCamera />}
                    className="upload-button"
                  >
                    Ajouter  la Photo du Terrain
                  </Button>
                </label>
                {imagePreview && (
                  <Box className="image-preview-container">
                    <img
                      src={imagePreview}
                      alt="Aperçu du terrain"
                      className="preview-image"
                    />
                  </Box>
                )}
              </Box>
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions className="button-container">
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          startIcon={<Save />}
          className="submit-button"
        >
          Enregistrer le Terrain
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={onClose}
          startIcon={<Cancel />}
          className="cancel-button"
        >
          Annuler
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AjouterTerrainForm; 