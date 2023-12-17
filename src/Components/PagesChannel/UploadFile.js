import React, { useState, useRef, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { styled } from "@mui/material/styles";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { Alert, CircularProgress, InputLabel, Link, MenuItem, Select, Snackbar } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import VideoAPI from "../../utils/VideoAPI";
import ChannelAPI from "../../utils/ChannelAPI";
import CategoryAPI from "../../utils/CategoryAPI";
import ImageAPI from "../../utils/ImageAPI";
import format from 'date-fns/format';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Cookie/UserContext";
import NotificationAPI from "../../utils/NotificationAPI";


const steps = ["uploadvideo", "Detail", "Display mode"];
const stepsupdate = ["Detail", "Display mode"];

export default function UploadFile({ active, video }) {
  const userData = useContext(UserContext)
  const [titleValue, setTitleValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [status, setStatus] = useState(true)
  const [file, setFile] = useState('');
  const [pathVideo, setPathVideo] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [uploadedImage, setUploadedImg] = useState();
  const [category, setCategory] = React.useState(null);
  const [listCategory, setListCategory] = React.useState([]);
  let user = useContext(UserContext);
  const [notificationSent, setNotificationSent] = useState(false);

  const currentURL = new URL(window.location.href);



  const handleChangeCate = (event) => {
    setTitleValue(titleRef.current.value)
    setDescriptionValue(descriptionRef.current.value)
    setCategory(event.target.value);
  };
  
  const fetchDataCategory = async () => {
    const data = await CategoryAPI.getAll(`/getallcate`)
    setListCategory(data.data);
    console.log(data.data)
  };
  useEffect(() => {
    if (active != null) {
      setTitleValue(video.title)
      setDescriptionValue(video.describes)
    }
    fetchDataCategory()
  }, [])

  let stepsvalue = () => {
    if (active === null) {
      return steps;
    } else {
      return stepsupdate;
    }
  };


  const handleFileChange = async (event) => {
    event.preventDefault();
    setTitleValue(titleRef.current.value)
    setDescriptionValue(descriptionRef.current.value)
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
  const handlestatus = (event) => {
    setStatus(event.target.value)
    console.log(event.target.value)
  }
  const FormComponent1 = () => {
    return (
      <FormControl
        sx={{
          backgroundColor: "rgb(40,40,40)",
          width: "100%",
          height: "450px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button component="label" onChange={handleComplete}>
          <Chip label="Upload Files" icon={<FileUploadIcon />} />
          <VisuallyHiddenInput type="file" />
        </Button>
        <Typography
          sx={{ color: "text.secondary", textAlign: "center", width: "100%" }}
        >
          Your videos will be private until you publish them.
        </Typography>
      </FormControl>
    );
  };
  const FormComponent2 = (event) => {
    return (
      <FormControl
        sx={{
          backgroundColor: "rgb(40,40,40)",
          width: "100%",
          height: "450px",
        }}
      >
        <div style={{ display: "flex", width: "100%" }}>
          <div
            className="informationmedia"
            style={{ flex: "70%", paddingRight: "2%" }}
          >
            <TextField
              sx={{ width: "100%" }}
              id="outlined-multiline-static"
              label="Title (required)"
              multiline
              rows={2}
              inputRef={titleRef}
              name="title"
              placeholder="Add a title to describe your video"
              defaultValue={titleValue}
            />
            <TextField
              sx={{ width: "100%", margin: "2% 0 0 0" }}
              id="outlined-multiline-static"
              label="Describe"
              multiline
              rows={5}
              name="describes"
              inputRef={descriptionRef}
              placeholder="Introduce your video to viewers"
              defaultValue={descriptionValue}
            />
            <Box sx={{ width: '100%', margin: "2% 0 0 0" }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Category"
                  onChange={handleChangeCate}
                >
                  {listCategory?.map((item, key) => {
                    return (
                      <MenuItem key={key} value={item}>{item.name}</MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Typography sx={{ margin: "2% 0 0 0" }}>Small picture</Typography>
              <Typography
                sx={{
                  margin: "0% 0 1% 0",
                  color: "text.secondary",
                  fontSize: 13,
                }}
              >
                Choose or upload an image to represent what's in your video.
                Attractive thumbnails will highlight your video and attract
                viewers
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Button
                  component="label"
                  startIcon={<AddPhotoAlternateOutlinedIcon />}
                  sx={{
                    width: "200px",
                    height: "80px",
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
                      Download pear thumbnails
                    </Typography>
                    <VisuallyHiddenInput
                      type="file"
                      onChange={(e) => handleFileChange(e)}
                    />
                  </Box>
                </Button>

                {active != null ? (
                  selectedImage ? (
                    <img
                      src={URL.createObjectURL(selectedImage)}
                      alt="Selected Thumbnail"
                      style={{
                        marginLeft: "10px",
                        maxWidth: "100%",
                        height: "80px",
                      }}
                    />
                  ) : (
                    <img
                      src={video.imageurl}
                      alt="Selected Thumbnail"
                      style={{
                        marginLeft: "10px",
                        maxWidth: "100%",
                        height: "80px",
                      }}
                    />
                  )
                )
                  : (
                    selectedImage && (
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Selected Thumbnail"
                        style={{
                          marginLeft: "10px",
                          maxWidth: "100%",
                          height: "80px",
                        }}
                      />
                    )
                  )}
              </Box>
            </Box>
          </div>

        </div>
      </FormControl>
    );
  };
  const FormComponent3 = () => {
    return (
      <FormControl sx={{ backgroundColor: "rgb(40,40,40)", height: "450px", width: "100%" }}>
        <Typography
          sx={{ fontSize: 27, fontWeight: "bold", marginBottom: "10px" }}
          gutterBottom
        >
          Channel dashboard
        </Typography>
        <div style={{ display: "flex", width: "100%" }}>
          <div className="content" style={{ paddingRight: "2%", width: "100%" }}>
            <CardContent sx={{ border: "1px solid gray" }}>
              <Typography>Save or publish</Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                Make your video public, unlisted, or private
              </Typography>
              <RadioGroup
                sx={{ padding: "0 5%" }}
                aria-labelledby="demo-radio-buttons-group-label"
                // defaultChecked="true"
                name="radio-buttons-group"
                value={status}
                onChange={handlestatus}
              >
                <FormControlLabel
                  name="status"
                  value="false"
                  control={<Radio name="status" />}
                  label="Private"
                />
                <Typography sx={{ padding: "0 4%", color: "text.secondary" }}>
                  Only can see your videos
                </Typography>
                <FormControlLabel
                  name="status"
                  value="true"
                  control={<Radio name="status" />}
                  label="Public"
                />
                <Typography sx={{ padding: "0 4%", color: "text.secondary" }}>
                  People can see your videos
                </Typography>
              </RadioGroup>
            </CardContent>
          </div>
        </div>
      </FormControl>
    );
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const [completed, setCompleted] = React.useState({});

  const totalSteps = () => {
    return stepsvalue().length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        stepsvalue().findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = async (event) => {
    event.preventDefault()
    if (active == null) {
      if (activeStep === 0) {
        if (active == null) {
          if (!event.target.files) {
            setState({
              ...state,
              open: true,
              titleError: "Video must exist!",
            });
            return
          }
          const file = event.target.files[0]
          setPathVideo(event.target.files[0])
          setFile(URL.createObjectURL(file))
        }
      } else if (activeStep === 1) {
        setTitleValue(titleRef.current.value)
        setDescriptionValue(descriptionRef.current.value)
        if (!titleRef.current.value) {
          setState({
            ...state,
            open: true,
            titleError: "Title must not be blank!",
          });
          return
        }
        if (!descriptionRef.current.value) {
          setState({
            ...state,
            open: true,
            titleError: "Description must not be blank!",
          });
          return
        }
        if (category == null) {
          setState({
            ...state,
            open: true,
            titleError: "Category must not be empty!",
          });
          return
        }
        if (!selectedImage) {
          setState({
            ...state,
            open: true,
            titleError: "Image must exist!",
          });
          return
        }
      }
    } else {
      if (activeStep == 0) {
        console.log('vao day:', titleRef.current.value)
        console.log('vao day image:', selectedImage)
        setTitleValue(titleRef.current.value)
        setDescriptionValue(descriptionRef.current.value)
        if (!titleRef.current.value) {
          setState({
            ...state,
            open: true,
            titleError: "Title must not be blank!",
          });
          return
        }
        if (!descriptionRef.current.value) {
          setState({
            ...state,
            open: true,
            titleError: "Description must not be blank!",
          });
          return
        }
        if (category == null) {
          setState({
            ...state,
            open: true,
            titleError: "Category must not be empty!",
          });
          return
        }
      }
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  // loading button
  const [loadingButton, setLoadingButton] = useState(false);
  const handleFinish = async () => {
    setLoadingButton(true)
    if (active == null) {
      let imageData = new FormData();
      imageData.append('files', selectedImage)

      ///fetch lại video
      const imageurl = await ImageAPI.uploadImage("/uploadimage", imageData)
      let formVideo = new FormData()
      formVideo.append('files', pathVideo)
      const videoUrl = await ImageAPI.uploadImage("/uploadvideo", formVideo)
      const channel = await ChannelAPI.getOneItem(`/findchannelbyiduser?iduser=${userData.Iduser}`)
      const form = {
        title: titleValue,
        imageurl: imageurl,
        describes: descriptionValue,
        videourl: videoUrl,
        datecreated: '',
        channel: channel,
        category: category,
        status: status,
        viewcount: 0
      }
      console.log(form)
      const data = await VideoAPI.postVideo('/postvideo', form)
      if (data.status == 201) {
        setLoadingButton(false)
        if(status===true){
          if (!notificationSent) {
            const addNotification = async () => {
              let dataNotification={
                Idnotification: "",
                Iduser: "",
                title: `User ${user.Email} posted a new video`,
                contents: `${titleValue}`,
                datecreate: "",
                checked: false,
                redirecturl: `http://localhost:3000/watch?id=${data.data.idvideo}`,
                status: true,
              };
              const jsonData = JSON.stringify(dataNotification);
              try {
                const data = await NotificationAPI.addnotificationOnetoMany(
                  `/addNotificationOnetoMany?Idsend=${user.Iduser}`,
                  jsonData
                );
                setNotificationSent(true);
              } catch (error) {
              }
            };
      
            addNotification();
          }
        }
      }
    } else {
      let form = {
        idvideo: video.idvideo,
        title: titleValue,
        describes: descriptionValue,
        videourl: video.videourl,
        datecreated: video.datecreated,
        channel: video.channel,
        category: video.category,
        status: status,
        viewcount: video.viewcount
      }
      if (selectedImage) {
        let imageData = new FormData();
        imageData.append('files', selectedImage)
        const imageurl = await ImageAPI.uploadImage("/uploadimage", imageData)
        form = { ...form, imageurl: imageurl }
      } else {
        form = { ...form, imageurl: video.imageurl }
      }
      // console.log("form:",form)
      const data = await VideoAPI.updateVideo('/updatevideo', form)
      if (data.status == 200) {
        setLoadingButton(false)
      }
    }
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  }

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

  return (
    <Box sx={{ width: "100%" }}>
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
            {titleError}
          </Alert>
        </Snackbar>
      </Box>
      <Stepper activeStep={activeStep} sx={{ width: "50%", marginLeft: "25%" }}>
        {stepsvalue().map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={handleStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, textAlign: 'center' }}>
              All steps completed - you&apos;re finished
            </Typography>
            {/* <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={upload}>Upload File</Button>
            </Box> */}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {(() => {
                if (active === null) {
                  if (activeStep === 0) {
                    return <FormComponent1 />;
                  } else if (activeStep === 1) {
                    return <FormComponent2 />
                  } else {
                    return <FormComponent3 />
                  }
                } else {
                  if (activeStep === 0) {
                    return <FormComponent2 />
                  } else {
                    return <FormComponent3 />
                  }
                }
              })()}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 4 }}>
              <Button
                color="inherit" ủ
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== stepsvalue().length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <>
                    {completedSteps() === totalSteps() - 1
                      ? <>
                        {!loadingButton ?
                          <Button onClick={handleFinish}>
                            <>Finish</>
                          </Button> :
                          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <CircularProgress />
                          </Box>
                        }</>
                      : <Button onClick={handleComplete}>
                        Complete Step
                      </Button>}
                  </>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
