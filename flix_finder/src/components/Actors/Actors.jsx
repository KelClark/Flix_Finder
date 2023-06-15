import React, { useState }from 'react';
import { Box, Button, CircularProgress, Grid, Typography} from '@mui/material';
import { useHistory } from "react-router-dom";
import { ArrowBack } from '@mui/icons-material';

import { useGetActorsDetailsQuery } from '../../services/TMDB';

const Actors = () => {
    const { id } = useParams();
    const history = useHistory();

    const { data, isFetching, error } = useGetActorsDetailsQuery(id);


    if (isFetching) {
        return (
            <Box display='flex' justifyContent="center">
                <CircularProgress size="8rem" />
            </Box>
        );
    }


    if (error) {
        return (
            <Box display='flex' justifyContent="center">
                <Button startIcon={<ArrowBack />} onClick={() => history.goBack()} color="primary">
                    GO BACK
                </Button>
            </Box>
        );
    }

    return (
       <>
        <Grid container spacing={3}>
            <Grid item lg={5} xl={4}>
                <img
                    className={classes.image}
                    src={`https://image/tmdb.org/t/p/w500${data?.profile_path}`}
                    alt={data.name}
                />
            </Grid>
        </Grid>
       </>
    );
};

export default Actors;
