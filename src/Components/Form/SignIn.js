import * as React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import SignUp from "../../Components/Form/SignUp";
import jwt_decode from "jwt-decode";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import UsersAPI from "../../utils/UsersAPI";
import { Alert, AlertTitle } from "@mui/material";
import setCookie from "../Cookie/setCookie";
export default function SignIn({ onClose }) {
  const [data, setData] = React.useState({
    email: "",
    password: "",
    isGoogle: "false",
  });
  const [dataGoogle, setDataGoogle] = React.useState({
    email: "",
    password: "",
    status: 1,
    google: 1,
    datecreated: "",
    role: 1,
    avatar: "",
  });
  let token = "";
  const [openSignIn, setOpenSignIn] = React.useState(true);
  const [openSignUp, setOpenSignUp] = React.useState(false);
  const handleClickOpenSignUp = () => {
    setOpenSignIn(false);
    setOpenSignUp(true);
  };
  const signup = () => {
    if (openSignUp === false) {
      return null;
    } else {
      return <SignUp onClose={onClose} />;
    }
  };
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    titleError: "Something is wrong ",
  });
  const { vertical, horizontal, open, titleError } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const signinToToken = async () => {
    try {
      const jsonData = JSON.stringify(data);
      const dataReceive = await UsersAPI.sendUser("/authenticate", jsonData);
      console.log(data);
      if (dataReceive.status === 200) {
        // Xử lý khi phản hồi thành công (status 200)
        token = dataReceive.data;
        setCookie("user", JSON.stringify(token));

        setOpenSignIn(onClose);
      } else {
        setState({
          ...state,
          open: true,
          titleError: "Email or password is not correct",
        });
      }
    } catch (error) {
      setState({
        ...state,
        open: true,
        titleError: "Email or password is not correct",
      });
    }
  };

  const handleSignIn = (event) => {
    event.preventDefault();
    signinToToken();
  };
  const generateRandomPassword = () => {
    // Hàm này tạo mật khẩu ngẫu nhiên, bạn có thể thay đổi cách tạo mật khẩu theo ý muốn
    const randomPassword = Math.random().toString(36).slice(-8); // Tạo mật khẩu 8 ký tự ngẫu nhiên
    return randomPassword;
  };
  const login = async () => {
    try {
      const jsonData = JSON.stringify(dataGoogle);
      console.log("data", data);
      const dataReceive = await UsersAPI.sendUser("/addAccount", jsonData);
      if (dataReceive.status === 200) {
        // Xử lý khi phản hồi thành công (status 200)
        token = dataReceive.data;
        setCookie("user", JSON.stringify(token));
        console.log(token);
        setOpenSignIn(onClose);
      } else {
        setState({
          ...state,
          open: true,
          titleError: "Email or password is not correct",
        });
      }
    } catch (error) {
      setState({
        ...state,
        open: true,
        titleError: "Email or password is not correct",
      });
    }
  };
  React.useEffect(() => {
    if (dataGoogle.email !== "") {
      login();
    }
  }, [dataGoogle]);

  return (
    <>
      <Dialog fullWidth="sm" maxWidth="sm" open={openSignIn}>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={data.email}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="current-password"
              />

              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleSignIn}
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
                  <Link
                    href="#"
                    variant="body2"
                    onClick={handleClickOpenSignUp}
                  >
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>

            <Grid
              item
              sx={{ mt: 3, mb: 2, display: "flex", alignItems: "center" }}
            >
              <GoogleOAuthProvider clientId="916876028025-1c1te58rc1tuoeebbndo3sum77klp7jk.apps.googleusercontent.com">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    var data = jwt_decode(credentialResponse.credential);
                    setDataGoogle({
                      ...dataGoogle,
                      email: data.email,
                      password: generateRandomPassword(),
                      avatar: data.picture,
                    });
                  }}
                  onError={() => {
                    console.log("error");
                  }}
                />
              </GoogleOAuthProvider>
            </Grid>
          </Box>
        </Container>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
      {signup()}
    </>
  );
}
