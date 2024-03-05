import React, { useState, useEffect } from 'react';
import TaskService from './TaskService';
import { useNavigate, Link } from 'react-router-dom';
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faSignOutAlt, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

function TaskCard({ task, handleDelete }) {
  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'task-card-status-completed';
      case 'in progress': return 'task-card-status-in-progress';
      case 'pending': return 'task-card-status-pending';
      default: return '';
    }
  };

  return (
    <div className="task-card">
      <h3 className="task-card-title">{task.title}</h3>
      <p className="task-card-description">{task.description}</p>
      <p className="task-card-due-date">
      <strong>Due Date:</strong> {task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}
      </p>
      <p className={`task-card-status ${getStatusStyle(task.status)}`}>
        {task.status}
      </p>
      <div className="task-card-actions">
        <Link to={`/tasks/${task.id}/edit`} className="btn btn-edit">
          <FontAwesomeIcon icon={faEdit} /> Edit
        </Link>
        <button onClick={() => handleDelete(task.id)} className="btn btn-delete">
          <FontAwesomeIcon icon={faTrashAlt} /> Delete
        </button>
      </div>
    </div>
  );
}

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    TaskService.getAllTasks()
      .then(response => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks', error);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (taskId) => {
    try {
      await TaskService.deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  if (loading) {
    return <div className="loader">Loading tasks...</div>;
  }
  return (
    <div className="task-list-container">
      <div className="task-list-header">
        <h1 className="task-list-title">My Tasks</h1>
        <div className="task-list-controls">
          <Link to="/tasks/new" className="btn-create-new">
          <FontAwesomeIcon icon={faPlusCircle} /> New Task
          </Link>
          <button onClick={handleLogout} className="btn-logout">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>

      <div className="task-list-content">
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskCard key={task.id} task={task} handleDelete={handleDelete} />
          ))
        ) : (
          <div className="task-list-empty">No tasks found.</div>
        )}
      </div>
    </div>
  );
}

export default TaskList;



