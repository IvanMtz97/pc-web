import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import StructPoll from './';

describe('Struct poll', () => {
  it('Should render leader elector key input when click on IsVinculated checkbox', async () => {
    const { findByTestId } = render(<StructPoll />);

    fireEvent.click(
      await findByTestId('IsVinculated-checkbox')
    );

    expect(await findByTestId('LeaderElectorKey-input')).toBeInTheDocument();
  });
});