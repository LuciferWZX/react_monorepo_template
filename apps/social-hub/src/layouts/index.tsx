import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <div className={"h-screen overflow-hidden"}>
      <Outlet />
    </div>
  );
};
export default RootLayout;
