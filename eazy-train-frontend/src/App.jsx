import { Routes, Route } from 'react-router-dom';
import { app, analytics } from './firebase';  // dont remove ever

import Homepage      from './pages/Homepage';
import Login         from './pages/Login';
import Signup        from './pages/Signup';
import Tickets       from './pages/Tickets';
import Layout        from './pages/Layout';
import Review        from './pages/Review';
import PaymentPortal from './components/PaymentPortal';
import BookedTicket   from './components/BookedTicket';
import ProtectedRoute from './components/ProtectedRoute';
import {RoleProtectedRoute} from './components/RoleProtectedRoute';
import MyBookings from './pages/MyBookings';


/* ── Admin pages ─────────────────────────────── */
import AdminDashboard  from './components/AdminDashboard';
import AdminAddTrip    from './components/AdminAddTrip';
import DeleteTrip      from './components/DeleteTrip';
import DeleteUsers     from './components/DeleteUsers';
import ManageOperators from './components/ManageOperators';
import ViewReports     from './components/ViewReports';

/* ── global styles ───────────────────────────── */
import './components/styles/BillDetails.css';
import './components/styles/BoardingDetails.css';
import './components/styles/DateSelector.css';
import './components/styles/Footer.css';
import './components/styles/Header.css';
import './components/styles/SearchForm.css';
import './components/styles/TrainList.css';
import './components/styles/AdminDashboard.css';

function App() {
  return (
    <div className="container">
      <Routes>
        {/* public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={
          <ProtectedRoute>
            <Homepage />
          </ProtectedRoute>
        } />

        <Route path="/tickets" element={
          <ProtectedRoute>
          <Layout />
        </ProtectedRoute>  
        }>
          <Route index element={<Tickets />} />
          <Route path="review" element={<Review />} />
          <Route path="paymentportal" element={<PaymentPortal />} />
          <Route path="mybookings" element={<MyBookings />} />
          <Route path="BookedTicket" element={<BookedTicket />} />
        </Route>

        {/* admin –NO nesting, each page is its own route */}
        <Route path="/AdminDashboard" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <AdminDashboard />
          </RoleProtectedRoute>} />
        <Route path="/AdminDashboard/add-trip" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <AdminAddTrip />
          </RoleProtectedRoute>} />
        <Route path="/AdminDashboard/delete-trip" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <DeleteTrip />
          </RoleProtectedRoute>} />
        <Route path="/AdminDashboard/delete-users" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <DeleteUsers />
          </RoleProtectedRoute>} />
        <Route path="/AdminDashboard/manage-operators" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <ManageOperators />
          </RoleProtectedRoute>} />
        <Route path="/AdminDashboard/view-reports" element={
          <RoleProtectedRoute requiredRole = {"admin"}>
            <ViewReports />
          </RoleProtectedRoute>} />
      </Routes>
    </div>
  );
}

export default App;
