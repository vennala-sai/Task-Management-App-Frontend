import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskService from './TaskService';
import './TaskForm.css';

function TaskForm() {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const [taskData, setTaskData] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: '',
    completed: false,
  });

  useEffect(() => {
    let isMounted = true; // flag to track whether the component is mounted
    if (taskId) {
      TaskService.getTaskById(taskId)
        .then(response => {
          if (isMounted) { // only update state if component is still mounted
            const { title, description, status, dueDate, completed } = response.data;
            setTaskData({
              title,
              description,
              status,
              dueDate: dueDate ? dueDate : '',
              completed,
            });
          }
        })
        .catch(error => console.error(error));
    }
    return () => { isMounted = false }; // cleanup function to set the flag to false
  }, [taskId]); // TaskService is not included because it's assumed to be a static import

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = { ...taskData, completed: taskData.completed ? true : false };
      if (taskId) {
        await TaskService.updateTask(taskId, formData);
      } else {
        await TaskService.createTask(formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Failed to save task:', error);
      // Optionally handle the error (e.g., show an error message to the user)
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setTaskData(prevTaskData => ({
      ...prevTaskData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  return (
    <div className="form-container">
      <button onClick={() => navigate(-1)} className="back-button">
        &#8592; Back
      </button>
      <form onSubmit={handleSubmit} className="task-form">
        <h2>{taskId ? 'Update Task' : 'Create Task'}</h2>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          value={taskData.title}
          onChange={handleChange}
          required
        />
        
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={taskData.description}
          onChange={handleChange}
        />

        <label htmlFor="status">Status</label>
        <select
          id="status"
          name="status"
          value={taskData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select a status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <label htmlFor="dueDate" className='dueDate-ts'>Due Date</label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          value={taskData.dueDate}
          onChange={handleChange}
        />

        <button type="submit">
          Save Task
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
