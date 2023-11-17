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
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { visuallyHidden } from "@mui/utils";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import { Alert, Button, TextField } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import CategoryAPI from "../../utils/CategoryAPI";

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
    ? (a, b) => {
        if (typeof a[orderBy] === 'string') {
          // String comparison for 'name' field
          return b[orderBy].localeCompare(a[orderBy]);
        } else {
          // Numeric comparison for other fields
          return b[orderBy] - a[orderBy];
        }
      }
    : (a, b) => {
        if (typeof a[orderBy] === 'string') {
          // String comparison for 'name' field
          return a[orderBy].localeCompare(b[orderBy]);
        } else {
          // Numeric comparison for other fields
          return a[orderBy] - b[orderBy];
        }
      };
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
    id: "idcategory",
    // numeric: true,
    // disablePadding: false,
    label: "Id ",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
  },
  {
    id: "",
    numeric: false,
    disablePadding: false,
    label: "",
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

export default function CategoryManager() {
  const handleChange = (event) => {
    const { name, value } = event.target;
    setDataCategory((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    titleError: "Something is wrong ",
    typeError:"error"
  });
  const [dataCategory, setDataCategory] = useState("");

  const { vertical, horizontal, open, titleError,typeError } = state;


  useEffect(() => {}, [dataCategory]);
  function EnhancedTableToolbar(props) {
    const { numSelected } = props;

    return (
      <>
        <Box component="form" noValidate sx={{ mt: 3 }}>
          <Box sx={{ width: 500 }}>
            <Snackbar
              sx={{ marginTop: "5%" }}
              anchorOrigin={{ vertical, horizontal }}
              open={open}
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
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={2}>
              <TextField
                disabled
                id="outlined-disabled"
                label="Id Category"
                defaultValue={dataCategory.idcategory}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                id="name"
                defaultValue={dataCategory.name}
                name="name"
                onChange={handleChange}
                autoFocus
                value={dataCategory.email}
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
            <Grid item xs={12} sm={2}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                onClick={(event) => handleSubmit("add")(event)}
                sx={{ mt: 1, mb: 1 }}
              >
                Add
              </Button>
            </Grid>
          </Grid>
        </Box>

     
      </>
    );
  }

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("idcategory");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [rows, setRows] = useState([]);
  const [totalCategory, setTotalCategory] = useState(0);
  const fetchDataCategory = async () => {
    const data = await CategoryAPI.getAll(`/getallcate`);
    setTotalCategory(data.data.length);
    setRows(data.data);
    console.log("vao", data.data);
  };

  useEffect(() => {
    if (!open) {
      fetchDataCategory();
    }
    fetchDataCategory();
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
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - totalCategory) : 0;

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [totalCategory, order, orderBy, page, rowsPerPage,rows]
  );

  const handleClickEdit = (row) => {
    setDataCategory(row);
  };

  

  const handleClickStatusCategory = (indexUser, row) => async (event) => {
    let updatedStatus = [...visibleRows];
    updatedStatus[indexUser].status = !updatedStatus[indexUser].status;
    setRows(updatedStatus);
    const dataReceive = await CategoryAPI.updateStatus(
      `/updateCategoryStatus?id=${row.idcategory}&status=${row.status}`
    );
  };
  const handleSubmit = (actionType) => async (event) => {
    event.preventDefault();
    if (actionType === "update") {
      if (
        dataCategory.idcategory === null ||
        dataCategory.idcategory === undefined
      ) {
        setState({
          ...state,
          open: true,
          titleError: "No data Category",
          typeError:"error"
        });
      } else {
        // setDataCategory(dataCategory,name:)
        let jsondata=JSON.stringify(dataCategory)
        const data = await CategoryAPI.updateCategory(`/updateCategory`,jsondata);

        const updatedCategory = visibleRows.map((row) =>
        row.idcategory   === dataCategory.idcategory ? { ...row, name:dataCategory.name  } : row
      );
      setRows(updatedCategory);
      setState({
        ...state,
        open: true,
        titleError: "Update success",
        typeError:"success"
      });
      }
    } else if (actionType === "reset") {
      setDataCategory("");
    } else if (actionType === "add") {
      console.log(dataCategory);
      if (dataCategory.idcategory === undefined) {
        const data = await CategoryAPI.addCategory(`/addCategory?category=${dataCategory.name}`);
        setRows(rows.concat(data));
        setState({
          ...state,
          open: true,
          titleError: "Add success",
          typeError:"success"
        });
      } else {
        setState({
          ...state,
          open: true,
          titleError: "Click reset to add a new Category",
          typeError:"error"
        });
      }
    }
  };
  
  return (
    <Box sx={{ width: "100%" }}>
      <Grid item xs>
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
              rowCount={totalCategory}
            />
            <TableBody>
              {visibleRows?.map((row, index) => {
                const isItemSelected = isSelected(row);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    tabIndex={-1}
                    key={row.idcategory}
                    selected={isItemSelected}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell sx={{ width: "30%" }}>
                      {row.idcategory}
                    </TableCell>
                    <TableCell sx={{ width: "35%" }} align="left">
                      {row.name}
                    </TableCell>

                    <TableCell sx={{ width: "45%" }} align="left">
                      <FormControlLabel
                        control={
                          <Switch
                            onChange={handleClickStatusCategory(index, row)}
                            checked={row.status}
                          />
                        }
                        label="Deleted"
                      />
                    </TableCell>
                    <TableCell sx={{ width: "35%" }} align="left">
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
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalCategory}
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
