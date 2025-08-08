import axios from 'axios';
import { Task } from './types'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Checkbox, CircularProgress, Container, Stack, Typography } from '@mui/material';
import AddTaskForm from './components/AddTaskForm';
import TaskItem from './components/TaskItem';

const App: React.FC = () => {
  const[tasks, setTasks] = useState<Task[]>([]);
  const[loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    axios
    .get<Task[]>('http://localhost:8000/tasks')
    .then((response) => setTasks(response.data))
    .catch((error) => console.error('Error fetching tasks:', error))
    .finally(() => setLoading(false));
  }, []);
  return (
    <Container maxWidth="sm" sx={{ marginTop: 4}}>
      <Typography variant="h4" gutterBottom>
        📝Task Manager
      </Typography>
      <AddTaskForm onTaskAdded={(task) => setTasks((prev) => [...prev, task])} />
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <TaskItem 
              key = {task.id}
              task={task}
              onTaskDeleted={(id) => setTasks((prev) => prev.filter((t) => t.id !== id))}
            />
          ))}
        </Stack>
      )}

    </Container>
  );
};

export default App;