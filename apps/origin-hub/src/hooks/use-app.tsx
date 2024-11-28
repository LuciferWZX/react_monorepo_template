import { useLayoutEffect, useState } from "react";
import { AuthManager } from "@/instances/AuthManager.ts";
import { match } from "ts-pattern";
import { AuthStatusCode } from "@/types";
import { useUserStore } from "@/stores";
import { useNavigate } from "react-router-dom";
import { useShallow } from "zustand/react/shallow";
export const useApp = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const user = useUserStore(useShallow((state) => state.user));
  useLayoutEffect(() => {
    initialAuth()
      .then()
      .catch((reason) => {
        console.error("初始化数据失败:", reason);
        navigate("/login", { replace: true });
      });
  }, []);
  const initialAuth = async () => {
    const response = await AuthManager.verifyAuth();
    match(response)
      .with({ user: null }, (_response) => {
        //登录失败
        if (_response.code === AuthStatusCode.not_log_in) {
          console.log("not_log_in:", _response.message);
        }
        //未登录
        if (_response.code === AuthStatusCode.failed) {
          console.log("failed:", _response.message);
        }
        navigate("/login", { replace: true });
      })
      .otherwise((_response) => {
        //已登录，并且用户信息没有过期
        const user = _response.user;
        useUserStore.setState({ user });
        setLoading(false);
      });
  };
  return { loading, user };
};
