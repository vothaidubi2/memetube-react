import React, { useEffect, useState } from "react";
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
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import Grid from "@mui/material/Grid";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import UploadFile from "./UploadFile";
import VideoAPI from "../../utils/VideoAPI";
import FirebaseConfig from "../../utils/FirebaseConfig";
import VideoFirebaseConfig from "../../utils/VideoFirebaseConfig";
import Moment from 'react-moment';
// function createData(
//   linkvideo,
//   name,
//   status,
//   datecreate,
//   views,
//   comment,
//   percentlike
// ) {
//   return {
//     linkvideo,
//     name,
//     status,
//     datecreate,
//     views,
//     comment,
//     percentlike,
//   };
// }

// const rows = [
//   createData(
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
//     "video1",
//     true,
//     "6/6/2023",
//     15000,
//     325,
//     6
//   ),
//   createData(
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
//     "video2",
//     true,
//     "6/6/2023",
//     9700,
//     419,
//     7
//   ),
//   createData(
//     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWd96a9UE3aFBK97Vts75h_57qGKuUXK7MNWjloWH3-uQdwJfI0fKOVZPb-w9W6NKS-Xg&usqp=CAU",
//     "video3",
//     false,
//     "6/6/2023",
//     100000,
//     9,
//     2
//   ),
// ];

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
    id: "idvideo",
    // numeric: true,
    // disablePadding: true,
    label: "Video ",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Name video ",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Display mode",
  },
  {
    id: "datecreated",
    numeric: true,
    disablePadding: false,
    label: "Publication date",
  },
  {
    id: "viewcount",
    numeric: true,
    disablePadding: false,
    label: "Views",
  },
  // {
  //   id: "comment",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Comment",
  // },
  // {
  //   id: "percentlike",
  //   numeric: true,
  //   disablePadding: false,
  //   label: "Like(%)",
  // },
];

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all desserts",
            }}
          />
        </TableCell>
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
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={() => props.handleDeleteVideo(props.listVideo)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default function Content() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);


  //fetchdata
  const [rows, setRows] = useState([])
  const [totalVideo, setTotalVideo] = useState(0)
  const fetchDataVideo = async () => {
    const data = await VideoAPI.getallByUser(`/videobyiduser?iduser=${1}`)
    setTotalVideo(data.total)
    setRows(data.data)
    console.log("vao", data.total)
  }
  const handleDeleteVideo = async(item)=>{
    for(let i = 0;i<item.length;i++){
      const data = await VideoAPI.deleteItem(`/deletevideo?id=${item[i].idvideo}`)
      console.log("xoa",data)
      FirebaseConfig.DeleteVideo(item[i].imageurl)
      FirebaseConfig.DeleteImage(item[i].videourl)
    }
    fetchDataVideo()
  }

  useEffect(() => {
    fetchDataVideo()
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.idvideo);
      // setSelected(newSelected);
      setSelected(rows);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {

    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    console.log("name:", newSelected[0])
    setSelected(newSelected);
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalVideo) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [totalVideo, order, orderBy, page, rowsPerPage]
  );
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ width: "100%" }}>
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
      <Paper sx={{ width: "100%", padding: "10px 25px 0 25px" }}>
        <EnhancedTableToolbar numSelected={selected.length} listVideo={selected} handleDeleteVideo={handleDeleteVideo}/>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={totalVideo}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.idvideo}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        aria-checked={isItemSelected}
                        onClick={(event) => handleClick(event, row)}
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                          "aria-labelledby": labelId,
                        }}
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <img
                          onClick={handleClickOpen}
                          className="smallimage"
                          src={row.imageurl}
                          alt=""
                          width={"50%"}
                        />

                        <Dialog
                          fullWidth="lg"
                          maxWidth="lg"
                          open={open}
                          onClose={handleClose}
                        >
                          <DialogTitle
                            sx={{ backgroundColor: "rgb(40,40,40)" }}
                          >
                            Infomation Video
                          </DialogTitle>
                          <DialogContent
                            sx={{ backgroundColor: "rgb(40,40,40)" }}
                          >
                            <UploadFile active={1} />
                          </DialogContent>
                          <DialogActions
                            sx={{ backgroundColor: "rgb(40,40,40)" }}
                          >
                            <Button onClick={handleClose}>Close</Button>
                          </DialogActions>
                        </Dialog>
                      </TableCell>
                    </TableCell>

                    <TableCell align="right">{row.title}</TableCell>
                    <TableCell align="right">
                      {row.status ? "public" : "prive"}
                    </TableCell>
                    <TableCell align="right"><Moment format="yyyy-MM-DD HH:mm:ss">{row.datecreated}</Moment></TableCell>
                    <TableCell align="right">{row.viewcount}</TableCell>
                    {/* <TableCell align="right">{row.comment}</TableCell> */}
                    {/* <TableCell align="right">{row.percentlike}</TableCell> */}
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalVideo}
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
