import React from 'react';
import UsersList from './pages/UserList';
import { Routes, Route } from 'react-router-dom';
import '@progress/kendo-theme-material/dist/all.css';
import User from './pages/user';
const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <UsersList />
            </>
          }
        />
        <Route
          path="/user/:id"
          element={
            <>
              <User />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default App;
