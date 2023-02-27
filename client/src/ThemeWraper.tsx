import { createTheme, ThemeProvider } from "@mui/material";
import { useState, useMemo, createContext, useContext } from "react";

const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default function ThemeWrapper({
  children,
}: {
  children: JSX.Element[] | JSX.Element;
}) {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {children instanceof Array ? [...children] : children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorMode = () => useContext(ColorModeContext);
