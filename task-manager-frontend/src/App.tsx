import axios from 'axios';

import { Task } from './types'
import React, { useState } from 'react';
import { Container } from '@mui/material';

const App: React.FC = () => {
  const[tasks, setTasks] = useState<Task[]>([]);
  const[loading, setLoading] = useState<boolean>(true);
  return (
<Container>
  
</Container>
  );
};

export default App;