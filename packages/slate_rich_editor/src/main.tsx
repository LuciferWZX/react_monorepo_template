import { createRoot } from "react-dom/client";
import "./core/styles/index.css";
import App from "./app.tsx";

createRoot(document.getElementById("root")!).render(
  <div>
    <App />
    <App pastedType={"text"} />
  </div>,
);
