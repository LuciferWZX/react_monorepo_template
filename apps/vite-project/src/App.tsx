import { RouterProvider } from "react-router-dom";
import { useRouter } from "@/hooks";
import { ThemeProvider } from "@zhixin/shadcn_lib";

const BaseApp = () => {
  const router = useRouter();
  return <RouterProvider router={router} />;
};
const App = () => {
  return (
    <ThemeProvider storageKey={"vite-project-theme"}>
      <BaseApp />
    </ThemeProvider>
  );
};
export default App;
