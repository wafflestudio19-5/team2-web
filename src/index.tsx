import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {NetworkContextProvider} from "./Auth/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {UserContextProvider} from "./UserContext";

ReactDOM.render(
    <NetworkContextProvider>
        <UserContextProvider>
        <React.StrictMode>
            <App/>
            <ToastContainer position="bottom-right" />
        </React.StrictMode>
        </UserContextProvider>
    </NetworkContextProvider>
    ,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
