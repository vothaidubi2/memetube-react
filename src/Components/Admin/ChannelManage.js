import React, {  useEffect, useState } from "react";
import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import {
  Alert,
  Button,
  Snackbar,
  TextField,
} from "@mui/material";
import Moment from "react-moment";
import {utils,writeFile} from "xlsx";
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ChannelAPI from "../../utils/ChannelAPI";
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "idchannel",
    // numeric: true,
    // disablePadding: false,
    label: "Id Channel ",
  },
  {
    id: "channelname",
    numeric: false,
    disablePadding: false,
    label: "Name channel",
  },
  {
    id: "iduser",
    numeric: false,
    disablePadding: false,
    label: "Id user",
  },

  {
    id: "datecreated",
    numeric: false,
    disablePadding: false,
    label: "Date Created",
  }
  ,
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  }
  ,
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "",
  }
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default function UserManage() {
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(
                theme.palette.primary.main,
                theme.palette.action.activatedOpacity
              ),
          }),
        }}
      >
        {numSelected > 0 ? (
          <Typography
            sx={{ flex: "1 1 100%" }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} selected
          </Typography>
        ) : (
          <>
               <Button
               
  variant="outlined"
  size="small"
  onClick={handleExportClick} // Khi nhấn nút, set cờ shouldExport thành true
>
  <ImportExportIcon/>
  <span>Export excel</span>
</Button>
          </>
        )}
      </Toolbar>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const [shouldExport, setShouldExport] = useState(false);
  const exportFile = () => {
    var wb = utils.book_new(),
      ws = utils.json_to_sheet(exportData);
    utils.book_append_sheet(wb, ws, "Channel");
    writeFile(wb, "Channel.xlsx");
  };
  const handleExportClick = () => {
    setShouldExport(true);
  };
  useEffect(() => {
    if (shouldExport) {
      exportFile();
      setShouldExport(false);
    }
  }, [shouldExport]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  //fetchdata
  const [rows, setRows] = useState([]);
  const [totalChannel, setTotalChannel] = useState(0);
  const fetchDataChannel = async () => {
    const data = await ChannelAPI.getAllItem(`/fillallchannel`);
    setTotalChannel(data.length);
    setRows(data);
  };
  const exportData = rows.map((channel) => ({
    Idchannel: channel.idchannel,
    'Channel name ': channel.channelname,
    'Id user ': channel.users.iduser,
    'Datecreated  ': channel.datecreated,
    'Status  ': channel.status,
  }));
  const [state, setState] = useState({
    openinformaiton: false,
    vertical: "top",
    horizontal: "center",
    titleError: "Something is wrong ",
    typeError:"error"
  });

  const { vertical, horizontal, openinformaiton, titleError,typeError } = state;
  useEffect(() => {
    if (!open) {
      fetchDataChannel();
    }
    fetchDataChannel();
  }, [open]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalChannel) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),

    [totalChannel, order, orderBy, page, rowsPerPage,rows]

  );
  const handleClose = () => {
    setState({ ...state, openinformaiton: false });
  };
  const handleClickStatusChannel = (index, row) => async (event) => {
    let updatedStatus = [...visibleRows];
    updatedStatus[index].status = !updatedStatus[index].status;
    setRows(updatedStatus);
    const dataReceive = await ChannelAPI.updateStatus(
      `/updateChannelStatus?id=${row.idchannel}&status=${row.status}`
    );
  };
  // eidt name channel
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataChannel((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const [dataChannel, setDataChannel] = useState("");
  console.log(visibleRows)
  const handleClickEdit = (row) => {
    setDataChannel(row);
  };
  const handleSubmit = (actionType) => async (event) => {
    event.preventDefault();
    if (actionType === "update") {
      if (
        dataChannel.idchannel === null ||
        dataChannel.idchannel === undefined
      ) {
        setState({
          ...state,
          openinformaiton: true,
          titleError: "No data Channel",
          typeError:"error"
        });
      } else {
        if( dataChannel.channelname === ''){
          setState({
            ...state,
            openinformaiton: true,
            titleError: "No data Channel",
            typeError:"error"
          });
        }else{
          let jsondata=JSON.stringify(dataChannel)
          const data = await ChannelAPI.updateChannel(`/updateChannel`,jsondata);
  
          const updatedChannel = visibleRows.map((row) =>
          row.idchannel   === dataChannel.idchannel ? { ...row, channelname:dataChannel.channelname  } : row
        );
        setRows(updatedChannel);
        setState({
          ...state,
          openinformaiton: true,
          titleError: "Update success",
          typeError:"success"
        });
        }

      }
    } else if (actionType === "reset") {
      const emptyDataChannel = Object.fromEntries(
        Object.keys(dataChannel).map((key) => [key, ""])
      );
      setDataChannel(emptyDataChannel);
      console.log(state)
    }
  };


  return (
    <Box sx={{ width: "100%" }}>
      <Grid item xs>
      <Snackbar
              sx={{ marginTop: "5%" }}
              anchorOrigin={{ vertical, horizontal }}
              open={openinformaiton}
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

        <Typography
          sx={{
            fontSize: 27,
            fontWeight: "bold",
            marginBottom: "10px",
            margin: "10px 25px 0 25px",
            cursor: "pointer",
          }}
          gutterBottom
        >
          Admin dashboard
        </Typography>
      </Grid>
   
      <Paper sx={{ width: "100%", padding: "10px 25px 0 25px" }}>

      <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <TextField
                disabled
                id="outlined-disabled"
                defaultValue={dataChannel.idchannel}
                value={dataChannel.idchannel}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="channelname"
                defaultValue={dataChannel.channelname}
                name="channelname"
                onChange={handleChange}
                autoFocus
                value={dataChannel.channelname}
              />
            </Grid>

            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(event) => handleSubmit("update")(event)}
                sx={{ mt: 1, mb: 1 }}
              >
                Update
              </Button>
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(event) => handleSubmit("reset")(event)}
                sx={{ mt: 1, mb: 1 }}
              >
                reset
              </Button>
            </Grid>
          </Grid>

        <EnhancedTableToolbar
          numSelected={selected.length}
          listVideo={selected}
        />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={totalChannel}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.idchannel}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell>{row.idchannel}</TableCell>

                    <TableCell sx={{ width: "350px" }} align="left">
                      {row.channelname}
                    </TableCell>
                    
                    <TableCell sx={{ width: "350px" }} align="left">
                      {row.users.iduser}
                    </TableCell>

                    <TableCell align="left">
                      <Moment format="yyyy-MM-DD">{row.datecreated}</Moment>
                    </TableCell>
                    <TableCell align="left">
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={handleClickStatusChannel(index, row)}
                            checked={row.status}
                          />
                        }
                      />
                    </TableCell>
                  
                    <TableCell align="left">
                      <Button
                        variant="contained"
                        onClick={() => handleClickEdit(row)}
                        endIcon={<EditIcon />}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalChannel}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}
