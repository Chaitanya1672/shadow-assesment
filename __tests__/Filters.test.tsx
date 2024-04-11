import { render, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from "vitest";
import Filters from '../components/Filters';

vi.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null
    };
  },
  usePathname() {
    return {
      prefetch: () => null
    };
  },
  useSearchParams() {
    return {
      prefetch: () => null
    };
  }
}));

vi.mock("next/router", () => ({
  useRouter: vi.fn(),
}));

describe('Filters component', () => {
  
  const { getByLabelText, getByText, getByRole } = render(<Filters />);
  it('renders the Filters component correctly', () => {
    
    // Check if all input fields are rendered
    expect(getByLabelText('Id')).toBeTruthy();
    expect(getByLabelText('Name')).toBeTruthy();
    expect(getByLabelText('Email')).toBeTruthy();
    expect(getByLabelText('Body')).toBeTruthy();

    // Check if search and reset buttons are rendered
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('<')).toBeTruthy();
  });
  
  it('updates input values correctly when input fields are changed', () => {
    // Change input values
    fireEvent.change(getByRole('textbox', { name: 'Id' }), { target: { value: '1' } });
    fireEvent.change(getByRole('textbox', { name: 'Name' }), { target: { value: 'Chaitanya' } });
    fireEvent.change(getByRole('textbox', { name: 'Email' }), { target: { value: 'chaitanya@example.com' } });
    fireEvent.change(getByRole('textbox', { name: 'Body' }), { target: { value: 'Hi There!' } });

    const inputId = getByLabelText('Id') as HTMLInputElement;
    const inputName = getByLabelText('Name') as HTMLInputElement;
    const inputEmail = getByLabelText('Email') as HTMLInputElement;
    const inputBody = getByLabelText('Body') as HTMLInputElement;

    expect(inputId.value).toBe('1');
    expect(inputName.value).toBe('Chaitanya');
    expect(inputEmail.value).toBe('chaitanya@example.com');
    expect(inputBody.value).toBe('Hi There!');
  });
  
  // it('resets input values correctly when reset button is clicked', () => {

  //   // changes in input values
  //   fireEvent.change(getByRole('textbox', { name: 'Id' }), { target: { value: '1' } });
  //   fireEvent.change(getByRole('textbox', { name: 'Name' }), { target: { value: 'Chaitanya' } });
  //   fireEvent.change(getByRole('textbox', { name: 'Email' }), { target: { value: 'chaitanya@example.com' } });
  //   fireEvent.change(getByRole('textbox', { name: 'Body' }), { target: { value: 'Hi There!' } });

  //   // Simulate click on reset button
  //   fireEvent.click(getByText('<'));

  //   // Check if input values are reset to empty
  //   expect(getByLabelText('Id')).toHaveValue('');
  //   expect(getByLabelText('Name')).toHaveValue('');
  //   expect(getByLabelText('Email')).toHaveValue('');
  //   expect(getByLabelText('Body')).toHaveValue('');
  // });

});
