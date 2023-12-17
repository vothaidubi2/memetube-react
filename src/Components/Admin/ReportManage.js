import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ReportAPI from "../../utils/ReportAPI";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
export default function ReportManage() {
    const [rows, setRow] = useState([])

    const fetchDataComment = async () => {
        const data = await ReportAPI.getAll('/getlistreportcmt')
        setRow(data.data)
    }
    const fetchDataVideo = async () => {
        const data = await ReportAPI.getAll('/getlistreportvideo')
        setRow(data.data)
    }

    const deleteReport = async (id) => {
        await ReportAPI.deleteReport(`/deletereport?id=${id}`)
        fetchDataComment()
    }
    const completeCommentReport = async (idcomment) => {
        await ReportAPI.deleteReport(`/completecommentreport?idcomment=${idcomment}`)
        fetchDataComment()
    }
    const completeVideoReport = async (idvideo) => {
        await ReportAPI.deleteVideoReport(`/completevideoreport?idvideo=${idvideo}`)
        fetchDataComment()
    }

    useEffect(() => {
        fetchDataComment()
    }, [])

    function Row(props) {
        const { row } = props;
        const [open, setOpen] = React.useState(false);

        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                    <TableCell>
                        <IconButton
                            aria-label="expand row"
                            size="small"
                            onClick={() => setOpen(!open)}
                        >
                            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </IconButton>
                    </TableCell>
                    <TableCell component="th" scope="row">
                        {row.idreport}
                    </TableCell>
                    {row.comment != null && <TableCell align="right">{row.comment.contents}</TableCell>}
                    {row.video != null && <TableCell align="right">{row.video.title}</TableCell>}
                    {!row.status ? <TableCell align="right">Pending</TableCell> : <TableCell align="right">Done</TableCell>}
                    <TableCell align="right">
                        <Box>
                            {row.comment != null && <IconButton onClick={() => completeCommentReport(row.comment.idcomment)}>
                                <CheckIcon color="success" />
                            </IconButton>}
                            {row.video != null && <IconButton onClick={() => completeVideoReport(row.video.idvideo)}>
                                <CheckIcon color="success" />
                            </IconButton>}
                            {row.comment != null && <IconButton onClick={() => deleteReport(row.idreport)}>
                                <CloseIcon color="error" />
                            </IconButton>}
                            {row.video != null && <IconButton onClick={() => deleteReport(row.idreport)}>
                                <CloseIcon color="error" />
                            </IconButton>}
                        </Box>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 1 }}>
                                <Typography variant="h6" gutterBottom component="div">
                                    Detail
                                </Typography>
                                <Table size="small" aria-label="purchases">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Reason</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableCell component="th" scope="row">
                                            {row.content}
                                        </TableCell>
                                    </TableBody>
                                </Table>
                            </Box>
                        </Collapse>
                    </TableCell>
                </TableRow>
            </React.Fragment>
        );
    }

    Row.propTypes = {
        row: PropTypes.shape({
            id: PropTypes.number.isRequired,
            iduser: PropTypes.number.isRequired,
            history: PropTypes.arrayOf(
                PropTypes.shape({
                    amount: PropTypes.number.isRequired,
                    customerId: PropTypes.string.isRequired,
                    date: PropTypes.string.isRequired,
                }),
            ).isRequired,
        }).isRequired,
    };

    function CollapsibleTable({ data }) {
        return (
            <Paper sx={{ width: "100%", padding: "10px 25px 0 25px" }}>
                <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>ID</TableCell>
                                <TableCell align="right">{data}</TableCell>
                                <TableCell align="right">Status</TableCell>
                                <TableCell align="right">Option</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <Row key={row.name} row={row} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        );
    }
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

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function BasicTabs() {
        const [value, setValue] = React.useState(0);

        const handleChange = (newValue) => {
            if (newValue == 0) {
                fetchDataComment()
            }
            if (newValue == 1) {
                fetchDataVideo()
            }
        };
        const handleChangeBase = (event, newValue) => {
            setValue(newValue);
        };

        return (
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChangeBase} aria-label="basic tabs example">
                        <Tab label="Comment" {...a11yProps(0)} onClick={() => handleChange(0)} />
                        <Tab label="Video" {...a11yProps(1)} onClick={() => handleChange(1)} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <CollapsibleTable data={'Comment'} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <CollapsibleTable data={'Video'} />
                </CustomTabPanel>
            </Box>
        );
    }
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
            <BasicTabs />
        </Box>
    )
}
