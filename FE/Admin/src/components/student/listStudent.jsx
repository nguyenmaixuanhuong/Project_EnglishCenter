import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import TablePagination from '@mui/material/TablePagination';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import './listStudent.style.scss'
import { Link } from 'react-router-dom';
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
                    {row.account.username}
                </TableCell>
                <TableCell align="center">{row.fullName}</TableCell>
                <TableCell align="center">{row.birthDay}</TableCell>
                <TableCell align="center">{row.phoneNumber}</TableCell>
                <TableCell align="center">{row.address}</TableCell>
                <TableCell align="center"><Link to={`/updatestudent/${row._id}`}>
                    <Tooltip title="Cập nhật">
                        <IconButton>
                            <EditIcon/>
                        </IconButton>
                    </Tooltip>
                </Link></TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Lớp học
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Tên Lớp</TableCell>
                                        <TableCell align="center">Thời gian bắt đầu</TableCell>
                                        <TableCell align="center">Thời gian kết thúc</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.class.map((historyRow) => (
                                        <TableRow key={historyRow.className}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.className}
                                            </TableCell>
                                            <TableCell align="center">{historyRow.startDay}</TableCell>
                                            <TableCell align="center">
                                                {historyRow.finishDay}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment >
    );
}

export default function ListStudent(props) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell>Mã Học Viên</TableCell>
                        <TableCell align="center">Tên Học Viên</TableCell>
                        <TableCell align="center">Ngày Sinh</TableCell>
                        <TableCell align="center">Số Điện Thoại</TableCell>
                        <TableCell align="center">Địa Chỉ</TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.students.map((row) => (
                        <Row key={row._id} row={row} />
                    ))}
                </TableBody>
            </Table>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={props.students.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>

    );
}