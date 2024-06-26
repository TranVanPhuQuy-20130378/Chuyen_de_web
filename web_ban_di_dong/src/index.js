import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './javascript/reportWebVitals';
import '@fortawesome/fontawesome-free/css/all.min.css';
import {Provider} from "react-redux";
import {store} from "./redux/Store";
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
