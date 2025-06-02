// client/src/components/TaskCard.js
import React from 'react';

const TaskCard = ({ task, onEdit, onDelete }) => {
  return (
    <div style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <button onClick={() => onEdit(task)}>✏️ Edit</button>
      <button onClick={() => onDelete(task._id)}>🗑️ Delete</button>
    </div>
  );
};

export default TaskCard;
