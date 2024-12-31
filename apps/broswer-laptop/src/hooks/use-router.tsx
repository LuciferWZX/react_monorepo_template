import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import AuthLayout from "@/layouts/auth";
import NotFoundPage from "@/pages/404.tsx";
import HomePage from "@/pages/home";
import DataPage from "@/pages/data";
import LoginPage from "@/pages/auth/login";
import CollectionPage from "@/pages/data/collection";
import DataTablePage from "@/pages/data/table";

export function useRouter() {
  const router: RouteObject[] = [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          path: "",
          element: <BaseLayout />,
          children: [
            { path: "", element: <Navigate to={"home"} /> },
            { path: "home", element: <HomePage /> },
            {
              path: "data",
              element: <DataPage />,
              children: [
                { path: "", element: <Navigate to={"collection"} /> },
                { path: "collection", element: <CollectionPage /> },
                { path: "table", element: <DataTablePage /> },
              ],
            },
            { path: "*", element: <NotFoundPage /> },
          ],
        },
        {
          path: "/login",
          element: <AuthLayout />,
          children: [{ path: "", element: <LoginPage /> }],
        },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ];
  return createBrowserRouter(router);
}
