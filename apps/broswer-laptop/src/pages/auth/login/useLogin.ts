import { useRequest } from "ahooks";
import { APIManagerManager } from "@/managers";

const useLogin = () => {
  const { runAsync: login, loading: loginLoading } = useRequest(
    APIManagerManager.authService.login,
    {
      manual: true,
    },
  );
  return {
    login,
    loginLoading,
  };
};
export default useLogin;
