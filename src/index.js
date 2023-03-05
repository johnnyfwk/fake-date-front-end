import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from "@auth0/auth0-react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="cotraveller.uk.auth0.com"
    clientId="jtxSeDoGEzDJXLCDJmisJXnTxAitJRGs"
    authorizationParams={{
      redirect_uri: "http://localhost:3000/home"
    }}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Auth0Provider>
  
);
