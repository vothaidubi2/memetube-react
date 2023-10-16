import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { LineChart } from "@mui/x-charts";
import {
  Button,
  CardActions,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  ToggleButton,
  useForkRef,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { StaticDateRangePicker } from "@mui/x-date-pickers-pro/StaticDateRangePicker";
import { DateRangePicker } from "@mui/x-date-pickers-pro";

const DateRangeButtonField = React.forwardRef((props, ref) => {
  const {
    setOpen,
    label,
    id,
    disabled,
    InputProps: { ref: containerRef } = {},
    inputProps: { "aria-label": ariaLabel } = {},
  } = props;

  const handleRef = useForkRef(ref, containerRef);

  return (
    <Button
      variant="outlined"
      id={id}
      disabled={disabled}
      ref={handleRef}
      aria-label={ariaLabel}
      onClick={() => setOpen?.((prev) => !prev)}
    >
      {label ? `Current date range: ${label}` : "Pick a date range"}
    </Button>
  );
});

DateRangeButtonField.fieldType = "single-input";

const ButtonDateRangePicker = React.forwardRef((props, ref) => {
  const [open, setOpen] = React.useState(false);

  return (
    <DateRangePicker
      slots={{ field: DateRangeButtonField, ...props.slots }}
      slotProps={{ field: { setOpen } }}
      ref={ref}
      {...props}
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    />
  );
});
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yPropstable(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function DataDetails() {
  const [valuedate, setValuedate] = React.useState([null, null]);
  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Grid container>
        <Grid item sx={{ width: "60%" }}>
          <Typography
            sx={{
              fontSize: 27,
              fontWeight: "bold",
              padding: "2% 2% 2% 0",
              margin: "5px 25px 0 25px",
            }}
          >
            Channel analytics
          </Typography>

          <div sx={{ width: "60%" }}>
            <Box sx={{ border: 1, borderColor: "divider" }}>
              <Grid item xs>
                {" "}
                <Typography
                  sx={{ fontSize: 25, margin: "10px", textAlign: "center" }}
                  gutterBottom
                >
                  Your channel has had 9953 views in the past 28 days
                </Typography>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label={
                      <div>
                        Views
                        <div style={{ fontSize: "12px", color: "gray" }}>-</div>
                      </div>
                    }
                    sx={{ padding: "3%", width: "33.3%" }}
                    {...a11yPropstable(0)}
                  />
                  <Tab
                    label={
                      <div>
                        Watching time (hours)
                        <div style={{ fontSize: "12px", color: "gray" }}>-</div>
                      </div>
                    }
                    sx={{ padding: "3%", width: "33.3%" }}
                    {...a11yPropstable(1)}
                  />
                  <Tab
                    label={
                      <div>
                        Number of registrants
                        <div style={{ fontSize: "12px", color: "gray" }}>-</div>
                      </div>
                    }
                    sx={{ padding: "3%", width: "33.3%" }}
                    {...a11yPropstable(2)}
                  />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                  <LineChart
                    sx={{ width: "60%" }}
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    height={300}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    sx={{ width: "60%" }}
                    height={300}
                  />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                  <LineChart
                    xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                    series={[
                      {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                      },
                    ]}
                    sx={{ width: "60%" }}
                    height={300}
                  />
                </CustomTabPanel>
              </Grid>
            </Box>
          </div>
        </Grid>

        <Grid item sx={{ width: "20%", margin: " 0 2%" }}>
          <Box
            sx={{
              padding: "6% 0",
            }}
          >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <ButtonDateRangePicker
                label={
                  valuedate[0] === null && valuedate[1] === null
                    ? "FROM - TO"
                    : valuedate
                        .map((date) =>
                          date ? date.format("MM/DD/YYYY") : "null"
                        )
                        .join(" - ")
                }
                valuedate={valuedate}
                onChange={(newValue) => setValuedate(newValue)}
              />
            </LocalizationProvider>
          </Box>
          <CardContent sx={{ border: 1, borderColor: "divider" }}>
            <Typography
              sx={{ fontSize: 23, fontWeight: "bold", marginBottom: "10px" }}
              gutterBottom
            >
              Real time
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: 15, marginBottom: "15%" }}
              gutterBottom
            >
              <CircularProgress size={20} sx={{ marginRight: "2%" }} />
              Updating in real time
            </Typography>
            <Divider sx={{ marginBottom: "5%" }} light />
            <Typography variant="h5" component="div">
              373
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: 17, marginBottom: "15%" }}
              gutterBottom
            >
              Number of subscribers
            </Typography>
            <Divider sx={{ marginBottom: "5%" }} light />
            <Typography variant="h5" component="div" sx={{}}>
              1920
            </Typography>
            <Typography
              color="text.secondary"
              sx={{ fontSize: 17, marginBottom: "15%" }}
              gutterBottom
            >
              number of vehicle turns - Last 48 hours
            </Typography>

            <Divider sx={{ marginBottom: "10px" }} light />

            <CardActions>
              <ToggleButton>Read more</ToggleButton>
            </CardActions>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}
