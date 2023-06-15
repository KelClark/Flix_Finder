import React from 'react';
import { Typography, Button, Box, } from '@mui/material';
import { useSelector } from 'react-redux';
import { ExitToApp } from '@mui/icons-material';


import { userSelector } from '../../features/auth'
const Profile = () => {
    const { user } = useSelector(userSelector);

    const logout = () => {
        localStorage.clear();

        window.location.herf = '/';
    };

    return (
        <Box>
            <Box display='flex' justifyContent='space-between'>
                <Typography variant="h4" gutterBottom>My Profile</Typography>
                <Button color="inherit" onClick={logout}>
                    Logout &nbsp; <ExitToApp />
                </Button>
            </Box>
            {!favoriteMovies.length
                ? <Typography variant="5">Add favorites here!</Typography>
                : <Box>
                    FAVORITE Movies
                </Box>
            }
        </Box>

    );
};



export default Profile;
