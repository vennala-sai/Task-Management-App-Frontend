import React, { useState, useEffect } from 'react';
import TaskService from './TaskService';
import { useNavigate, Link } from 'react-router-dom';
import './TaskList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';

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
    navigate('/login'); // Redirect to the login page
  };

  if (loading) {
    return <div className="loader">Loading tasks...</div>;
  }

  return (
    <div className="task-list-container">
      <h1 className="task-list-title">Tasks</h1>
      <div className="task-list-header">
        <div className="left">
          <Link to="/tasks/new" className="btn-create-new">
            + New Task
          </Link>
        </div>
        <div className="right">
          <button onClick={handleLogout} className="btn-create-new">
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </div>
      </div>

      {tasks.length > 0 ? (
        <div className="task-list-table-container">
          <table className="task-list-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(task => (
                <tr key={task.id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>{task.dueDate ? format(new Date(task.dueDate), 'PPP') : 'N/A'}</td>
                  <td>{task.status}</td>
                  <td className="task-list-actions">
                    <Link to={`/tasks/${task.id}/edit`} className="btn btn-edit">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(task.id)} className="btn btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="task-list-empty">No tasks found.</div>
      )}
    </div>
  );
}

export default TaskList;
