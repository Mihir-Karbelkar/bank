import React, { useState } from 'react';
import { authenticate } from '../../services/authService';
import './loginform.scss';
export default function LoginForm({
  validateStatus = () => {},
  active = false,
  setLoaderStatus,
}) {
  const [formdata, setFormData] = useState({
    username: '',
    password: '',
  });
  const [error, setErrors] = useState('');
  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const validateLogin = async () => {
    setLoaderStatus(true);

    authenticate(formdata.username, formdata.password).then((resp) => {
      setLoaderStatus(false);

      if (resp.status) validateStatus(true, resp.data);
      else {
        setErrors('Invalid credentials');
      }
    });
  };
  return (
    <div
      className={`login-form slide go-left ${
        active ? 'active-tab' : 'inactive-tab'
      }`}
    >
      <div className="form-element">
        <div className="form-label mt-2">Customer ID</div>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            value={formdata.username}
            name="username"
            onChange={onChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="form-element">
        <div className="form-label mt-2">Password</div>
        <div className="mt-1">
          <input
            type="password"
            name="password"
            value={formdata.password}
            name="password"
            onChange={onChange}
            className="form-input"
          />
        </div>
      </div>
      <div className="form-element">
        <div className="error">{error && `*${error}`}</div>
      </div>

      <div className="mt-2 d-flex justify-content-center">
        <button className="primary-button w-100" onClick={validateLogin}>
          Login
        </button>
      </div>
    </div>
  );
}
