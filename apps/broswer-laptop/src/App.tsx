import { RouterProvider, To } from "react-router-dom";
import { useRouter } from "@/hooks";
import { ThemeProvider, Toaster, useTheme } from "@zhixin/shadcn_lib";
import { useEffect } from "react";
import { ConfigProvider, theme } from "antd";
let navigate: (
  to: To | null,
  opts?: {
    relative?: "path" | "route";
    replace?: boolean;
  },
) => Promise<void>;
const BaseApp = () => {
  const { theme: shadcnTheme } = useTheme();
  const router = useRouter();
  useEffect(() => {
    navigate = router.navigate;
  }, [router]);
  return (
    <ConfigProvider
      theme={{
        algorithm:
          shadcnTheme === "dark" ? theme.darkAlgorithm : theme.darkAlgorithm,
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  );
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
