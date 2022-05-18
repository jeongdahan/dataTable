import React from "react";
import styled from "styled-components";

interface ISelectProps {
  data: { icon: string; value: string; text: string } | undefined;
  list: { icon: string; value: string; text: string }[];
  onChange?: (e: { target: { value: React.SetStateAction<string> } }) => void;
}

const Select = ({ data, list, onChange }: ISelectProps) => {
  return (
    <SelectStyle value={data?.value} onChange={onChange}>
      {list.map((item) => (
        <option value={item.value} key={item.value}>
          {item.text}
        </option>
      ))}
    </SelectStyle>
  );
};

const SelectStyle = styled.select`
  ${(props) => props.theme.typography.display_2};
  border: 0;
`;

export default React.memo(Select);
