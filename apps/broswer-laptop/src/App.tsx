import { RouterProvider } from "react-router-dom";
import { useRouter } from "@/hooks/use-router.tsx";

const App = () => {
  return (
    <div>
      <AppRoute />
    </div>
  );
};
const AppRoute = () => {
  const router = useRouter();
  return <RouterProvider router={router} />;
};
export default App;
