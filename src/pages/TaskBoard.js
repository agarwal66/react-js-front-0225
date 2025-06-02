// client/src/pages/TaskBoard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import './TaskBoard.css';
const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    fetchTasks();
    fetchProfileImage();
  }, []);

  const fetchTasks = () => {
    axios.get(process.env.REACT_APP_API_URL + '/tasks')
      .then(res => setTasks(res.data))
      .catch(err => console.error(err));
  };

  const fetchProfileImage = () => {
    const id = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/id/${id}/info`)
      .then(res => res.json())
      .then(data => setProfileImage(data.download_url));
  };

 const handleAddOrUpdate = async (task) => {
  try {
    if (task._id) {
      await axios.put(`${process.env.REACT_APP_API_URL}/tasks/${task._id}`, task);
    } else {
      await axios.post(`${process.env.REACT_APP_API_URL}/tasks`, task);
    }
    setSelectedTask(null);
    fetchTasks(); // ✅ Make sure this is called after add/update
  } catch (error) {
    console.error('Error saving task:', error);
  }
};

  const handleDelete = async (id) => {
    await axios.delete(process.env.REACT_APP_API_URL + `/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', textAlign: 'center' }}>
      <h1>Task Board</h1>
      {profileImage && <img src={profileImage} alt="Profile" width={100} style={{ borderRadius: '50%' }} />}
      <TaskForm onSubmit={handleAddOrUpdate} selectedTask={selectedTask} onCancel={() => setSelectedTask(null)} />
      {tasks.length === 0 ? <p>No tasks yet</p> : tasks.map(task => (
        <TaskCard key={task._id} task={task} onEdit={setSelectedTask} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TaskBoard;
