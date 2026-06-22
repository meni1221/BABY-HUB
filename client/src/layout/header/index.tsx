import {
  ActionIcon,
  Box,
  Container,
  Divider,
  Group,
  Image,
  Paper,
  Tooltip,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";
import ThemeToggle from "../../components/ThemeToggle";
import TopNavLink from "../../components/TopNavLink";
import { useHeaderState } from "../../hooks/useHeaderState";
import {
  TbHome,
  TbInfoCircle,
  TbLanguage,
  TbLayoutDashboard,
  TbLogin2,
  TbLogout,
  TbUserHeart,
  TbUserPlus,
} from "react-icons/tb";

interface MobileTabProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const MobileTab = ({ icon, label, to }: MobileTabProps) => (
  <NavLink
    to={to}
    style={({ isActive }) => ({
      minWidth: 62,
      padding: "8px 10px",
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 3,
      color: isActive
        ? "var(--mantine-color-babyhub-filled)"
        : "var(--mantine-color-dimmed)",
      background: isActive ? "var(--mantine-color-babyhub-light)" : "transparent",
      borderRadius: "var(--mantine-radius-md)",
      fontSize: 12,
      fontWeight: 800,
      lineHeight: 1.1,
      textDecoration: "none",
      whiteSpace: "nowrap",
    })}
  >
    <Box fz={20} lh={1}>
      {icon}
    </Box>
    <span>{label}</span>
  </NavLink>
);

const Header = () => {
  const { dashboardLink, isAuthenticated, logout, texts, toggleLanguage } =
    useHeaderState();
  const isMobile = useMediaQuery("(max-width: 640px)");

  const dashboardIcon =
    dashboardLink?.type === "babysitter" ? <TbLayoutDashboard /> : <TbUserHeart />;

  const navigationLinks = (
    <>
      <TopNavLink to="/">
        <TbHome />
        {texts.navHome}
      </TopNavLink>
      <TopNavLink to="/about">
        <TbInfoCircle />
        {texts.navAbout}
      </TopNavLink>
      {dashboardLink && (
        <TopNavLink to={dashboardLink.to}>
          {dashboardIcon}
          {dashboardLink.label}
        </TopNavLink>
      )}
    </>
  );

  const authLinks = !isAuthenticated ? (
    <>
      <TopNavLink to="/login" tone="action">
        <TbLogin2 />
        {texts.navLogin}
      </TopNavLink>
      <TopNavLink to="/register" tone="action">
        <TbUserPlus />
        {texts.navRegister}
      </TopNavLink>
    </>
  ) : (
    <Tooltip label={texts.navLogout}>
      <ActionIcon
        aria-label={texts.navLogout}
        color="red"
        onClick={() => {
          logout?.();
        }}
        radius="md"
        size="lg"
        variant="light"
      >
        <TbLogout />
      </ActionIcon>
    </Tooltip>
  );

  const utilities = (
    <Group gap={6} wrap="nowrap">
      <ActionIcon
        aria-label="Toggle language"
        color="babyhub"
        onClick={toggleLanguage}
        radius="md"
        size="lg"
        variant="light"
      >
        <TbLanguage />
      </ActionIcon>
      <ThemeToggle />
    </Group>
  );

  return (
    <Paper
      component="header"
      pos="sticky"
      radius={0}
      shadow="xs"
      top={0}
      style={{ zIndex: 100 }}
    >
      <Container maw={1180} px={{ base: "sm", sm: "xl" }} py="sm">
        {isMobile ? (
          <Group justify="space-between" wrap="nowrap">
            <Link
              to="/"
              aria-label="BabyHub home"
              style={{ color: "inherit", display: "inline-flex", textDecoration: "none" }}
            >
              <Group gap="xs" wrap="nowrap">
                <Image src={logo} alt="" h={34} w={34} fit="contain" />
                <Box component="span" fw={800} fz="lg">
                  BabyHub
                </Box>
              </Group>
            </Link>

            <Group gap={6} wrap="nowrap">
              <ThemeToggle />
              <ActionIcon
                aria-label="Toggle language"
                color="babyhub"
                onClick={toggleLanguage}
                radius="md"
                size="lg"
                variant="light"
              >
                <TbLanguage />
              </ActionIcon>
            </Group>
          </Group>
        ) : (
          <Group justify="center">
            <Paper
              radius="xl"
              p={6}
              withBorder
              shadow="none"
              style={{ maxWidth: "100%" }}
            >
              <Group gap={10} wrap="nowrap">
                <Link
                  to="/"
                  aria-label="BabyHub home"
                  style={{ color: "inherit", display: "inline-flex", textDecoration: "none" }}
                >
                  <Group gap="xs" wrap="nowrap">
                    <Image src={logo} alt="" h={36} w={36} fit="contain" />
                    <Box component="span" fw={800} fz="lg">
                      BabyHub
                    </Box>
                  </Group>
                </Link>

                <Group component="nav" gap={2} aria-label="Primary navigation" wrap="nowrap">
                  {navigationLinks}
                </Group>

                <Divider orientation="vertical" />

                <Group gap={6} wrap="nowrap">
                  {authLinks}
                  {utilities}
                </Group>
              </Group>
            </Paper>
          </Group>
        )}
      </Container>

      {isMobile && (
        <Paper
          component="nav"
          aria-label="Mobile navigation"
          pos="fixed"
          bottom={10}
          left="50%"
          radius="xl"
          shadow="lg"
          p={6}
          withBorder
          style={{
            maxWidth: "calc(100vw - 20px)",
            overflowX: "auto",
            transform: "translateX(-50%)",
            zIndex: 110,
          }}
        >
          <Group gap={2} wrap="nowrap">
            <MobileTab icon={<TbHome />} label={texts.navHome} to="/" />
            <MobileTab icon={<TbInfoCircle />} label={texts.navAbout} to="/about" />
            {dashboardLink ? (
              <MobileTab
                icon={dashboardIcon}
                label={dashboardLink.label}
                to={dashboardLink.to}
              />
            ) : (
              <>
                <MobileTab icon={<TbLogin2 />} label={texts.navLogin} to="/login" />
                <MobileTab
                  icon={<TbUserPlus />}
                  label={texts.navRegister}
                  to="/register"
                />
              </>
            )}
          </Group>
        </Paper>
      )}
    </Paper>
  );
};

export default Header;
