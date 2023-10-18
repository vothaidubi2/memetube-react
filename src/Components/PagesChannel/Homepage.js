import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import React from "react";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import UploadFile from "./UploadFile";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const card = (
  <div className="re-videos">
    <Box component="div">
      <React.Fragment>
        <CardContent>
          <Typography
            sx={{ fontSize: 27, fontWeight: "bold", marginBottom: "10px" }}
            gutterBottom
          >
            Channel analytics
          </Typography>
          <Typography sx={{ fontSize: 15, marginBottom: "10px" }} gutterBottom>
            Number of current subscribers
          </Typography>

          <Typography
            variant="h5"
            component="div"
            sx={{ marginBottom: "45px" }}
          >
            1B
          </Typography>
          <Divider sx={{ marginBottom: "10px" }} light />
          <Typography
            sx={{ fontSize: 17, fontWeight: "bold", marginBottom: "5px" }}
            gutterBottom
          >
            Summary
          </Typography>
          <Typography
            sx={{ fontSize: 13, marginBottom: "5px" }}
            color="text.secondary"
            gutterBottom
          >
            Last 28 days
          </Typography>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography sx={{ fontSize: 13, marginBottom: "10px" }}>
                number of views
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 13, marginBottom: "10px" }}>
                720.000 -
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography sx={{ fontSize: 13, marginBottom: "25px" }}>
                Watching time (hours)
              </Typography>
            </Grid>
            <Grid item>
              <Typography sx={{ fontSize: 13, marginBottom: "25px" }}>
                720 -
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ marginBottom: "10px" }} light />

          <Typography variant="body2">
            <Typography
              sx={{ fontSize: 17, fontWeight: "bold", marginBottom: "5px" }}
              gutterBottom
            >
              Top videos
            </Typography>
            <Typography
              sx={{ fontSize: 13, marginBottom: "5px" }}
              color="text.secondary"
              gutterBottom
            >
              Last 48 hours - 75800 views
            </Typography>
          </Typography>
        </CardContent>
        <CardActions>
          <ToggleButton>Analytical data</ToggleButton>
        </CardActions>
      </React.Fragment>
    </Box>
  </div>
);
export default function OutlinedCard() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Grid container alignItems="center" sx={{ minWidth: "200%" }}>
        <Grid item xs>
          {" "}
          <Typography
            sx={{
              fontSize: 27,
              fontWeight: "bold",
              marginBottom: "10px",
              margin: "10px 25px 0 25px",
            }}
            gutterBottom
          >
            Channel dashboard
          </Typography>
        </Grid>

        <Grid item>
          <Stack direction="row">
            <React.Fragment>
              <Button>
                {" "}
                <Chip
                  label="Upload Files"
                  onClick={handleClickOpen}
                  icon={<FileUploadIcon />}
                  sx={{ margin: "0 10px" }}
                />
              </Button>

              <Dialog
                fullWidth="lg"
                maxWidth="lg"
                open={open}
                onClose={handleClose}
              >
                <DialogTitle sx={{ backgroundColor: "rgb(40,40,40)" }}>
                  Infomation Video
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: "rgb(40,40,40)" }}>
                  <UploadFile active={null} />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: "rgb(40,40,40)" }}>
                  <Button onClick={handleClose}>Close</Button>
                </DialogActions>
              </Dialog>
            </React.Fragment>
          </Stack>
        </Grid>
      </Grid>

      <Box sx={{ minWidth: 275, margin: "10px 25px 0 25px" }}>
        <Box>
          <Card variant="outlined">{card}</Card>
        </Box>
      </Box>
    </div>
  );
}