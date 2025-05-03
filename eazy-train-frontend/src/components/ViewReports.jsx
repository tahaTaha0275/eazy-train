// src/Pages/ViewReports.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Calendar, Filter, Download, PieChart as PieChartIcon, BarChartIcon, TableIcon, RefreshCcw } from 'lucide-react';
import AdminDashboardHeader from './AdminDashboardHeader';
import AdminDashboardFooter from './AdminDashboardFooter';
import './styles/ViewReports.css';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080';

const ViewReports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  });
  const [viewType, setViewType] = useState('chart');

  // Colors for charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const generateReport = async () => {
    setLoading(true);
    
    try {
      let data;
      
      if (activeTab === 'bookings') {
        // Use the booking-stats endpoint for booking reports
        const response = await axios.get(`${API_BASE_URL}/trips/booking-stats`, {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate
          }
        });
        data = response.data;
      } else if (activeTab === 'routes') {
        // Use the popular-routes endpoint for route popularity
        const response = await axios.get(`${API_BASE_URL}/trips/popular-routes`);
        data = response.data;
      }
      
      setReportData(data);
    } catch (error) {
      console.error(`Error generating ${activeTab} report:`, error);
      alert(`Error generating report: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // Clear report data when changing tabs
  useEffect(() => {
    setReportData(null);
  }, [activeTab]);

  const downloadReport = () => {
    // In a real implementation, this would generate CSV/PDF
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(reportData));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${activeTab}_report.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const renderBookingChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={reportData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  const renderRouteChart = () => {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={reportData}
            cx="50%"
            cy="50%"
            labelLine={true}
            outerRadius={150}
            fill="#8884d8"
            dataKey="value"
            nameKey="name"
            label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
          >
            {reportData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} trips`, 'Quantity']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  const renderTable = () => {
    if (activeTab === 'bookings') {
      return (
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Bookings</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.date}</td>
                  <td>{item.bookings}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else if (activeTab === 'routes') {
      return (
        <div className="report-table-container">
          <table className="report-table">
            <thead>
              <tr>
                <th>Route</th>
                <th>Number of Trips</th>
              </tr>
            </thead>
            <tbody>
              {reportData.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  };

  const renderReportContent = () => {
    if (loading) {
      return <div className="loading-overlay"><RefreshCcw className="loading-icon" /></div>;
    }
    
    if (!reportData) {
      return (
        <div className="no-data-message">
          <p>Select parameters and generate a report to see data</p>
        </div>
      );
    }

    if (viewType === 'table') {
      return renderTable();
    } else {
      if (activeTab === 'bookings') {
        return renderBookingChart();
      } else if (activeTab === 'routes') {
        return renderRouteChart();
      } 
    }
  };

  return (
    <div className="reports-page">
      <AdminDashboardHeader />
      
      <nav className="admin-navigation">
        <button
          className="dashboard-button"
          onClick={() => navigate('/AdminDashboard')}
        >
          Back to Dashboard
        </button>
      </nav>
      
      <main className="reports-content">
        <div className="page-header">
          <img
            src="https://i.ibb.co/1tqBmXcM/image.png"
            alt="EazyTrain Logo"
            className="page-logo"
          />
          <h2 className="page-title">System Reports</h2>
        </div>
        
        <div className="reports-container">
          <div className="report-controls">
            <div className="report-tabs">
              <button 
                className={`tab-button ${activeTab === 'bookings' ? 'active' : ''}`} 
                onClick={() => setActiveTab('bookings')}
              >
                Booking Reports
              </button>
              <button 
                className={`tab-button ${activeTab === 'routes' ? 'active' : ''}`} 
                onClick={() => setActiveTab('routes')}
              >
                Popular Routes
              </button>
            </div>
            
            <div className="report-filters">
              <div className="date-range">
                <div className="date-input-group">
                  <label><Calendar size={16} /> From:</label>
                  <input 
                    type="date" 
                    value={dateRange.startDate} 
                    onChange={(e) => setDateRange({...dateRange, startDate: e.target.value})}
                  />
                </div>
                
                <div className="date-input-group">
                  <label><Calendar size={16} /> To:</label>
                  <input 
                    type="date" 
                    value={dateRange.endDate} 
                    onChange={(e) => setDateRange({...dateRange, endDate: e.target.value})}
                  />
                </div>
              </div>
              
              <div className="action-buttons">
                <button className="generate-button" onClick={generateReport}>
                  <Filter size={16} /> Generate Report
                </button>
                
                {reportData && (
                  <button className="download-button" onClick={downloadReport}>
                    <Download size={16} /> Download
                  </button>
                )}
              </div>
            </div>
            
            {reportData && (
              <div className="view-toggles">
                <button 
                  className={`view-toggle ${viewType === 'chart' ? 'active' : ''}`}
                  onClick={() => setViewType('chart')}
                >
                  {activeTab === 'bookings' ? <BarChartIcon size={16} /> : <PieChartIcon size={16} />} 
                  Chart View
                </button>
                <button 
                  className={`view-toggle ${viewType === 'table' ? 'active' : ''}`}
                  onClick={() => setViewType('table')}
                >
                  <TableIcon size={16} /> Table View
                </button>
              </div>
            )}
          </div>
          
          <div className="report-visualization">
            {renderReportContent()}
          </div>
        </div>
      </main>
      
      <AdminDashboardFooter />
    </div>
  );
};

export default ViewReports;