import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './TaskForm';
import TaskDetail from './TaskDetail';
import TaskList from './TaskList';
import LoginPage from './LoginPage';


function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<TaskList />} />
          <Route path="/tasks/new" element={<TaskForm />} />
          <Route path="/tasks/:taskId/edit" element={<TaskForm />} />
          <Route path="/add" element={<TaskForm />} />
          <Route path="/edit/:taskId" element={<TaskForm />} />
          <Route path="/task/:taskId" element={<TaskDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
