import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function Home() {
  return (
    <div className="home">
      <h1>Welcome to MERN Stack App</h1>
      <p>Backend API: {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</p>
      <div className="links">
        <Link to="/health">Check API Health</Link>
      </div>
    </div>
  );
}

function HealthCheck() {
  const [healthStatus, setHealthStatus] = React.useState(null);

  const checkHealth = async () => {
    try {
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
      const response = await fetch(`${apiUrl}/health`);
      const data = await response.json();
      setHealthStatus(data);
    } catch (error) {
      setHealthStatus({ success: false, error: error.message });
    }
  };

  React.useEffect(() => {
    checkHealth();
  }, []);

  return (
    <div className="health">
      <h1>API Health Status</h1>
      <button onClick={checkHealth}>Refresh Health</button>
      {healthStatus ? (
        <div className={`status ${healthStatus.success ? 'healthy' : 'error'}`}>
          <pre>{JSON.stringify(healthStatus, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <Link to="/">Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <h2>MERN App</h2>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/health" element={<HealthCheck />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;