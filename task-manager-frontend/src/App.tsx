import axios from 'axios';

import { Task } from './types'
import React, { useState } from 'react';
import { Container } from '@mui/material';

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

</Container>
  );
};

export default App;