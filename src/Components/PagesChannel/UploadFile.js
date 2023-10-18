import React, { useState, useRef } from "react";
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
import { Link } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Chip from "@mui/material/Chip";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const steps = ["uploadvideo", "Detail", "Display mode"];
const stepsupdate = ["Detail", "Display mode"];

export default function UploadFile({ active }) {
  const createUserDate=()=>{
    return{
      file,titleValue,descriptionValue,status,selectedImage
  }
  }
  const [titleValue,setTitleValue]=useState('');
  const [descriptionValue,setDescriptionValue] =useState('');
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const [status,setStatus]=useState('')
  const [file,setFile]=useState('');
  const [selectedImage, setSelectedImage] = useState(false);

  let stepsvalue = () => {
    if (active === null) {
      return steps;
    } else {
      return stepsupdate;
    }
  };



  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Use URL.createObjectURL to create a temporary URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
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
const handlestatus =(event)=>{
  setStatus(event.target.value)
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
              placeholder="Add a title to describe your video"
            />
            <TextField
              sx={{ width: "100%", margin: "2% 0 0 0" }}
              id="outlined-multiline-static"
              label="Describe"
              multiline
              rows={5}
              inputRef={descriptionRef}
              placeholder="Introduce your video to viewers"
            />
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
                    onChange={handleFileChange}
                  />
                </Box>
              </Button>

              {selectedImage && (
                <img
                  src={selectedImage}
                  alt="Selected Thumbnail"
                  style={{
                    marginLeft: "10px",
                    maxWidth: "100%",
                    height: "80px",
                  }}
                />
              )}
            </Box>
          </div>
          <div className="videomedia" style={{ flex: "20%", marginTop: "0%" }}>
          <CardMedia
            component="iframe"
            src={file}
          />
            <CardContent sx={{ border: "1px solid gray" }}>
              <Typography sx={{ color: "GrayText", fontSize: "21px" }}>
                Video link
              </Typography>

              <Link
                href=    {file}
                sx={{ textDecoration: "underline", fontSize: "18px" }}
              >
               {file}
              </Link>

              <Typography sx={{ color: "GrayText", fontSize: "21px" }}>
                Filename
              </Typography>

              <Typography color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
            </CardContent>
          </div>
        </div>
      </FormControl>
    );
  };
  const FormComponent3 = () => {
    return (
      <FormControl sx={{ backgroundColor: "rgb(40,40,40)", height: "450px" }}>
        <Typography
          sx={{ fontSize: 27, fontWeight: "bold", marginBottom: "10px" }}
          gutterBottom
        >
          Channel dashboard
        </Typography>
        <div style={{ display: "flex", width: "100%" }}>
          <div className="content" style={{ flex: "70%", paddingRight: "2%" }}>
            <CardContent sx={{ border: "1px solid gray" }}>
              <Typography>Save or publish</Typography>
              <Typography sx={{ color: "text.secondary", fontSize: "12px" }}>
                Make your video public, unlisted, or private
              </Typography>
              <RadioGroup
                sx={{ padding: "0 5%" }}
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
                value={status}
                onChange={handlestatus}
               
              >
                <FormControlLabel
                  value="private"
                  control={<Radio />}
                  label="Private "
                />
                <Typography sx={{ padding: "0 4%", color: "text.secondary" }}>
                  Only you and the people you choose can see your videos
                </Typography>
                <FormControlLabel
                  value="public"
                  control={<Radio />}
                  label="Public"
                />
                <Typography sx={{ padding: "0 4%", color: "text.secondary" }}>
                  Only you and the people you choose can see your videos
                </Typography>
              </RadioGroup>
            </CardContent>
          </div>
          <div className="videomedia" style={{ flex: "20%", marginTop: "0%" }}>
          <CardMedia
            component="iframe"
            src={file}
          />
            <CardContent sx={{ border: "1px solid gray" }}>
              <Typography sx={{ color: "GrayText", fontSize: "21px" }}>
                Video link
              </Typography>

              <Link
                href=    {file}
                sx={{ textDecoration: "underline", fontSize: "18px" }}
              >
               {file}
              </Link>

              <Typography sx={{ color: "GrayText", fontSize: "21px" }}>
                Filename
              </Typography>

              <Typography color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
              </Typography>
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

  const handleComplete = (event) => {
if(activeStep===0){
  const file= event.target.files[0]
  setFile(URL.createObjectURL(file))
}else if(activeStep===1){
  setTitleValue(titleRef.current.value) 
  setDescriptionValue( descriptionRef.current.value) 
}






    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const upload = () => {
   console.log( createUserDate())
  };

  return (
    <Box sx={{ width: "100%" }}>
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
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={upload}>Upload File</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {(() => {
                if (active === null) {
                  if (activeStep === 0) {
                    return <FormComponent1 />;
                  } else if (activeStep === 1) {
                    return <FormComponent2 />;
                  } else {
                    return <FormComponent3 />;
                  }
                } else {
                  if (activeStep === 0) {
                    return <FormComponent2 />;
                  } else {
                    return <FormComponent3 />;
                  }
                }
              })()}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"ủ
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
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? "Finish"
                      : "Complete Step"}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}