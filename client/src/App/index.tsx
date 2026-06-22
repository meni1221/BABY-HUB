import "@fontsource/heebo/400.css";
import "@fontsource/heebo/500.css";
import "@fontsource/heebo/600.css";
import "@fontsource/heebo/700.css";
import "@fontsource/heebo/800.css";
import "@mantine/core/styles.css";
import { Box, createTheme, MantineProvider } from "@mantine/core";
import type { ReactNode } from "react";
import Layout from "../layout";
import AuthProvider from "../providers/AuthProvider";
import LanguageProvider from "../providers/LanguageProvider";
import NotificationProvider from "../providers/NotificationProvider";
import ThemeProvider from "../providers/ThemeProvider";
import { useTheme } from "../providers/ThemeProvider/context";
import AppRouter from "../router/AppRouter";

const mantineTheme = createTheme({
  primaryColor: "babyhub",
  defaultRadius: "md",
  fontFamily: "Heebo, Inter, Arial, sans-serif",
  headings: {
    fontFamily: "Heebo, Inter, Arial, sans-serif",
    fontWeight: "800",
  },
  colors: {
    babyhub: [
      "#e9fbf8",
      "#d3f3ed",
      "#a6e4d9",
      "#76d5c5",
      "#4fc8b5",
      "#35bea9",
      "#1f9f8d",
      "#187f73",
      "#135f57",
      "#0b403b",
    ],
  },
});

const MantineThemeBridge = ({ children }: { children: ReactNode }) => {
  const { theme } = useTheme();

  return (
    <MantineProvider forceColorScheme={theme} theme={mantineTheme}>
      {children}
    </MantineProvider>
  );
};

const App = () => {
  return (
    <ThemeProvider>
      <MantineThemeBridge>
        <LanguageProvider>
          <NotificationProvider>
            <AuthProvider>
              <Box
                component="a"
                href="#main-content"
                pos="fixed"
                top={12}
                left={12}
                p="sm"
                bg="babyhub.7"
                c="white"
                style={{
                  borderRadius: "var(--mantine-radius-md)",
                  transform: "translateY(-140%)",
                  transition: "transform 160ms ease",
                  zIndex: 9999,
                }}
                onFocus={(event) => {
                  event.currentTarget.style.transform = "translateY(0)";
                }}
                onBlur={(event) => {
                  event.currentTarget.style.transform = "translateY(-140%)";
                }}
              >
                Skip to content
              </Box>
              <Layout>
                <AppRouter />
              </Layout>
            </AuthProvider>
          </NotificationProvider>
        </LanguageProvider>
      </MantineThemeBridge>
    </ThemeProvider>
  );
};

export default App;
