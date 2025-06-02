import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskBoard from './pages/TaskBoard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskBoard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
