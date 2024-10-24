import { ThemeProvider } from "@/components";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "@/hooks";

function App() {
  const router = useRouter();
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
