import {CircularProgress} from "@mui/material";
import React, {useEffect, useState} from "react";
import Box from "@mui/material/Box";

export const LoadingScreen = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (<Box
            sx={{
                right: 0, width: 1, bottom: 0, height: 1, zIndex: 9998, display: 'flex', position: 'absolute', alignItems: 'center', justifyContent: 'center', bgcolor: 'background.default',
            }}
        >
            <CircularProgress/>
        </Box>)


}
