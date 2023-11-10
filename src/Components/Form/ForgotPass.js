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
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { json } from "react-router-dom";
export default function ForgotPass({ onClose }) {
  const generateRandomPassword = () => {
    // Hàm này tạo mật khẩu ngẫu nhiên, bạn có thể thay đổi cách tạo mật khẩu theo ý muốn
    const randomPassword = Math.random().toString(36).slice(-8); // Tạo mật khẩu 8 ký tự ngẫu nhiên
    return randomPassword;
  };

  const [data, setData] = React.useState({
    to: "",
    message: "",
    subject: "Forgot password ",
  });
  const [newPassword, setNewPassword] = React.useState(
    generateRandomPassword()
  );
  const [openForgotPass, setOpenForgotPass] = React.useState(true);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    titleError: "Something is wrong ",
    typeError: "error",
  });
  const { vertical, horizontal, open, titleError, typeError } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setData((prevData) => ({
      ...prevData,
      to: value,
      message: `Hello user. Your new password is ${newPassword}`,
      subject: `Forgot Password`,
    }));
  };
  const main = async () => {
    try {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
      if (!emailRegex.test(data.to)) {
        setState({
          ...state,
          open: true,
          titleError: "Invalid Email",
          typeError: "error",
        });
      } else {
        const jsonData = JSON.stringify(data);
        // const dataReceive = await UsersAPI.updateUser( `/updateUser?id=${id}&password=${newpass}&oldPassword=${oldpass}&image=${encodedImageURL}`
        const checkUser = await UsersAPI.checkUser(
          `/getOneUserByGoogleFalse?username=${data.to}`
        );

          try {
            const sendMailReceive = await UsersAPI.sendEmail(
              `/sendemail`,
              jsonData
            );
            console.log("success", sendMailReceive.status);
            try {
              console.log(data);
              const updateUser = await UsersAPI.forgotPass(
                `/forgotpass?email=${data.to}&password=${newPassword}`
              );
              if (updateUser.status === 200) {
                setState({
                  ...state,
                  open: true,
                  titleError:
                    "Email send successfully check email or spam. Redirect :home ",
                  typeError: "success",
                });
                setTimeout(() => {
                  setOpenForgotPass(onClose);
                }, 3000);
              }
            } catch (error) {
              setState({
                ...state,
                open: true,
                titleError: "Something Error",
                typeError: "error",
              });
            }
          } catch (error) {
            console.log("failed", error);
          }
        }
      }
      // // const jsonData = JSON.stringify(data);
      // // const dataReceive = await UsersAPI.sendUser("/authenticate", jsonData);
      // console.log('this is data',data)
      // if (dataReceive.status === 200) {
      //   // Xử lý khi phản hồi thành công (status 200)
      //   // token = dataReceive.data;
      //   // setCookie("user", JSON.stringify(token));

      //   setOpenForgotPass(onClose);
      // } else {
      //   setState({
      //     ...state,
      //     open: true,
      //     titleError: "Email or password is not correct",
      //   });
      // }
     catch (error) {
      setState({
        ...state,
        open: true,
        titleError: "Account",
        severity: "error",
      });
    }
  };

  const handleForgotpass = (event) => {
    event.preventDefault();
    main();
  };

  return (
    <>
      <Dialog fullWidth="sm" maxWidth="sm" open={openForgotPass}>
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
              severity={typeError}
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
              <VpnKeyIcon />
            </Avatar>
            Forgot Password
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
                onChange={handleChange}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={handleForgotpass}
              >
                Send Mail
              </Button>
            </Box>
          </Box>
        </Container>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
