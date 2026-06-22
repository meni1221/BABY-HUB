import { Button } from "@mantine/core";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type TopNavLinkTone = "nav" | "action";

interface TopNavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  tone?: TopNavLinkTone;
}

const TopNavLink = ({
  to,
  children,
  className = "",
  onClick,
  tone = "nav",
}: TopNavLinkProps) => {
  if (tone === "action") {
    return (
      <Button
        className={className}
        component={NavLink}
        color="babyhub"
        radius="md"
        size="sm"
        onClick={onClick}
        to={to}
        variant="light"
        styles={{
          root: {
            flexShrink: 0,
            fontWeight: 800,
            paddingInline: 12,
            "&.active": {
              backgroundColor: "var(--mantine-color-babyhub-filled)",
              color: "var(--mantine-color-white)",
            },
          },
        }}
      >
        {children}
      </Button>
    );
  }

  return (
    <NavLink
      className={className}
      onClick={onClick}
      to={to}
      style={({ isActive }) => ({
        alignItems: "center",
        backgroundColor: isActive ? "var(--mantine-color-babyhub-light)" : "transparent",
        borderRadius: "var(--mantine-radius-md)",
        color: isActive
          ? "var(--mantine-color-babyhub-filled)"
          : "var(--mantine-color-text)",
        display: "inline-flex",
        flexShrink: 0,
        fontSize: "var(--mantine-font-size-sm)",
        fontWeight: isActive ? 800 : 700,
        gap: 6,
        lineHeight: 1,
        minHeight: 36,
        paddingInline: 10,
        textDecoration: "none",
        transition: "background-color 120ms ease, color 120ms ease",
      })}
    >
      {children}
    </NavLink>
  );
};

export default TopNavLink;
