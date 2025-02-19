'use client';
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography } from '@mui/material';
import { CiEdit } from 'react-icons/ci';
import { FiRefreshCcw } from 'react-icons/fi';
import { getUser } from '@/api/userApi';
import { IUser } from '@/types/use.type';

interface Column {
    id: 'id' | 'name' | 'role' | 'email' | 'balance' | 'action';
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: number) => string;
}

interface Data {
    id: string;
    name: string;
    role: string;
    email: string;
    balance: number;
    action: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function AccountManagement() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
    const handleOpen = (data: Data) => {
        setOpen(true);
        setDataInRow(data);
    };
    const handleClose = () => setOpen(false);
    const [dataInRow, setDataInRow] = React.useState<Data>({
        id: '',
        action: '',
        balance: 0,
        email: '',
        name: '',
        role: '',
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const columns: readonly Column[] = [
        { id: 'id', label: 'Id', minWidth: 170 },
        { id: 'name', label: 'Name', minWidth: 170 },
        { id: 'role', label: 'Role', minWidth: 100 },
        { id: 'email', label: 'Email', minWidth: 100 },
        {
            id: 'balance',
            label: 'Balance',
            minWidth: 170,
            align: 'right',
            format: (value: number) => value.toLocaleString('en-US'),
        },
        { id: 'action', label: 'Action', minWidth: 100 },
    ];

    // const rows: Data[] = [{ action: 'edit', balance: 0, email: '@', name: 'a', role: 'user' }];

    const [rows, setRows] = React.useState<Data[]>([]);

    const handleResetApi = async () => {
        const reponse = await getUser();
        if (reponse.status === 200) {
            var _userList: Data[] = [];
            reponse.data.map((user) => {
                _userList.push({
                    action: 'edit',
                    balance: user.balance,
                    email: user.email,
                    id: user._id,
                    name: user.name,
                    role: user.role,
                });
            });

            setRows(_userList);
        }
    };

    React.useEffect(() => {
        handleResetApi();
    }, []);

    return (
        <div className="w-full flex flex-col overflow-hidden gap-2">
            <div className="flex flex-row items-center justify-end m-3">
                <Button onClick={handleResetApi}>
                    <FiRefreshCcw className="cursor-pointer m-3 " />
                </Button>

                <TextField className="m-5" id="outlined-basic" label="Search" variant="outlined" />
            </div>

            <ModalComponent handleClose={handleClose} open={open} data={dataInRow} />

            <Paper sx={{ width: '100%', overflow: 'hidden', borderTop: 1 }}>
                <TableContainer sx={{ maxHeight: 300 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.email}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {value === 'edit' ? (
                                                        <CiEdit
                                                            className="text-2xl text-black cursor-pointer"
                                                            onClick={() =>
                                                                handleOpen({
                                                                    id: row.id,
                                                                    action: row.action,
                                                                    balance: row.balance,
                                                                    email: row.email,
                                                                    name: row.name,
                                                                    role: row.role,
                                                                })
                                                            }
                                                        />
                                                    ) : column.format && typeof value === 'number' ? (
                                                        column.format(value)
                                                    ) : (
                                                        value
                                                    )}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    );
}

interface ModalComponentProps {
    open: boolean;
    handleClose: () => void;
    data: Data;
}

const ModalComponent = ({ handleClose, open, data }: ModalComponentProps) => {
    const [role, setRole] = React.useState(data.role);
    React.useEffect(() => {
        setRole(data.role);
    }, [open]);
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Thông tin đăng ký của các tài khoản
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    Bạn có thể điều chỉnh tùy thích
                </Typography>
                <div className="mt-5 flex flex-col">
                    <div className="flex flex-col gap-4">
                        <TextField id="name" label="Name" variant="outlined" value={data.name} />
                        <FormControl fullWidth>
                            <InputLabel id="role-label">Role</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                value={role}
                                label="Role"
                                onChange={(e) => setRole(e.target.value)}
                            >
                                <MenuItem value={'user'}>User</MenuItem>
                                <MenuItem value={'seller'}>Seller</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField id="email" label="Email" variant="outlined" value={data.email} />
                        <TextField id="balance" label="Balance" variant="outlined" value={data.balance} />
                    </div>
                    <div className="flex justify-end mt-3 gap-3">
                        <Button variant="contained" onClick={handleClose}>
                            Save
                        </Button>
                        <Button variant="contained" onClick={handleClose}>
                            Delete
                        </Button>
                    </div>
                </div>
            </Box>
        </Modal>
    );
};
