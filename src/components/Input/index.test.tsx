import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Input from './';
import { isCellphoneValid } from '../../utils/validations';

describe('Input component', () => {
  it('Should validate cellphone correctly', () => {
    const handleChange = jest.fn();
    const value = '';

    const { getByTestId } = render(
      <Input
        allowEmpty
        id="Test"
        onChange={handleChange}
        validation={isCellphoneValid}
        value={value}
      />
    );

    fireEvent.change(getByTestId('Test-input'), { target: { value: '8127335976' } });
    expect(getByTestId('Test-input')).toBeAValidField();

    fireEvent.change(getByTestId('Test-input'), { target: { value: '81273' } });
    expect(getByTestId('Test-input')).toBeAnInvalidField();
  });
});