import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpotlightInvertSurface } from "./SpotlightInvertSurface";

describe("SpotlightInvertSurface", () => {
  it("renders accessible content once and a hidden blend spot", () => {
    render(
      <SpotlightInvertSurface radius={150}>
        <section>
          <h1>Portfolio premium</h1>
          <div className="spotlight-exclude">Case preview</div>
        </section>
      </SpotlightInvertSurface>,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: "Portfolio premium" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("spotlight-surface-spot")).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });
});
