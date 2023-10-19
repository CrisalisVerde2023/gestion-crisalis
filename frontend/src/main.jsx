import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LoadingProvider from "./contexts/LoadingContext.tsx";

ReactDOM.createRoot(document.getElementById("root")).render(

    <LoadingProvider>
      <App />
    </LoadingProvider>
);
