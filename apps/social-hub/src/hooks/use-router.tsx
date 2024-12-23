import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import RootLayout from "@/layouts";
import BaseLayout from "@/layouts/base";
import HomePage from "@/pages/home";
import ChatPage from "@/pages/chat";
import AuthLayout from "@/layouts/auth";
import LoginPage from "@/pages/auth/login";
import FriendPage from "@/pages/friend";
import { ChatContextPage } from "@/pages/chat/ChatContext.tsx";

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
              path: "chat",
              element: <ChatPage />,
              children: [{ path: ":id", element: <ChatContextPage /> }],
            },
            { path: "friend", element: <FriendPage /> },
          ],
        },
        {
          path: "/login",
          element: <AuthLayout />,
          children: [{ path: "", element: <LoginPage /> }],
        },
      ],
    },
  ];
  return createBrowserRouter(router);
}
