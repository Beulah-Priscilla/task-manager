import React from 'react';
import axios from 'axios';
import { Task } from '../types';
import { Box } from '@mui/material';

interface AddTaskFormProps {
  onTaskAdded: (task: Task) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ onTaskAdded }) => {
  return (
    <Box>

    </Box>
  )
}

export default AddTaskForm;

