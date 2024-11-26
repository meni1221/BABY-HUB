import React from "react";
import { NavLink } from "react-router-dom";

interface TopNavLinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const TopNavLink: React.FC<TopNavLinkProps> = ({
  to,
  children,
  className = "",
}) => {
  return (
    <NavLink to={to} className={`nav-link ${className}`}>
      {children}
    </NavLink>
  );
};

export default TopNavLink;
