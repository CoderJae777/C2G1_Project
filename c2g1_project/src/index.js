import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import { WebSocketProvider } from "./notifications/WebSocketContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <WebSocketProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </WebSocketProvider>
);
