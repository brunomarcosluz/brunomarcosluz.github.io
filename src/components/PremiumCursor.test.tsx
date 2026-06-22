import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { PremiumCursor } from "./PremiumCursor";

function mockPointerCapability(matches: boolean) {
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(hover: hover) and (pointer: fine)" ? matches : false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

describe("PremiumCursor", () => {
  afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  it("scales from the base size to link and primary interaction sizes", async () => {
    mockPointerCapability(true);

    render(
      <>
        <PremiumCursor />
        <a href="/case">Case link</a>
        <a data-cursor="primary" href="/contact">
          Main action
        </a>
      </>,
    );

    const cursor = await screen.findByTestId("premium-cursor");

    fireEvent.pointerMove(screen.getByText("Case link"), {
      clientX: 40,
      clientY: 50,
    });
    expect(cursor).toHaveAttribute("data-size", "24");
    expect(cursor).toHaveAttribute("data-visible", "true");

    fireEvent.pointerMove(screen.getByText("Main action"), {
      clientX: 70,
      clientY: 90,
    });
    expect(cursor).toHaveAttribute("data-size", "32");

    fireEvent.pointerMove(document.body, {
      clientX: 120,
      clientY: 140,
    });
    expect(cursor).toHaveAttribute("data-size", "14");
  });

  it("expands to a spotlight size over non-interactive text", async () => {
    mockPointerCapability(true);

    render(
      <>
        <PremiumCursor />
        <h1>Swiss typography</h1>
        <div aria-label="empty surface" />
      </>,
    );

    const cursor = await screen.findByTestId("premium-cursor");

    fireEvent.pointerMove(screen.getByText("Swiss typography"), {
      clientX: 140,
      clientY: 160,
    });
    expect(cursor).toHaveAttribute("data-size", "96");
    expect(cursor).toHaveStyle({
      width: "96px",
      height: "96px",
      marginTop: "-48px",
      marginLeft: "-48px",
    });

    fireEvent.pointerMove(screen.getByLabelText("empty surface"), {
      clientX: 200,
      clientY: 220,
    });
    expect(cursor).toHaveAttribute("data-size", "14");
    expect(cursor).toHaveStyle({
      width: "14px",
      height: "14px",
      marginTop: "-7px",
      marginLeft: "-7px",
    });
  });

  it("does not render on touch or coarse pointer devices", () => {
    mockPointerCapability(false);

    render(<PremiumCursor />);

    expect(screen.queryByTestId("premium-cursor")).not.toBeInTheDocument();
  });
});
