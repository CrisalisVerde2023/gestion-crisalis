import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import UserLoggedProvider from "./contexts/UserLoggedContext";
import RouterComponent from "./components/RouterComponent";
import ToastNotification from "./components/ToastNotification";

function App() {
  return (
    <>
      <div
        style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}
      >
        <UserLoggedProvider>
          <RouterComponent />
        </UserLoggedProvider>
      </div>
    </>
  );
}

export default App;
