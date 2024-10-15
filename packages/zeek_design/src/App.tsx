import { ThemeProvider } from "@/components";
import ChainPage from "@/pages/chain";

const App = () => {
  return (
    <ThemeProvider defaultTheme={"light"}>
      <ChainPage />
      {/*<ButtonPage />*/}
    </ThemeProvider>
  );
};
export default App;
