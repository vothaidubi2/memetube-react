import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import { styled } from "@mui/material/styles";
import ImageAPI from "../../utils/ImageAPI";
import UsersAPI from "../../utils/UsersAPI";
import setCookie from "../Cookie/setCookie";
import { Alert, AlertTitle } from "@mui/material";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { UserContext } from "../Cookie/UserContext";
import FirebaseConfig from "../../utils/FirebaseConfig";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Update({ onClose,openUpdate }) {
  const navigate = useNavigate();
  let token;
  let dataUser = React.useContext(UserContext);
  const [selectedImage, setSelectedImage] = React.useState();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let newpass = data.get("New-password");
    let oldpass = data.get("Old-Password");
    let renewpass = data.get("re-Newpassword");
    if (handleFormSubmit(oldpass, newpass, renewpass,selectedImage) === true) {
      let imageData = new FormData();
      imageData.append('files', selectedImage)
      let imageurl = await ImageAPI.uploadImage("/uploadimage", imageData)
      const encodedImageURL = encodeURIComponent(imageurl);
        try {

          let id=dataUser.Iduser
          console.log('dm')
          const dataReceive = await UsersAPI.updateUser( `/updateUser?id=${id}&password=${newpass}&oldPassword=${oldpass}&image=${encodedImageURL}`
          );
          console.log(dataReceive.status)
           if(dataReceive.status===200){
            token = dataReceive.data;
            setCookie("user", JSON.stringify(token));
            window.location.reload();
           }
           console.log('moi')
           let oldImage=dataUser.Avatar;
            FirebaseConfig.DeleteImage(oldImage);

        } catch (error) {
          setState({
            ...state,
            open: true,
            titleError: "Password is incorrect ",
          });

          console.log('cu',imageurl)
             FirebaseConfig.DeleteImage(imageurl);

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
  const handleFormSubmit = (oldpass, newpass, renewpass,selectedImage) => {
    console.log("new pass", newpass);
    let isValid = true; // Mặc định là hợp lệ

    // Kiểm tra mật khẩu có hơn 8 kí tự
    if (newpass.length < 8) {
      setState({
        ...state,
        open: true,
        titleError: "Password must be at least 8 characters",
      });
      isValid = false;
    }
    if (oldpass.length < 8) {
      setState({
        ...state,
        open: true,
        titleError: "Old password must be at least 8 characters",
      });
      isValid = false;
    }

    if (renewpass.length < 8) {
      setState({
        ...state,
        open: true,
        titleError: "Password must be at least 8 characters",
      });
      isValid = false;
    }
    const validImageExtensions = /\.(jpg|jpeg)$/i;
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
    if (renewpass !== newpass) {
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
      <Dialog fullWidth="sm" maxWidth="sm" open={openUpdate}>
        <Box sx={{ width: 500 }}>
          <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={open}
            // onClose={handleClose}
            message="s"
            key={vertical + horizontal}
            autoHideDuration={3000}
          >
            <Alert
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
              Update Profile
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="Old-Password"
                    label="Old-Password"
                    type="password"
                    id="Old-Password"
                    autoComplete="Old-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="New-password"
                    label="New-password"
                    type="password"
                    id="New-password"
                    autoComplete="New-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="re-Newpassword"
                    label="Re-enter the new Password"
                    type="password"
                    id="re-Newpassword"
                    autoComplete="re-Newpassword"
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
                
              >
                Update
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item></Grid>
              </Grid>
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
