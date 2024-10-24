import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import HomePage from "@/pages/home";
import ChatPage from "@/pages/chat";

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
            { path: "chat", element: <ChatPage /> },
          ],
        },
      ],
    },
  ];
  return createBrowserRouter(router);
}
