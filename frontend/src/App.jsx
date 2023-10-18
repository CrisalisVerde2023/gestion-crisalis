import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Container } from "react-bootstrap";
import UserLoggedProvider from "./contexts/UserLoggedContext";
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
        <UserLoggedProvider>
          <ToastNotification />
          <RouterComponent />
        </UserLoggedProvider>
      </Container>
    </>
  );
}

export default App;
