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
    <Container>
      <Typography>
        📝Task Manager
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Stack>
          {tasks.map((task) => (
            <Card>
              <CardContent >
                <Checkbox />
                <Typography></Typography>
              </CardContent>
            </Card>
          ))}
        </Stack>
      )}

    </Container>
  );
};

export default App;