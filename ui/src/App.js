import './App.css';
import React, { useEffect } from 'react';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard'
import CreateProfile from './components/profile-forms/CreateProfile';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute'
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
//import for toaster
import { ToastContainer } from 'react-toastify';

// Import related to redux store
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser())
  }, []);
  return (
    <Provider store={store}>
      <BrowserRouter>

        <NavBar />
        <Alert />
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/dashboard' element={<PrivateRoute component={Dashboard} />} />
          <Route exact path='/create-profile' element={<PrivateRoute component={CreateProfile} />} />
          <Route exact path='/edit-profile' element={<PrivateRoute component={EditProfile} />} />
          <Route exact path='/add-experience' element={<PrivateRoute component={AddExperience} />} />
          <Route exact path='/add-education' element={<PrivateRoute component={AddEducation} />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
