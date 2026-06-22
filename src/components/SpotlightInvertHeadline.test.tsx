import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { SpotlightInvertHeadline } from "./SpotlightInvertHeadline";

describe("SpotlightInvertHeadline", () => {
  it("renders one accessible headline and one hidden inverted layer", () => {
    render(
      <SpotlightInvertHeadline radius={140}>
        Transformo sua presença digital em autoridade.
      </SpotlightInvertHeadline>,
    );

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Transformo sua presença digital em autoridade.",
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("spotlight-inverted-layer"),
    ).toHaveAttribute("aria-hidden", "true");
  });
});
