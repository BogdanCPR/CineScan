import React from 'react';
import { Button, Container, Typography } from '@mui/material';

const Unauthorized = () => {
  const handleRedirect = () => {
    window.location.href = '/';
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20vh', textAlign: 'center' }}>
      <Typography variant="h2" gutterBottom>
        403 - Unauthorized
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Sorry, you do not have access to this page.
      </Typography>
      <Button variant="contained" color="primary" onClick={handleRedirect}>
        Go to Home
      </Button>
    </Container>
  );
};

export default Unauthorized;