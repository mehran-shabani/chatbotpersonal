import React from 'react';
import { Box, Chip, Typography } from '@mui/material';
import { Info } from '@mui/icons-material';  // Using Info icon from @mui/icons-material

const ModelInfo = ({ model, username }) => {
    username = localStorage.getItem('username');
    return (
        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip
                icon={<Info />}  // Changed from AiOutlineInfoCircle to Info
                label={`Model: ${model?.description || 'None'}`}
                variant="outlined"
                color="primary"
            />
            <Typography variant="caption" color="textSecondary">
                {username ? `Welcom!  ${username}` : 'Guest User'}
            </Typography>
        </Box>
    );
};

export default ModelInfo;