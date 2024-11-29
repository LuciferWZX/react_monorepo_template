import { createRoot } from "react-dom/client";
import "@/styles/index.css";
import App from "./App.tsx";
import { initDatasource } from "@/datasource.ts";
initDatasource();
createRoot(document.getElementById("root")!).render(<App />);
