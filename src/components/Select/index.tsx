import * as React from 'react';
import { Select } from 'antd';
import './styles.css';

export interface SelectOption {
  label: string,
  value: string,
}
export interface SelectChangeEvent {
  id: string,
  label: string,
  value: string,
}
export interface SelectProps {
  id: string,
  label?: string,
  onChange: (args: SelectChangeEvent) => void,
  options: SelectOption[],
  value?: string,
}

function CustomSelect(props: SelectProps) {
  function renderOptions(): React.ReactNode[] {
    return props.options.map((option: SelectOption) => (
      <Select.Option
        key={option.value}
        value={option.value}
      >
        {option.label}
      </Select.Option>
    ));
  }

  function handleChange(optionIndex: number) {
    const opt = props.options[optionIndex];

    props.onChange({
      ...opt,
      id: props.id,
    });
  }

  function handleValue(data: string = ''): number | undefined {
    const index = props.options.findIndex((value) => value.label === data);

    if (index >= 0) {
      return index;
    }

    return undefined;
  }

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>

      <Select
        id={props.id}
        data-cy={`${props.id}-select`}
        data-testid={`${props.id}-select`}
        className="custom-select"
        onChange={handleChange}
        placeholder="Selecciona una opcion."
        value={handleValue(props.value)}
      >
        {renderOptions()}
      </Select>
    </>
  );
}

export default CustomSelect;
