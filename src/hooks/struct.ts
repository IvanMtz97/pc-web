import * as React from 'react';
import Struct from '../interfaces/struct';

export function useStruct() {
  const [struct, setStruct] = React.useState<Struct | null>(null);

  function clearStruct() {
    setStruct(null);
  }

  return {
    struct,
    setStruct,
    clearStruct,
  };
}
