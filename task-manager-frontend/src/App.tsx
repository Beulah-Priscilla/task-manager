import axios from 'axios';

import { Task } from './types'
import React, { useEffect, useState } from 'react';
import { Card, CardContent, Checkbox, CircularProgress, Container, Stack, Typography } from '@mui/material';

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
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack spacing={2}>
          {tasks.map((task) => (
            <Card key={task.id}>
              <CardContent sx={{ display: 'flex', alignItems: 'Center'}}>
                <Checkbox checked={task.completed} />
                <Typography variant="body1">{task.title}</Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

    </Container>
  );
};

export default App;