import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import App from "../src/App";

describe("App component", () => {
  it("renders main heading", () => {
    render(<App />);
    const heading = screen.getByRole('heading', { name: /sqlite crud -sovellus/i });
    expect(heading).to.exist;
  });
});