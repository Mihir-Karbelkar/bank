import React, { useState, useEffect } from 'react';
import './otpinput.scss';
export default function OtpInput({
  numOfBlanks = 4,
  onOtpChange = () => {},
  error = false,
}) {
  const [otp, setOtp] = useState({});

  useEffect(() => {
    const initOtp = {};

    Array.from(Array(numOfBlanks)).forEach((el, index) => {
      initOtp[`otp${index}`] = '';
    });
    setOtp({ ...initOtp });
  }, [numOfBlanks]);

  useEffect(() => {
    let otpValue = '';
    Object.keys(otp).forEach((key) => {
      otpValue += otp[key];
    });
    onOtpChange(otpValue);
  }, [otp]);

  const onChange = (key, event) => {
    setOtp({
      ...otp,
      [key]: event.target.value,
    });
  };
  const inputfocus = (event) => {
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const next = event.target.tabIndex - 1;
      if (next > -1) {
        event.target.form.elements[next].focus();
      }
    } else {
      const next = event.target.tabIndex + 1;
      if (next < numOfBlanks) {
        event.target.form.elements[next].focus();
      }
    }
  };

  return (
    <form
      onSubmit={() => {
        let otpValue = '';
        Object.keys(otp).forEach((key) => {
          otpValue += otp[key];
        });
        onOtpChange(otpValue);
      }}
    >
      {Object.keys(otp).map((element, index) => (
        <input
          name={element}
          type="text"
          autoComplete="off"
          className="otpInput"
          value={otp[element]}
          onChange={(e) => onChange(element, e)}
          tabIndex={`${index}`}
          maxLength="1"
          onKeyUp={(e) => inputfocus(e)}
          className={`otp-input ${error && 'error-input'}`}
        />
      ))}
    </form>
  );
}
