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
const sendData=async ()=>{

}
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

      let emailform= data.get('email')
      let passwordform= data.get('password')
      let repassword=data.get('re-password')
      if(handleFormSubmit(emailform,passwordform,repassword,selectedImage)===true){
      try {
        const checkUser = await UsersAPI.checkUser(
          `/getOneUser?username=${emailform}`
        );
        setState({
          ...state,
          open: true,
          titleError: "Email already exists",
        });
      } catch (error) {

          let imageData = new FormData();
          imageData.append('files', selectedImage)
          const imageurl = await ImageAPI.uploadImage("/uploadimage", imageData)
          const formdata ={
            email:emailform,
            password:passwordform,
            status:1,
            google:0,
            datecreated:"",
            role:0,
            avatar:imageurl
          }
          try {
            const jsonData = JSON.stringify(formdata);
            const dataReceive = await UsersAPI.sendUser("/addAccount", jsonData);
            if (dataReceive.status === 200) {
              // Xử lý khi phản hồi thành công (status 200)
              token = dataReceive.data;
              setCookie("user", JSON.stringify(token));
              setOpenSignIn(onClose);
            }
          } catch (error) {
            console.log('errror')
          }
        }

      }


  };

  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    titleError: "Something is wrong ",
  });
  const { vertical, horizontal, open, titleError } = state;
  const handleFormSubmit = (email,password,repassword) => {
    let isValid = true; // Mặc định là hợp lệ
    // Kiểm tra email đúng định dạng
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setState({
        ...state,
        open: true,
        titleError: "Invalid Email",
      });
      isValid = false;
    }
    const handleClose = () => {
      setState({ ...state, open: false });
    };
    // Kiểm tra mật khẩu có hơn 8 kí tự
    if (password.length < 8) {
      setState({
        ...state,
        open: true,
        titleError: "Password must be at least 8 characters",
      });
      isValid = false;
    }
    const validImageExtensions = /\.(jpg|jpeg|png)$/i;
    if (selectedImage ===undefined) {
      setState({
        ...state,
        open: true,
        titleError: "File is empty ",
      });
      isValid = false;
    }else{
      if (!validImageExtensions.test(selectedImage.name)) {
        setState({
          ...state,
          open: true,
          titleError: "Image is not in the correct format ",
        });
        isValid = false;
      }
    }



    // Kiểm tra mật khẩu và mật khẩu nhập lại trùng khớp
    if (password !== repassword) {
      setState({
        ...state,
        open: true,
        titleError: "Passwords do not match",
      });
      isValid = false;
    }
    return isValid;
    // Nếu tất cả điều kiện đều hợp lệ, thực hiện xử lý tiếp theo ở đây
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const signin =()=>{

    if(openSignIn===false){
     return null
    }else{
     return(
      <SignIn onClose={onClose}/>


     )
     }
     }
     const handleFileChange = async (event) => {
      event.preventDefault();
      if (event.target.files[0]) {
        setSelectedImage(event.target.files[0]);
      }
    };
     const VisuallyHiddenInput = styled("input")({
      clip: "rect(0 0 0 0)",
      clipPath: "inset(50%)",
      height: 1,
      overflow: "hidden",
      position: "absolute",
      bottom: 0,
      left: 0,
      whiteSpace: "nowrap",
      width: 1,
    });

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
            message=""
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: "100%" }}
            >
              {titleError}
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
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="re-password"
                  label="Re-Password"
                  type="password"
                  id="re-password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="allowExtraEmails" color="primary" />}
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
                component="label"
                sx={{
                  width: "150px",
                  height: "50px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "rgb(40,40,40)",
                  border: "1px dashed gray",
                  color: "gray",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography
                    sx={{ fontSize: 10, marginTop: "5%", color: "gray" }}
                  >
                    Avatar
                  </Typography>
                  <VisuallyHiddenInput
                    type="file"
                    onChange={(e) => handleFileChange(e)}
                  />
                </Box>

              </Button>
              {selectedImage && (
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected Thumbnail"
                  style={{
                    marginLeft: "10px",
                    maxWidth: "100%",
                    height: "80px",
                  }}
                />
              )}
              
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={sendData}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="" variant="body2" onClick={handleClickOpenSignIn} >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    
      </Container>
      <DialogActions >
      <Button onClick={onClose}>Close</Button>
    </DialogActions>
      </Dialog>
      {signin()}
      </>
  );
}