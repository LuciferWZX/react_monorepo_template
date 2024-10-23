import { ScrollArea, ThemeProvider } from "@/components";
import ConfigProviderPage from "@/pages/config-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme={"light"}>
      <ScrollArea
        className={"h-screen break-all "}
        classes={{ viewport: "h-full" }}
        hiddenScrollbar={{ horizontal: true }}
      >
        <ConfigProviderPage />
      </ScrollArea>
      {/*<ButtonPage />*/}
    </ThemeProvider>
  );
};
export default App;
