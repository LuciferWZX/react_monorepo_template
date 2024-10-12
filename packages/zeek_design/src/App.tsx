import ButtonPage from "@/pages/button";
import { ThemeProvider } from "@/components";

const App = () => {
  return (
    <ThemeProvider defaultTheme={"light"}>
      <ButtonPage />
    </ThemeProvider>
  );
};
export default App;
