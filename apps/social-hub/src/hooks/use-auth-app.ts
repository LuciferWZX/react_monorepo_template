import { useEffect, useState } from "react";
import { APPManager } from "@/instances";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAppStore } from "@/stores";

const useAuthApp = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState<boolean>(true);
  useEffect(() => {
    initial().then();
  }, []);
  const initial = async () => {
    setChecking(true);
    const user = await APPManager.shared.init({
      onFailed: (reason) => {
        console.error("failed:", reason);
        toast.error(reason, {
          position: "top-center",
          richColors: true,
        });
        navigate("/login", { replace: true });
      },
    });
    if (user) {
      useAppStore.setState({ user });
    }
    setChecking(false);
  };
  return {
    checking,
  };
};
export default useAuthApp;
