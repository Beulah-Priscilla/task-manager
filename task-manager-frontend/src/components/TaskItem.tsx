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
  return(
    <Card>
      <CardContent>
        <Checkbox></Checkbox>
        <Typography></Typography>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default TaskItem;