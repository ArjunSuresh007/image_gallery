import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import { Paper} from '@mui/material';
import FormControlLabel from '@mui/material/FormControlLabel';
import SearchIcon from '@mui/icons-material/Search';
import {useState} from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Content from './Content';
import {TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {useMediaQuery} from '@mui/material'


const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#000',
    },
    text: {
    },
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fff',
    },

}});

lightTheme.typography.h = {
  fontSize: '1.2rem',
  '@media (max-width:600px)': {
    fontSize: '.5rem',
  }}




export default function Complete() {
  const bar = useMediaQuery('(max-width:600px)');
let [theme,setTheme] = useState(true)
const [formValue, setFormValues] = useState('')

const handleInputChange = (e) => {
  const value = e.target.value;
  setFormValues(value);
};

const handleSubmit = (event) => {
  event.preventDefault();
  console.log(formValue);
};

  return (
    <Box sx={{ flexGrow: 1 }}  >
      <ThemeProvider theme={theme ? lightTheme: darkTheme}>
        <Paper>
          {/* This is the Header component */}
      <AppBar position="static" enableColorOnDark={true}>
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1,fontFamily:'pattaya'}}
          >
            Image Gallery
          </Typography>
          <form onSubmit={handleSubmit}>

          <TextField
          required
  id="name-input"
  name="name"
  label="Search"
  type="text"
  value={formValue}
  onChange={handleInputChange}
  variant='outlined'
  fontSize={bar? 'small' :'large'}
  sx={bar?{marginRight:0}:{}}
/>
{bar ? null :
<Button variant="oulined" color="primary" type="submit" size='large' sx={{p:2}}>
  <SearchIcon/>
</Button>}
  </form>
          <FormControlLabel
          id='toggel'
          value= {theme? 'Light':'Dark'}
          control={<Switch id='tog' color='default' size={bar? 'small' :'large'}  />}
          label={theme? 'Light':'Dark'}
          labelPlacement="start"
          onChange={()=>setTheme((prev)=> !prev)}
          fontSize={bar? 'small' :'large'}
          />
        </Toolbar>
      </AppBar>
      {/* The below component is the Content component which shows the image stack */}
    <Content />
        </Paper>
    </ThemeProvider>
    </Box>
  );
}

