import { Toaster } from "@/components/ui/sonner";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <Outlet />
      <Toaster
        position="top-center"
        className="flex justify-center"
        toastOptions={{ className: "w-fit" }}
      />
    </div>
  );
};
export default RootLayout;
