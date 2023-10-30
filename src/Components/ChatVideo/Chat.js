import { useState, useEffect, useRef, useContext } from "react";
import {
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Avatar,
  Box,
  CardHeader,
  SpeedDialAction,
  SpeedDial,
  Card,
  Popover,
  Typography,
  ToggleButton,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { db, ref, push, onValue, firepadRef } from "../../utils/FirebaseConfig";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";
import { userRole } from "../../utils/FirebaseConfig";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Lottie from "lottie-react";
import Star from "../EmojiAnimation/Star2.json";
import Balloon from "../EmojiAnimation/Ballon.json";
import Money from "../EmojiAnimation/Money.json";
import Rocket from "../EmojiAnimation/Rocket.json";
import Egg from "../EmojiAnimation/Egg.json";
import Plane2 from "../EmojiAnimation/Plane2.json";
import Motobike from "../EmojiAnimation/Motobike.json";
import King from "../EmojiAnimation/King.json";
import Hello from "../EmojiAnimation/Hello.json";
import { UserContext } from "../Cookie/UserContext";
import ChannelAPI from "../../utils/ChannelAPI";
import axios from "axios";
import DialogTitle from "@mui/material/node/DialogTitle";
import WalletAPI from "../../utils/WalletAPI";
import UsersAPI from "../../utils/UsersAPI";
function Chat({ name }) {
  let Customer = useContext(UserContext);
  const [currenChannel, setCurrentChannel] = useState()
  const [currentBalance, setCurrentBalance] = useState(0)
  const fetchChannel = async () => {
    const result = await ChannelAPI.getOneItem(`/getuserbyemail?email=${Customer.Email}`)
    setCurrentChannel(result)
    try {
      const data = await axios.get(`${process.env.REACT_APP_BASE_DOMAIN}/findwalletbyiduser?iduser=${result.iduser}`)
      if (data.status == 200) {
        console.log('balamce:',data.data)
        setCurrentBalance(data.data.balance);
      } else {
        setCurrentBalance(0);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getbalance = async () => {
    try {
      const data = await axios.get(`${process.env.REACT_APP_BASE_DOMAIN}/findwalletbyiduser?iduser=${currenChannel.iduser}`)
      if (data.status == 200) {
        console.log('balamce:',data.data)
        setCurrentBalance(data.data.balance);
      } else {
        setCurrentBalance(0);
      }
    } catch (error) {
      console.log(error)
    }
  }

  const donateMoney = async (amount) => {
    const data = await UsersAPI.updateBalance(`/sendmoney?amount=${amount}&iduser=${currenChannel.iduser}`)
    getbalance()
  }

  useEffect(()=>{
    fetchChannel()
  getbalance()
  },[currentBalance])
  const donate = () => {
    return (
      <PopupState variant="popover" popupId="demo-popup-popover">
        {(popupState) => (
          <div>
            <Button variant="contained" {...bindTrigger(popupState)}>
              Donate
            </Button>
            <Popover
              {...bindPopover(popupState)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  padding: "0 1vh",
                }}
              >
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(3000, Hello)}
                >
                  <Lottie
                    animationData={Hello}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  3000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(10000, Star)}
                >
                  <Lottie
                    animationData={Star}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  10000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(50000, Balloon)}
                >
                  <Lottie
                    animationData={Balloon}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  50000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(100000, Money)}
                >
                  <Lottie
                    animationData={Money}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  100000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(500000, Egg)}
                >
                  <Lottie
                    animationData={Egg}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  500000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(1000000, Motobike)}
                >
                  <Lottie
                    animationData={Motobike}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  1000000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(5000000, Plane2)}
                >
                  <Lottie
                    animationData={Plane2}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  5000000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(10000000, Rocket)}
                >
                  <Lottie
                    animationData={Rocket}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  10000000 đ
                </div>
                <div
                  style={{ margin: "0 2vh", cursor: 'pointer' }}
                  onClick={() => handleSendMeme(50000000, King)}
                >
                  <Lottie
                    animationData={King}
                    loop={true}
                    style={{ width: "12vh", height: "12vh" }}
                  />
                  50000000 đ
                </div>
              </div>

              <div style={{display:'flex',gap:'30px', alignItems:'center',flexDirection:'row', padding:'20px',justifyContent:'center'}}>
                <Typography>wallet: {currentBalance}</Typography>
                <FormDialog/>
                <Button onClick={() => getbalance()}>Update wallet</Button>
              </div>
            </Popover>
          </div>
        )}
      </PopupState>
    );
  };

  const [inpMessage, setIptMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const input = useRef();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    onValue(firepadRef, (data) => {
      let getMsg = [];
      data.forEach((d) => {
        getMsg.push(d.val());
      });
      setMessages(getMsg);
    });
  }, []);
  const handleSendMessage = () => {
    push(firepadRef, {
      name: name,
      message: inpMessage,
    });
    setIptMessage("");
    scrollToBottom();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  function isJSONString(str) {
    try {
      return JSON.parse(str); // Nếu không có lỗi, chuỗi là JSON hợp lệ
    } catch (e) {
      return null; // Nếu có lỗi, chuỗi không phải là JSON hợp lệ
    }
  }
  const json = (message) => {
    if (isJSONString(message) != null) {
      const jsonObject = JSON.parse(message);
      return (
        <>
          <Lottie
            animationData={jsonObject.iconmeme}
            loop={true}
            style={{ width: "12vh", height: "12vh" }}
          />
          <span style={{ color: "red" }}>{jsonObject.token}đ</span>
        </>
      );
    }
    return <span>{message}</span>;
  };
  const handleSendMeme = (memeCoinAmount, emojiAnimation) => {
    const jsontemp = { token: memeCoinAmount, iconmeme: emojiAnimation };
    const jsonString = JSON.stringify(jsontemp);
    const message = `${jsonString} `;
    if(currentBalance>=memeCoinAmount){
      donateMoney(memeCoinAmount);
      push(firepadRef, {
        name: name,
        message: message,
      });
  
      setIptMessage(""); // Xóa nội dung nhập
      scrollToBottom(); // Cuộn xuống cuối cùng của khung chat
    }else{
    }
  };
  function FormDialog() {
    const [openAmount, setOpenAmount] = useState(false);
    const [amount, setAmount] = useState();
    const handleClickOpen = () => {
      setOpenAmount(true);
    };
    const handleClose = () => {
      setOpenAmount(false);
    };

    const updateBalance = async (amount) => {
      const data = await axios.post(`${process.env.REACT_APP_BASE_DOMAIN}/createpayment?amount=${amount}&iduser=${currenChannel.iduser}`)
      window.location.href = data.data;
    }
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

  return (
    <div
      style={{
        backgroundColor: "#202124",
        width: "55vh",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "5px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", flex: 0 }}>
        <CardHeader subheader="Top comment" />
        {!userRole ? <> {donate()}</> : <></>}
      </div>
      <List style={{ flex: 1, maxHeight: "69vh", overflow: "auto" }}>
        {messages.map((msg, index) => (
          <ListItem key={index}>
            <ListItemText>
              <span style={{ color: '#777' }}>{msg.name}  </span>

              {json(msg.message)}
            </ListItemText>
          </ListItem>
        ))}
        <div ref={messagesEndRef} />
      </List>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Link to="https://google.com">
          <Avatar
            alt="Remy Sharp"
            src={Customer.Avatar}
            sx={{
              width: 40,
              height: 40,
              marginLeft: 2,
              marginRight: "1rem",
            }}
          />
        </Link>
        <TextField
          type="text"
          value={inpMessage}
          onChange={(e) => {
            setIptMessage(e.target.value);
          }}
          inputRef={input}
          variant="standard"
          fullWidth
          label="Type a message"
          id="standard-basic"
          sx={{ width: 450 }}
        />
        <IconButton aria-label="settings" onClick={handleSendMessage}>
          <SendIcon />
        </IconButton>
      </Box>
    </div>
  );
}

export default Chat;
