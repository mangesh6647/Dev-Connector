import './App.css';
import React from 'react';
import NavBar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import related to redux store
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <React.Fragment>
          <NavBar />
          <Routes>
            <Route exact path='/' element={<Landing />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
          </Routes>

        </React.Fragment>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
