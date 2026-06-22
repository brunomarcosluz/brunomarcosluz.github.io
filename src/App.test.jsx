import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import App from "./App";

describe("App", () => {
  it("links the hero portrait to WhatsApp with a prefilled budget message", () => {
    render(<App />);

    expect(screen.getByLabelText("Solicitar orçamento pelo WhatsApp")).toHaveAttribute(
      "href",
      "https://wa.me/5519996234059?text=Ol%C3%A1%2C%20vim%20pelo%20site%20gostaria%20de%20solicitar%20um%20or%C3%A7amento",
    );
  });

  it("renders the about section with the updated positioning copy", () => {
    render(<App />);

    expect(
      screen
        .getAllByRole("link", { name: "Sobre" })
        .some((link) => link.getAttribute("href") === "#sobre"),
    ).toBe(true);

    expect(screen.getAllByRole("heading", { level: 2, name: "Sobre mim" }).length).toBeGreaterThan(0);
    expect(screen.queryAllByText("Sobre", { selector: "p" })).toHaveLength(0);

    expect(
      screen.getAllByText(
        /Muitas empresas possuem sites que funcionam apenas como 'cartões de visita' caros e ineficientes\./,
      ).length,
    ).toBeGreaterThan(0);
  });

  it("renders the updated experience marquee text", () => {
    render(<App />);

    expect(document.body.textContent).toContain("+6 de anos de experiência");
  });
});
