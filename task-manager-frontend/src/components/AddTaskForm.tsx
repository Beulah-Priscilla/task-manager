import React, { useState } from 'react';
import axios from 'axios';
import { Task } from '../types';
import { Box, Button, TextField } from '@mui/material';

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  const [newTask, setNewTask] = useState<string>("");

  const handleAddTask = () => {
    if (!newTask.trim()) return;

    axios
      .post<Task>('http://localhost:8000/tasks', {
        title: newTask,
        completed: false,
      })
      .then((response) => {
        onTaskAdded(response.data);
        setNewTask("");
      })
      .catch((error) => console.log('Error adding task', error));
  };

  return (
    <Box display="flex" gap={2} mb={4}>
      <TextField
      fullWidth
        label="New Task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      <Button variant="contained" onClick={handleAddTask}>
        Add
      </Button>
    </Box>
  )
}

export default AddTaskForm;

