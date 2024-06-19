import { Box, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getUsers, deleteUser } from "../../API/api";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    fetchData();
  }, [selectedUserId]);

  const fetchData = async () => {
    try {
      const data = await getUsers();
      // Assume the API returns data with 'email' as a unique identifier
      const formattedData = data.map((user, index) => ({
        ...user,
        id: index + 1, // Example: generate a unique id (replace with your logic)
      }));
      setUsers(formattedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setSelectedUserId(id);
    console.log(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUserId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUserId !== null) {
      try {
        await deleteUser(selectedUserId);
        await fetchData(); // Fetch lại danh sách người dùng sau khi xóa
        handleClose();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const columns = [
    { field: "user_id", headerName: "ID", width: 100 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "phone", headerName: "Phone Number", flex: 1 },
    { field: "gender", headerName: "Gender", flex: 1 },
    { field: "address", headerName: "Address", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <IconButton onClick={() => handleDeleteClick(params.row.user_id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="USER" subtitle="Danh sách các User" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid
          checkboxSelection
          rows={users}
          columns={columns}
          getRowId={(row) => row.id} // Example: Use 'email' as unique identifier
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Xác nhận xóa</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn có chắc chắn muốn xóa người dùng này không?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Không
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Có
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;
