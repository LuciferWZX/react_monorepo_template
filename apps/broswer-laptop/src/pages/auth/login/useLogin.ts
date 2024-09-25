import { useRequest } from "ahooks";
import { APIManager } from "@/managers";

const useLogin = () => {
  const { runAsync: login, loading: loginLoading } = useRequest(
    APIManager.authService.login,
    {
      manual: true,
      onError: (err) => {
        console.log(111, err);
      },
    },
  );
  return {
    login,
    loginLoading,
  };
};
export default useLogin;
