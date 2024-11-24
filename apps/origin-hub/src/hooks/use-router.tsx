import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import HomePage from "@/pages/home";
import NotFoundPage from "@/pages/404.tsx";

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
          ],
        },
        // {
        //   path: "/login",
        //   element: <AuthLayout />,
        //   children: [{ path: "", element: <LoginPage /> }],
        // },
        { path: "*", element: <NotFoundPage /> },
      ],
    },
  ];
  return createBrowserRouter(router);
}
