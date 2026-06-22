import { ActionIcon, Tooltip } from "@mantine/core";
import { TbMoon, TbSun } from "react-icons/tb";
import { useTheme } from "../../providers/ThemeProvider/context";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <Tooltip label={isDark ? "Switch to light mode" : "Switch to dark mode"}>
      <ActionIcon
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      color="babyhub"
      radius="md"
      size="lg"
      variant="light"
      onClick={toggleTheme}
    >
      {isDark ? <TbSun /> : <TbMoon />}
      </ActionIcon>
    </Tooltip>
  );
};

export default ThemeToggle;
