import { Outlet } from "react-router-dom";
import { ThemeSelect } from "@/components";

const BaseLayout = () => {
  return (
    <div className={"h-screen w-screen"}>
      <ThemeSelect />
      <Outlet />
    </div>
  );
};
export default BaseLayout;
