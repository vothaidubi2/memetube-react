import React, { useContext, useEffect, useState } from "react";
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
import VideoAPI from "../../utils/VideoAPI";
import Moment from 'react-moment';
import { UserContext } from "../Cookie/UserContext";
import FirebaseConfig from "../../utils/FirebaseConfig";
import UsersAPI from "../../utils/UsersAPI";
import { Check } from "@mui/icons-material";


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
    id: "iduser",
    // numeric: true,
    // disablePadding: false,
    label: "Id ",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "datecreated",
    numeric: false,
    disablePadding: false,
    label: "Date created",
  },
  
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  }
  ,
  
  {
    id: "role",
    numeric: false,
    disablePadding: false,
    label: "Admin",
  }

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



export default function UserManager() {
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
            <Typography
              sx={{ flex: "1 1 100%" }}
              variant="h6"
              id="tableTitle"
              component="div"
            >
              Nutrition
            </Typography>
          </>
        )}
  
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={() => handleDeleteVideo(props.listVideo)}>
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
  const userData = useContext(UserContext)
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("title");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [open, setOpen] = React.useState(false);
  //fetchdata
  const [rows, setRows] = useState([])
  const [totalUser, setTotalUser] = useState(0)
  const fetchDataVideo = async () => {
    const data = await UsersAPI.getall(`/getAllUser`)
    setTotalUser(data.countUser)
    setRows(data.data)
    console.log("vao", data.data)
  }
  const [checkedStatus, setCheckedStatus] = React.useState(    rows.map(row=>row.status));
  const handleDeleteVideo = async (item) => {

    // for (let i = 0; i < item.length; i++) {
    //   const data = await VideoAPI.deleteItem(`/deletevideo?id=${item[i].idvideo}`)
    //   console.log("xoa", data)
    //   FirebaseConfig.DeleteVideo(item[i].imageurl)
    //   FirebaseConfig.DeleteImage(item[i].videourl)
    // }
    // setRows(rows.filter(row => row.idvideo !=item[0].idvideo))
    // fetchDataVideo()
  }

  useEffect(() => {
    if (!open) {
      fetchDataVideo()
    }
    fetchDataVideo()
  }, [open])

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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalUser) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [rows,totalUser, order, orderBy, page, rowsPerPage]
  );
  const handleClickStatusUser=  (indexUser,row)=> async(event)=>{

    let updatedStatus = [...rows];
    updatedStatus[indexUser].status = !updatedStatus[indexUser].status;
    setRows(updatedStatus);
    const dataReceive = await UsersAPI.updateStatus( `/updateUserStatus?id=${row.iduser}&status=${rows[indexUser].status}`)
      }
      const handleClickRoleUser=  (indexUser,row)=> async(event)=>{
    
        let updatedRole = [...rows];
        updatedRole[indexUser].role = !updatedRole[indexUser].role;
        setRows(updatedRole);
        const dataReceive = await UsersAPI.updateRole( `/updateUserRole?id=${row.iduser}&role=${rows[indexUser].role}`)
          }
    
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
            cursor:'pointer'
          }}
          gutterBottom
        >
          Admin dashboard
        </Typography>
      </Grid>
      <Paper sx={{ width: "100%", padding: "10px 25px 0 25px" }}>
        <EnhancedTableToolbar numSelected={selected.length} listVideo={selected} handleDeleteVideo={()=>handleDeleteVideo()} />
        <TableContainer>
          <Table
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={totalUser}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.iduser}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >

                      <TableCell
                      >
                {row.iduser}

                    </TableCell>

                    <TableCell sx={{width:"350px"}} align="left">{row.email}</TableCell>

                    <TableCell  align="left"><Moment format="yyyy-MM-DD">{row.datecreated}</Moment></TableCell>
                                        <TableCell align="left">
                    
                      <FormControlLabel control={<Switch   onChange={handleClickStatusUser(index,row)}   checked={row.status} />} label="Ban" />
                    </TableCell>
                    <TableCell align="left">
                    <FormControlLabel control={<Switch   onChange={handleClickRoleUser(index,row)} checked={row.role}   />} label="Admin"  />
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
          count={totalUser}
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
