import React from "react";
import styled from "styled-components";

interface ITableProps extends ITableStyleProps {
  children?: React.ReactNode;
  col?: number;
  className?: string;
  onClick?: () => void;
}

interface ITableStyleProps {
  align?: "center" | "left" | "right" | "justify" | "char" | undefined;
}

const Table = ({ children, className }: ITableProps) => {
  return <TableStyle className={className}>{children}</TableStyle>;
};

const Thead = ({ children }: ITableProps) => {
  return <TheadStyle>{children}</TheadStyle>;
};

const Tbody = ({ children }: ITableProps) => {
  return <TbodyStyle>{children}</TbodyStyle>;
};

const Tfoot = ({ children }: ITableProps) => {
  return <TfootStyle>{children}</TfootStyle>;
};

const Tr = ({ children }: ITableProps) => {
  return <TrStyle>{children}</TrStyle>;
};

const Th = ({ children, align }: ITableProps) => {
  return <ThStyle align={align}>{children}</ThStyle>;
};

const Td = ({ children, align, col, className, onClick }: ITableProps) => {
  return (
    <TdStyle
      align={align}
      colSpan={col}
      className={className}
      onClick={onClick}
    >
      {children}
    </TdStyle>
  );
};

Table.Thead = Thead;
Table.Tbody = Tbody;
Table.Tfoot = Tfoot;
Table.Tr = Tr;
Table.Th = Th;
Table.Td = Td;

const TableStyle = styled.table`
  width: 100%;

  border-collapse: collapse;
  border-spacing: 0;
`;
const TheadStyle = styled.thead`
  ${(props) => props.theme.typography.h3};
  color: ${(props) => props.theme.color.gray_600};
  background-color: ${(props) => props.theme.color.gray_400};
`;
const TbodyStyle = styled.tbody``;
const TfootStyle = styled.tfoot``;
const TrStyle = styled.tr``;
const ThStyle = styled.th<ITableStyleProps>`
  padding: 0.8rem 0.5rem;

  ${(props) => props.theme.typography.h3};
  text-align: ${(props) => props.align || "center"};
`;
const TdStyle = styled.td<ITableStyleProps>`
  padding: 0.8rem 0.5rem;

  ${(props) => props.theme.typography.display_1};
  font-weight: 700;
  text-align: ${(props) => props.align || "center"};

  border-bottom: 1px solid ${(props) => props.theme.color.gray_400};

  &.plus {
    color: ${(props) => props.theme.color.red_400};
  }

  &.minus {
    color: ${(props) => props.theme.color.blue_400};
  }
`;

export default Table;
