// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AdminDashboard from './Pages/AdminDashboard';
import AdminAddTrip from './Pages/AdminAddTrip';
import DeleteTrip from './Pages/DeleteTrip';
import ManageOperators from './Pages/ManageOperators';
import DeleteUsers from './Pages/DeleteUsers';
import ViewReports from './Pages/ViewReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/add-trip" element={<AdminAddTrip />} />
        <Route path="/admin/delete-trip" element={<DeleteTrip />} />
        <Route path="/admin/manage-operators" element={<ManageOperators />} />
        <Route path="/admin/delete-users" element={<DeleteUsers />} />
        <Route path="/admin/view-reports" element={<ViewReports />} />
      </Routes>
    </Router>
  );
}

export default App;
