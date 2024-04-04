import React, { useEffect} from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import CreateUser from './components/CreateUser';
import Header from './components/Header';
import Login from './components/Login';
import Signup from './components/Signup';
import PageNotFound from './components/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Protected from './components/Protected'; // Import the Protected component

function App() {
  const [showHeader, setShowHeader] = React.useState(false);

  const checkLogin = (val) => {
    setShowHeader(val);
  };

  useEffect(() => {
    let login = localStorage.getItem('login');
    setShowHeader(!!login);
  }, []);

  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <BrowserRouter>
        {showHeader && <Header checkLogin={checkLogin} />}
        <Routes>
          <Route path="/home" element={<Protected Component={Home} />} />
          <Route path="/createUser" element={<Protected Component={CreateUser} />} />
          <Route path="/createUser/:id" element={<Protected Component={CreateUser} />} />
          <Route path="/" element={<Login checkLogin={checkLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<Protected Component={PageNotFound} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
