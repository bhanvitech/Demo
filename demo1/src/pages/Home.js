import React, { useState } from "react";
import "./style.css";
import {
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from "@mui/material";
import useFetch from "../hooks/useFetchUsers";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AddIcon from "@mui/icons-material/Add";
import { api } from "../services/api";

const Home = () => {
  const { data, loading, error, setData } = useFetch("/users");
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    number: "",
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Handle Edit action
  const handleEdit = (user) => {
    setEditUser(user);
    setOpenEditDialog(true);
  };

  // Handle Delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`); // API call to delete user
      setData((prevData) => prevData.filter((user) => user.id !== id)); // Remove from state
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  // Handle Save Edit
  const handleSaveEdit = async () => {
    try {
      const updatedUser = await api.put(`/users/${editUser.id}`, editUser); // API call to update user
      setData((prevData) =>
        prevData.map((user) =>
          user.id === updatedUser.data.id ? updatedUser.data : user
        )
      );
      setOpenEditDialog(false);
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  // Handle Add User action
  const handleAddUser = async () => {
    try {
      const newUserResponse = await api.post("/users", newUser); // API call to add new user
      setData((prevData) => [...prevData, newUserResponse.data]); // Add to state
      setOpenAddDialog(false);
      setNewUser({ name: "", email: "", number: "" }); // Clear form
    } catch (error) {
      console.error("Failed to add user", error);
    }
  };

  return (
    <div className="container">
      <h1>Home</h1>
      <Paper elevation={3} className="paper">
        {/* Add User Button */}
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddDialog(true)}
          style={{ position: "absolute", top: "20px", right: "20px" }}
        >
          Add User
        </Button>
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.length > 0 &&
              data.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.number}</td>
                  <td>
                    <div>
                      <IconButton>
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton onClick={() => handleDelete(user.id)}>
                        <DeleteIcon />
                      </IconButton>
                      <IconButton onClick={() => handleEdit(user)}>
                        <EditIcon />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Paper>

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={editUser?.name || ""}
            onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={editUser?.email || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, email: e.target.value })
            }
            margin="normal"
          />
          <TextField
            label="Number"
            fullWidth
            value={editUser?.number || ""}
            onChange={(e) =>
              setEditUser({ ...editUser, number: e.target.value })
            }
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSaveEdit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      {/* Add User Dialog */}
      <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
        <DialogTitle>Add New User</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Email"
            fullWidth
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            margin="normal"
          />
          <TextField
            label="Number"
            fullWidth
            value={newUser.number}
            onChange={(e) => setNewUser({ ...newUser, number: e.target.value })}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddUser} color="primary">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Home;
