import { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm/LoginForm';
import OtpForm from './components/OtpForm/OtpForm';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import './App.scss';
import HomePage from './components/HomePage/HomePage';
import SigninPage from './components/SigninPage/SigninPage';
import { tokenVerify } from './services/authService';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState({});
  useEffect(() => {
    const tokens = JSON.parse(localStorage.getItem('tokens'));
    tokenVerify(tokens).then((resp) => {
      if (resp.status) {
        setUser({ ...resp.data, isAuthenticated: true });
      }
    });
  }, [location]);
  return (
    <div className="App">
      <div className="nav">
        <div className="nav-logo">
          <div
            className={`nav-item ${location.pathname === '/' && 'nav-active'}`}
            onClick={() => navigate('/')}
          >
            Banking
          </div>
        </div>
        <div className="nav-links">
          <div className="nav-item">Budgeting</div>
          <div className="nav-item">Banking</div>

          <div className="nav-item">Blog</div>
          <div className="nav-item">Help</div>
        </div>
        <div className="nav-extras">
          {user?.isAuthenticated ? (
            <>
              <div
                className="nav-item"
                style={{ margin: '10px 0', cursor: 'auto' }}
              >
                <span style={{ fontWeight: '400' }}>Welcome,</span>{' '}
                {user?.username}
              </div>
              <div className="nav-item">
                <button
                  className="primary-button"
                  style={{ width: '100px' }}
                  onClick={() => {
                    setUser({});
                    localStorage.removeItem('tokens');
                    navigate('/');
                  }}
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="nav-item">
                {location.pathname !== '/login' && (
                  <button
                    className="secondary-button"
                    onClick={() => {
                      navigate('/login');
                    }}
                    style={{ width: '100px' }}
                  >
                    Login
                  </button>
                )}
              </div>
              <div className="nav-item">
                {location.pathname !== '/login' && (
                  <button className="primary-button" style={{ width: '100px' }}>
                    Apply Now
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      <Routes>
        <Route path="/login" element={<SigninPage />} />

        <Route path="/" element={<HomePage user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
