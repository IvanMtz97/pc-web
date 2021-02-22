import * as React from 'react';
import Struct from '../interfaces/struct';
import { SelectOption, SelectChangeEvent } from '../components/Select';
import { InputChangeEvent } from '../components/Input';
import { getColoniesByZipCode } from '../utils/colonies';

type BirthDate = {
  day?: string,
  month?: string,
  year?: string,
};

export function useStruct() {
  const [struct, setStruct] = React.useState<Struct>({});
  const [colonies, setColonies] = React.useState<SelectOption[]>([]);
  const [birthDate, setBirthDate] = React.useState<BirthDate>({});

  function clearStruct() {
    setStruct({});
  }

  function handleZipCode(zipCode: string) {
    if (zipCode.length === 5) {
      const Colonies: SelectOption[] = getColoniesByZipCode(zipCode);
      setColonies(Colonies);
    } else {
      setColonies([]);
      // TODO - Nose porque no se limpia propiedad Colony
      setStruct({
        ...struct,
        Colony: '',
      });
    }
  }

  function handleInputChange(data: InputChangeEvent) {
    if (data.id === 'ZipCode') {
      handleZipCode(data.value);
    }

    setStruct({
      ...struct,
      [data.id]: data.value,
    });
  }

  function handleSelectChange(data: SelectChangeEvent) {
    setStruct({
      ...struct,
      [data.id]: data.label,
    });
  }

  function handleDateChange(data: InputChangeEvent) {
    if (data.id === 'Day') {
      setBirthDate({
        ...birthDate,
        day: data.value.length === 1 ? `0${data.value}` : data.value.substr(data.value.length - 2, 2),
      });
    }
    console.log('DATA', data);
  }

  return {
    birthDate,
    clearStruct,
    colonies,
    handleDateChange,
    handleInputChange,
    handleSelectChange,
    setBirthDate,
    setStruct,
    struct,
  };
}
