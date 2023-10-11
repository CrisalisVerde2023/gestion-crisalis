//import { useState } from "react";
//import reactLogo from "./assets/react.svg";
//import viteLogo from "/vite.svg";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "react-bootstrap";
import UserLoginProvider from "./contexts/UserLoginContext";
import RouterComponent from "./components/RouterComponent";
import ToastNotification from "./components/ToastNotification";

function App() {
  return (
    <>
      <Container
        fluid
        style={{ width: "100vw", margin: 0, padding: 0 }}
        className="justify-content-center"
      >
        <UserLoginProvider>
          <ToastNotification />
          <RouterComponent />
        </UserLoginProvider>
      </Container>
    </>
  );
}

export default App;
