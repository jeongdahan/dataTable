import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import styled from "styled-components";

interface INavProps {
  list: { to: string; text: string; active?: boolean }[];
}

const Nav = ({ list }: INavProps) => {
  const { pathname } = useLocation();
  return (
    <NavStyle>
      {list.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={(navData) =>
            (pathname === "/" && item.active) || navData.isActive
              ? "active"
              : ""
          }
        >
          {item.text}
        </NavLink>
      ))}
    </NavStyle>
  );
};

const NavStyle = styled.div`
  padding: 1rem;

  border-top: 1px solid ${(props) => props.theme.color.gray_400};
  border-bottom: 1px solid ${(props) => props.theme.color.gray_400};

  a {
    display: inline-block;

    ${(props) => props.theme.typography.h2};
    font-weight: 400;
    color: ${(props) => props.theme.color.gray_600};

    &.active {
      color: ${(props) => props.theme.color.black_600};
      font-weight: 700;
    }

    &:not(:first-child) {
      margin-left: 1rem;
    }
  }
`;

export default React.memo(Nav);
