import React from "react";
import styeld from "styled-components";
import * as svg from "./svg";

interface IIconProps {
  name: keyof typeof svg;
  className?: string;
  style?: React.CSSProperties;
}

const Icon = ({ name, className, style }: IIconProps) => {
  return (
    <IconStyle>
      {React.createElement(svg[name], {
        className: className,
        style: style,
      })}
    </IconStyle>
  );
};

const IconStyle = styeld.div`
  display: block;

  svg {
    display: block;
  }
`;

export default Icon;
