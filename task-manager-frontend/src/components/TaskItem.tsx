import React from 'react';
import axios from 'axios';
import { Card, CardContent, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (id: number) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/tasks/${task.id}`)
      .then(() => {
        onTaskDeleted(task.id)
      })
      .catch((error) => console.log('Error deleting task', error));
  };
  return(
    <Card>
      <CardContent>
        <Checkbox checked={task.completed} />
        <Typography>{task.title}</Typography>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default TaskItem;