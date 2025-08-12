import React from 'react';
import axios from 'axios';
import { Card, CardContent, Checkbox, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete'
import { Task } from '../types';

interface TaskItemProps {
  task: Task;
  onTaskDeleted: (id: number) => void;
  onTaskUpdated: (updatedTask: Task) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskDeleted, onTaskUpdated }) => {
  const handleDelete = () => {
    axios
      .delete(`http://localhost:8000/tasks/${task.id}`)
      .then(() => {
        onTaskDeleted(task.id);
      })
      .catch((error) => console.log('Error deleting task', error));
  };

  const handleToggleComplete = () => {
    axios
    .patch(`http://localhost:8000/tasks/${task.id}?completed=${!task.completed}`)
    .then((response) => {
      console.log('Task updated', response.data);
      onTaskUpdated(response.data);
    })
    .catch((error) => console.error('Error updating task:', error));
  };
  
  return(
    <Card>
      <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Checkbox checked={task.completed} onChange={handleToggleComplete} />
          <Typography variant="body1">{task.title}</Typography>
        </div>
        <IconButton onClick={handleDelete} color="error">
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default TaskItem;