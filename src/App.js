import './App.css';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'

import Navbar from './components/Navbar';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Shop from './pages/Shop';
import TaskUpdate from './pages/TaskUpdate';
import LeisureUpdate from './pages/LeisureUpdate';
import NotFound from './pages/NotFound';
import ScrollToTop from './components/ScrollToTop';

function App() {

  const getToken = () => {
    return localStorage.getItem("authToken")
  }

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div className="App">
      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path='*' element={<NotFound />}/>

        <Route element={<LoggedIn />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/task-update/:taskId" element={<TaskUpdate />} />
          <Route path="/leisure-update/:leisureId" element={<LeisureUpdate />} />
        </Route>

        <Route element={<NotLoggedIn />}>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Route>

      </Routes>
      <ScrollToTop />
    </div>
  );
}

export default App;
