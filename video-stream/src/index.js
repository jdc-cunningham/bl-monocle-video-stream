import React from 'react';
import ReactDOM from 'react-dom';
import './css-reset.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './config';

ReactDOM.render((
    <App
      apiKey={config.API_KEY}
      sessionId={config.SESSION_ID}
      token={config.TOKEN}
    />
), document.getElementById('root'))

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
