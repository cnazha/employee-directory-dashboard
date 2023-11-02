import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const NoEmployeesFound = ({visible}: {
    visible?: boolean
}) => {
    if (!visible) {
        return null;
    }
    return (
        <Box>
            <Typography variant="body1" gutterBottom>
                No employees found for this search
            </Typography>
        </Box>
    );
};

export default NoEmployeesFound;
