import React from 'react';
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {LinearProgress} from "@mui/material";

const EmployeesSearchingLoader = ({
    visible
                                  }: {
    visible?: boolean
}) => {
    return (
        <Box sx={{
            height: 50,
        }}>
            {visible && <>
                <LinearProgress/>
                <Typography variant="body1" gutterBottom>
                Searching...
                </Typography>
            </>}
        </Box>
    );
};

export default EmployeesSearchingLoader;
