

import React, { useState }from 'react';
import { Modal, Typography, Button, ButtonGroup, Grid, Box, CircularProgress, useMediaQuery, Rating} from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, Remove, ArrowBack} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import useStyles from './style';
import { useGetMovieQuery, useGetRecommendationsQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { MovieList } from '..';
const MovieInformation = () => {
  const { data, isFetching, error } = useGetMovieQuery(id); 
  const { id } = useParams();
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommedations', movie_id });

  const isMovieFavorited = true;
  const isMovieWatchlisted = true;


  const addToFavorites = () => {

  }

  const addToWatchlist = () => {


  }

if(isFetching) {
  return (
    <Box display="flex" justifyContent='center' alightItems='center'>
      <Link to='/'>Something has gone wrong. Please go back</Link>
    </Box>
  );
}

  if (error) {
    return (
      <Box display="flex" justifyContent='center' alightItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    )
  }


  return (
  <Grid container className={classes.containerSpaceAround}>
    <Grid item sm={12} lg={4}>
      <img
      className={classes.poster}
      src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
      alt={data?.title}/>
    </Grid>
      <Grid item container direction="column" lg={7}>
      <Typography variant="h3" align="center" gutterBottom>{data?.title} ({data.release_date.split('_')[0]})</Typography>
      <Typography variant="h5" align="center" gutterBottom>{data?.tagline} ({data.release_date.split('_')[0]})</Typography>
      <Grid item className={classes.containerSpaceAround}>
        <Box display="flex" align="center">
          <Rating readOnly value={data.vote_average / 2} />
          <Typography variant="subtitle1" gutterBottom={{marginLeft: '10px'}}></Typography>
          {data?.vote_average} / 10
        </Box>
        <Typography variant="h6" aign='center' gutterBottom>
        {data?.runtime}min {data?.spoken_languages.length > 0 ? `/ ${data ?.spoken_languages[0].name}` : ''}
        </Typography> 
      </Grid>
      <Grid item className={classes.genresContainer}>
        {data?.genres?.map((genre, i) => (
          <Link key={genre.name} className={classes.links} to='/' onClick={() => dispatch(selectGenreOrCategory(genre.id))}>
            <img scr={genreIcons[genre.name.toLowerCase()]} className={classes.genreImage} height={30} />
            <Typography color="textPrimary" variant="subtitle1">
              {genre?.name}
            </Typography>
          </Link>
        ))}
      </Grid>
      <Typography variant='h5' gutterBottom style={{ marginTop: '10px'}}>
          Overview
      </Typography>
      <Typography style={{marginBottom: '2rem'}}>
          {data?.overview}
      </Typography>
      <Typography variant='h5' gutterBottom>Top Cast</Typography>
      <Grid item container spacing={2}>
          {data && data.credit.cast.map((character, i) => (
            character.profile_path &&  <Grid key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
            <img className={classes.castImage} src={`https://image/tmdb/org.t.p.w500${character.profile_path}`} alt={character.name}/>
            <Typography color="textPrimary">{character?.name}</Typography>
            <Typography color="textSecondary">
              {character.character.spilt('/')[0]}
            </Typography>
            </Grid>
          )).slice(0, 6)}
      </Grid>
      <Grid item container style={{marginTop: '2rem'}}>
            <div className={classes.buttonsConatainer}>
              <Grid item sx={12} sm={6} className={classes.buttonsConatainer}>
                <ButtonGroup size='small' variant='outlined'>
                  <Button target="blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                  <Button target="blank" rel="noopener noreferrer" href={`https://www.imdb.com/title${data?.imdn_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                  <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>Trailers</Button>
                </ButtonGroup>
              </Grid>
            <Grid item sx={12} sm={6} className={classes.buttonsConatainer}>
              <ButtonGroup size='small' variant='outlined'>
                <Button onClick={addToFavorites} endIcon={isMovieFavorited ? <FavoriteBorderOutline /> : <Favorite /> }> Favorites</Button>
                {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                <Button onClick={addToWatchlist} endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}> Watchlist</Button>
                {isMovieWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main', textDecoration: 'none' }}>
                  <Typography component={Link} to='/' color="inherit" variant="subtitle2">
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
            </div>
      </Grid>
    </Grid>
      <Box marginTop='5rem' width='100%'>
         <Typography variant="h3" gutterBottom align='center'>
          You Might Also Enjoy
         </Typography>
            {recommendations
              ? <MovieList movies= {recommendations} numberOfMovies={12} />
              : <Box>Sorry Nothing was Found.</Box>
            }
      </Box>
      <Modal
      closeAfterTransition
      className={classes.modal}
      open={open}
      onClose={() => setOpen(false)}>
      {data?.videos?.results?.length > 0 && (
        <iframe
        autoPlay
        className={classes.video}
        title='Trailer'
        src={`https://www.youtube.com/embed/${data.video.results[0].key}`}
        allow='autoplay'
        />

      )}    
      </Modal>
    </Grid>
        
        
          
  )
};


export default MovieInformation;
