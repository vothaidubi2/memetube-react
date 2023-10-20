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
import SignUp from '../../Components/Form/SignUp';
import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
export default function SignIn({  onClose }) {
  var bcrypt = require('bcryptjs');
  var salt = bcrypt.genSaltSync(10);
  var hash = bcrypt.hashSync("password", salt);
  function createdatauser(email,password, status,role,avatar) {
    return {
      email,
      password,
      status,
      role,
      avatar
    };
  }



  const [openSignIn, setOpenSignIn] = React.useState(true);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleClickOpenSignUp=()=>{
    setOpenSignIn(false)
    setOpenSignUp(true)


  }
  const signup =()=>{

 if(openSignUp===false){
  return null
 }else{
  return(
   <SignUp onClose={onClose}/>
  
  )
  }
  }
  const handleClickCloseAll=()=>{
    setOpenSignIn(false)
    setOpenSignUp(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };
  return (
    <>
    <Dialog
    fullWidth="sm"
    maxWidth="sm"
    open={openSignIn}
  >


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
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* gooogle******************************************************************************************************* */}
        

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
              <Link href="#" variant="body2" onClick={handleClickOpenSignUp}>
              {"Don't have an account? Sign Up"}
                </Link>
                  
          
              </Grid>
            
            </Grid>
           
          </Box>
          <Grid item sx={{ mt: 3, mb: 2, display: 'flex', alignItems: 'center' }}>
          <GoogleOAuthProvider clientId="916876028025-1c1te58rc1tuoeebbndo3sum77klp7jk.apps.googleusercontent.com">
              <GoogleLogin
  onSuccess={credentialResponse => {
  var data=jwt_decode(credentialResponse.credential)
  console.log(data)
  const {email,picture}=data
  const user=[
    createdatauser(email,hash,1,1,picture)
  ]
  console.log(user)
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>

                </GoogleOAuthProvider>
      
    </Grid>
    
        </Box>
      
      </Container>
      <DialogActions >
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
      </Dialog>
      {signup()}
      </>

  );

}