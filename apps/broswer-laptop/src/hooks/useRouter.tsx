import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import HomePage from "@/pages/home";
import WorkspacePage from "@/pages/workspace";
import SettingsPage from "@/pages/settings";

export const useRouter = () => {
  const router: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <BaseLayout />,
          children: [
            { path: "", element: <Navigate to={"workspace"} /> },
            { path: "home", element: <HomePage /> },
            { path: "workspace", element: <WorkspacePage /> },
            { path: "settings", element: <SettingsPage /> },
          ],
        },
      ],
    },
  ];
  return createBrowserRouter(router);
};
