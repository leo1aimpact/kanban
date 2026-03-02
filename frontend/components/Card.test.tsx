import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "./Card";

describe("Card", () => {
  it("renders title and details", () => {
    render(
      <Card card={{ id: "1", title: "Test Card", details: "Test details" }} />
    );
    expect(screen.getByText("Test Card")).toBeInTheDocument();
    expect(screen.getByText("Test details")).toBeInTheDocument();
  });

  it("renders without details when empty", () => {
    render(<Card card={{ id: "1", title: "Title Only", details: "" }} />);
    expect(screen.getByText("Title Only")).toBeInTheDocument();
    expect(screen.queryByText("Details (optional)")).not.toBeInTheDocument();
  });

  it("calls onDelete when delete button clicked", async () => {
    const onDelete = vi.fn();
    const user = userEvent.setup();
    render(
      <Card
        card={{ id: "1", title: "Delete Me", details: "" }}
        onDelete={onDelete}
      />
    );
    const deleteBtn = screen.getByRole("button", { name: /delete delete me/i });
    await user.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledWith("1");
  });

  it("does not show delete button when onDelete not provided", () => {
    const { container } = render(
      <Card card={{ id: "1", title: "No Delete", details: "" }} />
    );
    expect(container.querySelector('button[aria-label*="Delete"]')).toBeNull();
  });
});
