import { ThemeProvider } from "@/components";
import { RouterProvider } from "react-router-dom";
import { useRouter } from "@/hooks";
const RootAppWithRoute = () => {
  const router = useRouter();
  return <RouterProvider router={router} />;
};
const RootAppWithProvider = () => {
  return (
    <ThemeProvider defaultTheme={"dark"}>
      <RootAppWithRoute />
    </ThemeProvider>
  );
};
const App = () => {
  return <RootAppWithProvider />;
};
export default App;
