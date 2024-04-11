import '@testing-library/jest-dom/vitest'
import { describe, expect, it, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe('Page component', () => {
  it('renders the Page component correctly', () => {
    render(<Page />);
    // expect(screen.getByTestId('data-grid-component')).toBeDefined();
  });
});
