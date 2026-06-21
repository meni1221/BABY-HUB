import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

interface TopNavLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const TopNavLink = ({
  to,
  children,
  className = "",
}: TopNavLinkProps) => {
  return (
    <NavLink to={to} className={`nav-link ${className}`}>
      {children}
    </NavLink>
  );
};

export default TopNavLink;
