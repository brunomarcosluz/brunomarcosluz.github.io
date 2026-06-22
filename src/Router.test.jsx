import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import Router from "./Router";

describe("Router", () => {
  const originalHash = window.location.hash;

  beforeEach(() => {
    window.location.hash = "";
  });

  afterEach(() => {
    cleanup();
    window.location.hash = originalHash;
  });

  it("shows only four selected cases on home", () => {
    render(<Router />);

    expect(screen.getAllByRole("link", { name: /Abrir case /i })).toHaveLength(4);
  });

  it("opens dedicated cases page from view-all button", () => {
    render(<Router />);

    fireEvent.click(screen.getAllByRole("link", { name: /Ver todos os cases/i })[0]);

    expect(window.location.hash).toBe("#page/cases");
    expect(screen.getByRole("heading", { name: /Todos os cases/i })).toBeInTheDocument();
  });
});
