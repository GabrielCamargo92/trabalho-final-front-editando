import React from 'react';
import { Container } from '@mui/material';
import ResponsiveAppBar from '../../components/ResponsiveAppBar';

interface DefaultLayoutProps {
  page: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ page }) => {
  return (
    <>
      <ResponsiveAppBar />
      <Container
        maxWidth="lg"
        fixed
        sx={{
          paddingBottom: '20px',
          marginTop: '50px'
        }}
      >
        {page}
      </Container>
    </>
  );
};

export default DefaultLayout;
