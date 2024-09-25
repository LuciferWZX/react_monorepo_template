import { RouterProvider, To } from "react-router-dom";
import { useRouter } from "@/hooks";
import { ThemeProvider, Toaster } from "@zhixin/shadcn_lib";
import { useEffect } from "react";
let navigate: (
  to: To | null,
  opts?: {
    relative?: "path" | "route";
    replace?: boolean;
  },
) => Promise<void>;
const BaseApp = () => {
  const router = useRouter();
  useEffect(() => {
    navigate = router.navigate;
  }, [router]);
  return <RouterProvider router={router} />;
};
const App = () => {
  return (
    <ThemeProvider storageKey={"vite-project-theme"}>
      <BaseApp />
      <Toaster />
    </ThemeProvider>
  );
};
export { navigate };
export default App;
