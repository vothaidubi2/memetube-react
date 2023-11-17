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
  const [inputDate, setInputDate] = React.useState([null, null]);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);
  const [chartLabels, setChartLabels] = React.useState();
  const [chartValue, setChartValue] = React.useState();
  const [chartData, setChartData] = React.useState({
    xAxis: [{ data: [] }],
    series: [{ data: [] }],
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeDate = (newValue) => {
    console.log(newValue)
    if (newValue[0] != null && newValue[1] != null) {
      const temp = newValue.map((item) => item.format("YYYY-MM-DD"))
      setInputDate(temp)
      setValuedate(newValue)
    }
  }

  //fetch data
  async function fetchRevenueData() {
    try {
      console.log("start:", inputDate[0])
      console.log("end:", inputDate[1])
      const response = await fetch(`${process.env.REACT_APP_BASE_DOMAIN}/gettotalcommentfordaterange?datestart=${inputDate[0]}&dateend=${inputDate[1]}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();

      const dates = [];
      const values = [];

      for (const str of data.data) {
        const [date, value] = str.split(',');
        dates.push(date);
        values.push(parseFloat(value));
      }
      var arrayOfObjects = [];
      dates.map((date, index) => ({ date, amount: values[index] })).forEach(temp => arrayOfObjects.push(temp));
      // arrayOfObjects = dates.map((date, index) => ({ date, amount: values[index] }));

      console.log('data:', arrayOfObjects);
      return arrayOfObjects;

    } catch (error) {
      console.error('Error fetching revenue data:', error);
      return [];
    }
  }

  function aggregateWeekly(data) {
    const aggregatedData = {};

    data.forEach((entry) => {
      const date = new Date(entry.date);
      const weekStartDate = new Date(date.getFullYear(), date.getMonth(), date.getDate() - date.getDay());
      // const weekEndDate = new Date(weekStartDate.getFullYear(), weekStartDate.getMonth(), weekStartDate.getDate() + 6);
      const weekKey = weekStartDate.toISOString().slice(0, 10);

      if (!aggregatedData[weekKey]) {
        aggregatedData[weekKey] = { date: weekKey, amount: entry.amount };
      } else {
        aggregatedData[weekKey].amount += entry.amount;
      }
    });

    return Object.values(aggregatedData);
  }

  const updateChartWithData = async () => {
    const startDate = inputDate[0];
    const endDate = inputDate[1];
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Calculate the difference in milliseconds
    const diffInMilliseconds = Math.abs(end - start);

    // Convert milliseconds to days
    const dateDiff = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    console.log("datediff: ", dateDiff)

    let chartData;

    if (dateDiff <= 14) {
      // Show full data
      chartData = await fetchRevenueData();
      // chartData = (await fetchRevenueData()).filter((entry) => {
      //   const entryDate = new Date(entry.date);
      //   return entryDate >= startDate && entryDate <= endDate;
      // });
      console.log("vao day", chartData)
    } else {
      // Aggregate into weekly clusters
      chartData = aggregateWeekly(await fetchRevenueData());
      console.log("khong vao")
    }

    setChartLabels(chartData.map((entry) => entry.date));
    setChartValue(chartData.map((entry) => entry.amount));
    const newData = {
      xAxis: [{ data: chartData.map((entry) => entry.date),scaleType: 'point' }],
      series: [{ data: chartData.map((entry) => entry.amount) }],
    };
    setChartData(newData);
  }
  const generateRandomData = () => {
    const newData = {
      xAxis: [{ data: [0] ,scaleType: 'point'}],
      series: [{ data: [0] }],
    };
    setChartData(newData);
  };

  React.useEffect(() => {
    generateRandomData();
  }, [])

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
            <Box sx={{ border: 1, borderColor: "divider", marginTop: '30px' }}>
              <Grid item xs>
                {" "}
                {/* <Typography
                  sx={{ fontSize: 25, margin: "10px", textAlign: "center" }}
                  gutterBottom
                >
                  Your channel has had 9953 views in the past 28 days
                </Typography> */}
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                >
                  <Tab
                    label={
                      <div>
                        Comment
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
                    xAxis={chartData.xAxis}
                    series={chartData.series}
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

        <Grid item sx={{ width: "30%", margin: " 0 2%" }}>
          <Box
            sx={{
              padding: "6% 0", display: 'flex', gap: '20px'
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
                onChange={(newValue) => handleChangeDate(newValue)}
              />
            </LocalizationProvider>
            <Button size="large" variant="outlined" onClick={updateChartWithData}>Show</Button>
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
