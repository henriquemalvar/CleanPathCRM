import React from "react";
import { Box, Skeleton } from "@mui/material";

export const SkeletonItem = () => (
  <Box display="flex" alignItems="center" mb={1}>
    <Skeleton variant="circular" width={40} height={40} />
    <Box ml={2} width="100%">
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="text" width="40%" />
    </Box>
    <Skeleton variant="circular" width={40} height={40} />
    <Skeleton variant="circular" width={40} height={40} />
  </Box>
);
