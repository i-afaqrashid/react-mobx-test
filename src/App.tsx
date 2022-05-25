import React from 'react';
import UsersList from './pages/UserList';
import { Routes, Route } from 'react-router-dom';
import '@progress/kendo-theme-material/dist/all.css';
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
      </Routes>
    </>
  );
};

export default App;
