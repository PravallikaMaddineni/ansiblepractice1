import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Box,
  Snackbar,
  Alert,
  MenuItem
} from "@mui/material";

const GoalManager = () => {
  const [goals, setGoals] = useState([]);
  const [goal, setGoal] = useState({
    id: "",
    title: "",
    description: "",
    category: "",
    status: ""
  });
  const [message, setMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [open, setOpen] = useState(false);

  const baseUrl = `${import.meta.env.VITE_API_URL}/goal`; // <-- from .env

  useEffect(() => {
    fetchAllGoals();
  }, []);

  const fetchAllGoals = async () => {
    try {
      const res = await axios.get(`${baseUrl}/viewall`);
      setGoals(res.data);
    } catch (error) {
      showMessage("Failed to fetch goals.", "error");
    }
  };

  const handleChange = (e) => {
    setGoal({ ...goal, [e.target.name]: e.target.value });
  };

  const addGoal = async () => {
    try {
      await axios.post(`${baseUrl}/addgoal`, goal);
      showMessage("Goal added successfully!", "success");
      fetchAllGoals();
      resetForm();
    } catch (error) {
      showMessage("Error adding goal.", "error");
    }
  };

  const deleteGoal = async (id) => {
    try {
      const res = await axios.delete(`${baseUrl}/delete/${id}`);
      showMessage(res.data || "Goal deleted successfully!", "success");
      fetchAllGoals();
    } catch (error) {
      showMessage("Error deleting goal.", "error");
    }
  };

  const resetForm = () => {
    setGoal({
      id: "",
      title: "",
      description: "",
      category: "",
      status: ""
    });
  };

  const showMessage = (msg, type) => {
    setMessage(msg);
    setAlertType(type);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 5,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e3eeff 100%)",
        borderRadius: "16px",
        p: 4,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
        animation: "fadeIn 0.8s ease-in-out"
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{
          fontWeight: 700,
          color: "#3b3b98",
          letterSpacing: "1px",
          textShadow: "0 2px 6px rgba(59, 59, 152, 0.2)"
        }}
      >
        🎯 Goal Management
      </Typography>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: "18px",
          background: "#ffffffaa",
          backdropFilter: "blur(10px)",
          transition: "all 0.2s ease",
          "&:hover": { transform: "translateY(-3px)" }
        }}
      >
        <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
          <TextField
            label="Title"
            name="title"
            value={goal.title}
            onChange={handleChange}
            fullWidth
            sx={{ background: "#fff", borderRadius: "10px" }}
          />
          <TextField
            label="Category"
            name="category"
            value={goal.category}
            onChange={handleChange}
            fullWidth
            sx={{ background: "#fff", borderRadius: "10px" }}
          />
          <TextField
            label="Description"
            name="description"
            value={goal.description}
            onChange={handleChange}
            fullWidth
            multiline
            sx={{ background: "#fff", borderRadius: "10px" }}
          />
          <TextField
            select
            label="Status"
            name="status"
            value={goal.status}
            onChange={handleChange}
            fullWidth
            sx={{ background: "#fff", borderRadius: "10px" }}
          >
            <MenuItem value="">Select Status</MenuItem>
            <MenuItem value="PENDING">Pending</MenuItem>
            <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
            <MenuItem value="COMPLETED">Completed</MenuItem>
          </TextField>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} mt={3}>
          <Button
            variant="contained"
            color="primary"
            onClick={addGoal}
            sx={{
              backgroundColor: "#3b3b98",
              boxShadow: "0 3px 6px rgba(59, 59, 152, 0.3)",
              "&:hover": {
                backgroundColor: "#2c2c7a",
                transform: "scale(1.03)"
              }
            }}
          >
            Add Goal
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={resetForm}
            sx={{
              borderColor: "#3b3b98",
              color: "#3b3b98",
              "&:hover": { backgroundColor: "#f8f9ff" }
            }}
          >
            Reset
          </Button>
        </Box>
      </Paper>

      <Paper
        elevation={4}
        sx={{
          p: 3,
          borderRadius: "18px",
          background: "#ffffffaa",
          backdropFilter: "blur(10px)"
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{ color: "#3b3b98", fontWeight: 600 }}
        >
          🗂️ All Goals
        </Typography>

        {goals.length === 0 ? (
          <Typography align="center" color="text.secondary">
            No goals found.
          </Typography>
        ) : (
          <Table
            sx={{
              borderCollapse: "separate",
              borderSpacing: "0 8px"
            }}
          >
            <TableHead>
              <TableRow>
                {["ID", "Title", "Category", "Status", "Actions"].map((head) => (
                  <TableCell
                    key={head}
                    sx={{
                      fontWeight: "bold",
                      backgroundColor: "#f1f3ff",
                      borderRadius: "8px"
                    }}
                  >
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {goals.map((g) => (
                <TableRow
                  key={g.id}
                  sx={{
                    "&:hover td": {
                      backgroundColor: "#eef3ff",
                      transition: "0.3s"
                    }
                  }}
                >
                  <TableCell>{g.id}</TableCell>
                  <TableCell>{g.title}</TableCell>
                  <TableCell>{g.category}</TableCell>
                  <TableCell>{g.status}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteGoal(g.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Paper>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{
            width: "100%",
            fontWeight: 500,
            borderRadius: "10px"
          }}
        >
          {message}
        </Alert>
      </Snackbar>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Container>
  );
};

export default GoalManager;
