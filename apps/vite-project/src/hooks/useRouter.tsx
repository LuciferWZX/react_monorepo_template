import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import HomePage from "@/pages/home";

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
            { path: "", element: <Navigate to={"home"} /> },
            { path: "home", element: <HomePage /> },
          ],
        },
      ],
    },
  ];
  return createBrowserRouter(router);
};
