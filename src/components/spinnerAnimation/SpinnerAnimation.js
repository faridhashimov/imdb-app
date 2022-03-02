import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SpinnerAnimation = () =>  {
  return (
    <Box sx={{ display: 'flex',justifyContent: 'center', alignItems: 'center', height: '600px', width: '700px' }}>
      <CircularProgress size={100} />
    </Box>
  );
}


export default SpinnerAnimation