import React, { useEffect, useState } from 'react';
import LoginForm from '../LoginForm/LoginForm';
import OtpForm from '../OtpForm/OtpForm';
import './signin-page.scss';

export default function SigninPage() {
  const [switchTabs, setSwitchTabs] = useState('loginform');
  const [loaderStatus, setLoaderStatus] = useState(false);
  const [tokens, setTokens] = useState({});

  return (
    <div className="signin-page">
      <div className="center-form">
        <div className="form-box">
          {loaderStatus && (
            <div class="loading-box">
              <div class="loader"></div>
            </div>
          )}
          <LoginForm
            validateStatus={(status, data) => {
              if (status) {
                setSwitchTabs('otpform');
                setTokens(data);
                setLoaderStatus(false);
              }
            }}
            active={switchTabs === 'loginform'}
            setLoaderStatus={setLoaderStatus}
          />
          <OtpForm
            validateStatus={(status) => {
              status && setSwitchTabs('loginform');
            }}
            active={switchTabs === 'otpform'}
            setLoaderStatus={setLoaderStatus}
            tokens={tokens}
          />
        </div>
      </div>
    </div>
  );
}
