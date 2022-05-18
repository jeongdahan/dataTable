import React from "react";
import styled from "styled-components";

interface IInputProps extends IInputStyle {
  type: string;
  value?: string | number | undefined;
  step?: string;
  name?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (e: { target: { value: React.SetStateAction<string> } }) => void;
}

interface IInputStyle {
  bordered?: boolean;
}

const Input = ({
  type = "text",
  value,
  step,
  name,
  defaultValue,
  placeholder = "Insert Text",
  bordered = false,
  onChange,
}: IInputProps) => {
  return (
    <InputStyle bordered={bordered}>
      <input
        type={type}
        value={value}
        step={step}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={onChange}
      />
    </InputStyle>
  );
};

const InputStyle = styled.div<IInputStyle>`
  display: block;

  ${(props) =>
    props.bordered && `border-bottom: 1px solid ${props.theme.color.gray_400}`};

  input {
    width: 100%;
    padding: 0.3125rem;

    ${(props) => props.theme.typography.display_1};

    border: 0;
  }
`;

export default React.memo(Input);
