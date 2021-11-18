import Axios from 'axios';

const baseUrl = 'https://simple-bank-test.herokuapp.com';
export const authenticate = async (username, password) => {
  return Axios({
    method: 'post',
    url: `${baseUrl}/accounts/api/token/`,
    data: {
      username,
      password,
    },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(function (response) {
      return { data: response.data, status: response.status === 200 };
    })
    .catch((err) => {
      return { data: err.response.data, status: err.response.status === 200 };
    });
};

export const otpGenerate = async (tokens) => {
  return Axios({
    method: 'get',
    url: `${baseUrl}/accounts/api/otp/generate/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access}`,
    },
  });
};
export const otpVerify = async (tokens, otp) => {
  return Axios({
    method: 'post',
    url: `${baseUrl}/accounts/api/otp/verify/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access}`,
    },
    data: {
      otp,
    },
  })
    .then((resp) => {
      return { data: resp.data, status: resp.status === 200 };
    })
    .catch((resp) => {
      return { data: resp.response.data, status: resp.response.status === 200 };
    });
};

export const tokenVerify = (tokens) => {
  return Axios({
    method: 'get',
    url: `${baseUrl}/accounts/api/user/`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens?.access}`,
    },
  })
    .then((resp) => {
      return { data: resp.data, status: resp.status === 200 };
    })
    .catch((resp) => {
      return { data: resp.response.data, status: resp.response.status === 200 };
    });
};
