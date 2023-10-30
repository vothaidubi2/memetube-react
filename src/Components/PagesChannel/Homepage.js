import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import React, { useContext, useEffect, useState } from "react";
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
import numeral from 'numeral';
import WalletAPI from "../../utils/WalletAPI";
import { UserContext } from "../Cookie/UserContext";
import axios from "axios";
import { DialogContentText, TextField } from "@mui/material";
import ChannelAPI from "../../utils/ChannelAPI";
import SubscribeAPI from "../../utils/SubscribeAPI";

const NumberFormatter = ({ value }) => {
  const formattedValue = numeral(value).format('0,0');
  return <Typography sx={{ textTransform: 'uppercase' }}>{formattedValue} VNĐ</Typography>;
};

export default function OutlinedCard() {
  const userData = useContext(UserContext)
  const [currentBalance, setCurrentBalance] = useState()
  const [currentChannel, setCurrentChannel] = useState()
  const [totalSub, setTotalSub] = useState()
  const [totalView, setTotalView] = useState()
  const [top1Video, setTop1Video] = useState()
  const updateBalance = async (amount) => {
    const data = await axios.post(`${process.env.REACT_APP_BASE_DOMAIN}/createpayment?amount=${amount}&iduser=${userData.Iduser}`)
    window.location.href = data.data;
  }

  const getCurrentChannel = async () => {
    const channel = await ChannelAPI.getOneItem(`/findchannelbyiduser?iduser=${userData.Iduser}`)
    const total = await SubscribeAPI.getAllItem(`/getallsubscribe?idchannel=${channel.idchannel}`)
    const sumView = await ChannelAPI.getOneItem(`/sumviewvideo`)
    const top1Video = await ChannelAPI.getOneItem(`/gettop1video`)
    setCurrentChannel(channel)
    setTotalSub(total.data.length)
    setTotalView(sumView)
    setTop1Video(top1Video.viewcount)
  }

  const getbalance = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_BASE_DOMAIN}/findwalletbyiduser?iduser=${userData.Iduser}`)
      if (data.status == 200) {
        setCurrentBalance(data.data.balance);
      } else {
        setCurrentBalance(0);
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userData) {
      getbalance()
      getCurrentChannel()
    }
  }, [userData])

  function FormDialog() {
    const [openAmount, setOpenAmount] = React.useState(false);
    const [amount, setAmount] = useState();
    const handleClickOpen = () => {
      setOpenAmount(true);
    };
    const handleClose = () => {
      setOpenAmount(false);
    };

    const handleUpdateBalance = () => {
      if (amount > 0) {
        updateBalance(amount)
      }
      // setOpen(false);
    };

    return (
      <div>
        <ToggleButton onClick={() => handleClickOpen()}>Deposit</ToggleButton>
        <Dialog open={openAmount} onClose={handleClose}>
          <DialogTitle>Amount</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To deposit, please enter amount. We
              will send updates.
            </DialogContentText>
            <TextField
              required
              autoComplete={false}
              autoFocus
              margin="dense"
              id="name"
              label="Amount"
              type="number"
              fullWidth
              variant="standard"
              onChange={(e) => setAmount(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleUpdateBalance}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

  const card = (
    <div className="re-videos" style={{ display: "flex", gap: '40px' }}>
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
              {totalSub}
            </Typography>
            <Divider sx={{ marginBottom: "10px" }} light />
            <Typography
              sx={{ fontSize: 17, fontWeight: "bold", marginBottom: "5px" }}
              gutterBottom
            >
              Summary
            </Typography>
            {/* <Typography
              sx={{ fontSize: 13, marginBottom: "5px" }}
              color="text.secondary"
              gutterBottom
            >
              Last 28 days
            </Typography> */}
            <Grid container alignItems="center">
              <Grid item xs>
                <Typography sx={{ fontSize: 13, marginBottom: "10px" }}>
                  Number of views
                </Typography>
              </Grid>
              <Grid item>
                <Typography sx={{ fontSize: 13, marginBottom: "10px" }}>
                  {totalView} -
                </Typography>
              </Grid>
            </Grid>
           
            <Divider sx={{ marginBottom: "10px" }} light />

            <Typography variant="body2">
              <Typography
                sx={{ fontSize: 17, fontWeight: "bold", marginBottom: "5px" }}
                gutterBottom
              >
                Top view of videos
              </Typography>
              <Typography
                sx={{ fontSize: 13, marginBottom: "5px" }}
                color="text.secondary"
                gutterBottom
              >
                All time - {top1Video} views
              </Typography>
            </Typography>
          </CardContent>
        </React.Fragment>
      </Box>

      <Box component="div">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 27, fontWeight: "bold", marginBottom: "10px" }}
              gutterBottom
            >
              My Wallet
            </Typography>
            <Typography sx={{ fontSize: 15, marginBottom: "10px" }} gutterBottom>
              Wallet balance
            </Typography>

            <Typography
              variant="h5"
              component="div"
              sx={{ marginBottom: "45px" }}
            >
              <NumberFormatter value={currentBalance} />
            </Typography>
            <Divider sx={{ marginBottom: "10px" }} light />
          </CardContent>
          <CardActions>
            <FormDialog />
          </CardActions>
        </React.Fragment>
      </Box>
    </div>
  );

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component='div' sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container alignItems="center" sx={{ minWidth: "" }}>
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
      </Box>
    </Box>
  );
}
