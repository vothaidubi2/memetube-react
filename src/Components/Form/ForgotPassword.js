import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import SignIn from '../../Components/Form/SignIn';
import { styled } from "@mui/material/styles";
import ImageAPI from '../../utils/ImageAPI';
import UsersAPI from '../../utils/UsersAPI';
import setCookie from '../Cookie/setCookie';
import { Alert, AlertTitle } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";


// TODO remove, this demo shouldn't need to reset the theme.

export default function SignUp({onClose}) {
  let token = "";

  const [selectedImage, setSelectedImage] = React.useState();
  const [openSignIn, setOpenSignIn] = React.useState(false);
  const [openSignUp, setOpenSignUp] = React.useState(true);
  const handleClickOpenSignIn = () => {
    setOpenSignIn(true);
    setOpenSignUp(false)
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

      let emailform= data.get('email')
      console.log(handleFormSubmit(emailform,passwordform,repassword))

  };


  
  const handleClose = () => {
    setState({ ...state, open: false });
  };




  return (
    <>
    <Dialog
    fullWidth="sm"
    maxWidth="sm"
    open={openSignUp}
  >
    <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            onClose={handleClose}
            message="I love snacks"
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
             
            </Alert>
          </Snackbar>
        </Box>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
              
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
        

          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
     
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
            
        
            </Grid>
         
             
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={sendData}
            >
              Sign Up
            </Button>
           
          </Box>
        </Box>
    
      </Container>
      <DialogActions >
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
      </Dialog>

      </>
  );
}