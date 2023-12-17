import React from 'react';
import { Container, Typography, Button, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { Margin } from '@mui/icons-material';

const NotFound = () => {
  return(
  <Container>
    <Grid container spacing={3} sx={{ marginTop: '80px' }}>
      <Grid item xs={12}>
        <Typography variant="h1" align="center">
          404
        </Typography>
        <Typography variant="h5" align="center">
          Oops! Page not found.
        </Typography>
      </Grid>
      <Grid item xs={12} align="center">
        <Button component={Link} to="/" variant="contained" color="primary">
          Go to Home
        </Button>
      </Grid>
    </Grid>
  </Container>
  );
};

export default NotFound;
