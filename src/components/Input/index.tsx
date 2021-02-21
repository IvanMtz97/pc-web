/* eslint-disable react-hooks/exhaustive-deps */

import * as React from 'react';
import { Input } from 'antd';
import './styles.css';

export interface InputChangeEvent {
  readonly id: string,
  readonly value: string,
  readonly isValid: boolean,
};
export interface InputProps {
  allMayus?: boolean,
  allowEmpty?: boolean,
  asyncValidation?: boolean,
  errorMessage?: string,
  id: string,
  initialValue?: string,
  isUpdate?: boolean,
  label?: string,
  onChange: (args: InputChangeEvent) => void,
  type?: string,
  validation?: (args: string) => boolean,
  value: string | number | undefined,
};

function CustomInput(props: InputProps) {
  const [value, setValue] = React.useState(props.initialValue || '');
  const [isValid, setIsValid] = React.useState(props.allowEmpty);
  const [isPristine, setIsPristine] = React.useState(true);

  function changeValue(v: string) {
    setIsPristine(false);

    if (props.allMayus) {
      setValue(v.toUpperCase());
    } else {
      setValue(v);
    }
  }

  function handleInputChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const v = evt.target.value;

    changeValue(v);
  }

  function getClassName(): string {
    if (!isPristine) {
      const IsValid: boolean = isPristine ? false : Boolean(isValid);

      if (IsValid) {
        return 'is-valid';
      }

      return 'is-invalid';
    }

    return '';
  }

  React.useEffect(() => {
    async function validateField() {
      let v: boolean = false;

      if (value.length && props.validation) {
        if (props.asyncValidation) {
          v = await props.validation(value);
        } else {
          v = props.validation(value);
        }
      }

      if (!props.allowEmpty && !value.length) {
        v = false;
      }

      if (props.allowEmpty && !value.length) {
        v = true;
        setIsPristine(true);
      }

      setIsValid(v);

      if (props.onChange) {
        props.onChange({
          id: props.id,
          isValid: !props.validation ? true : v,
          value,
        });
      }
    }

    validateField();
  }, [value]);

  const className = getClassName();

  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>

      <Input
        className={className}
        data-cy={`${props.id}-input`}
        data-testid={`${props.id}-input`}
        id={`${props.id}-input`}
        onChange={handleInputChange}
        type={props.type || 'text'}
        value={props.value}
      />
    </>
  );
}

export default CustomInput;
