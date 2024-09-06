import { createRoot } from "react-dom/client";

import "@zhixin/shadcn_lib/src/styles/global.css";
import App from "./App.tsx";
createRoot(document.getElementById("root")!).render(<App />);
