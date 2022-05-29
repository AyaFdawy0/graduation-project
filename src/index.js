import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
// let user=JSON.parse(localStorage.getItem("user-info"))
// const { token} = user;
// axios.defaults.baseURL = 'https://boiling-shelf-43809.herokuapp.com';
// if(localStorage.getItem('user-info'))axios.defaults.headers.common['authorization'] = token;

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
