import { ThemeProvider } from "@/components";
import ConfigProviderPage from "@/pages/config-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme={"light"}>
      <ConfigProviderPage />
      {/*<ButtonPage />*/}
    </ThemeProvider>
  );
};
export default App;
