import * as React from 'react';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

 const SkeletonAnimation = () => {
  return (
    <Stack spacing={1}>
      <Skeleton variant="rectangular" width={210} height={118} animation="pulse"  />
      <Skeleton variant="text" animation="pulse"  />
      <Skeleton variant="text" animation="pulse"  />
      <Skeleton variant="text" animation="pulse"  />
      <Skeleton variant="text" animation="pulse"  />
    </Stack>
  );
}

export default SkeletonAnimation