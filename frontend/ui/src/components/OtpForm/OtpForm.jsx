import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { otpVerify, otpGenerate } from '../../services/authService';
import OtpInput from '../OtpInput/OtpInput';
import './otpform.scss';
export default function OtpForm({
  validateStatus = () => {},
  active = false,
  tokens,
  setLoaderStatus,
}) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (tokens.access && tokens?.access !== '') {
      setLoaderStatus(true);
      otpGenerate(tokens).then((resp) => {
        setLoaderStatus(false);
      });
    }
  }, [tokens]);
  return (
    <div className={`otp-form slide ${active ? 'active-tab' : 'inactive-tab'}`}>
      <div className="otp-form-title">Authenticate Your Account</div>
      <div className="otp-form-subtext">
        Protecting your account is out top priority. Please confirm your account
        by entering the authentication code sent to <span>{'email'}</span>
      </div>
      <OtpInput onOtpChange={(otp) => setOtp(otp)} error={error !== ''} />
      <div className="otp-footer">
        <div className="info-text">
          It may take a minute to receive your code.
          <div className="error">{error || ''}</div>
          <a
            onClick={(e) => {
              e.preventDefault();
              setLoaderStatus(true);

              otpGenerate(tokens).then((resp) => {
                setLoaderStatus(false);
              });
            }}
          >
            Resend
          </a>
        </div>
        <div>
          <button
            className="primary-button"
            onClick={() => {
              setLoaderStatus(true);

              otpVerify(tokens, otp).then((resp) => {
                setLoaderStatus(false);

                if (resp.status) {
                  setError('');
                  localStorage.setItem('tokens', JSON.stringify(tokens));
                  navigate('/');
                } else {
                  setError(resp.data.message);
                }
              });
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
