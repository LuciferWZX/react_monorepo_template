import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className={"bg-orange-400"}>
      this is auth layout
      <Outlet />
    </div>
  );
};
export default AuthLayout;
