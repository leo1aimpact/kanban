import { describe, it, expect, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DndContext } from "@dnd-kit/core";
import { Column } from "./Column";

function renderColumn(props: Parameters<typeof Column>[0]) {
  const result = render(
    <DndContext onDragEnd={() => {}}>
      <Column {...props} />
    </DndContext>
  );
  return { ...result, columnContainer: result.getByTestId("column") };
}

const mockColumn = {
  id: "col-1",
  title: "To Do",
  cards: [
    { id: "card-1", title: "Task 1", details: "Details 1" },
    { id: "card-2", title: "Task 2", details: "" },
  ],
};

describe("Column", () => {
  it("renders column title and cards", () => {
    renderColumn({ column: mockColumn });
    expect(screen.getByText("To Do")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  it("shows add form when Add card clicked", async () => {
    const user = userEvent.setup();
    const { columnContainer } = renderColumn({ column: mockColumn, onAddCard: vi.fn() });
    await user.click(within(columnContainer).getByRole("button", { name: /add card/i }));
    expect(screen.getByPlaceholderText("Card title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Details (optional)")).toBeInTheDocument();
  });

  it("calls onAddCard with title and details on submit", async () => {
    const onAddCard = vi.fn();
    const user = userEvent.setup();
    const { columnContainer } = renderColumn({ column: mockColumn, onAddCard });
    await user.click(within(columnContainer).getByRole("button", { name: /add card/i }));
    await user.type(screen.getByPlaceholderText("Card title"), "New Task");
    await user.type(screen.getByPlaceholderText("Details (optional)"), "New details");
    await user.click(screen.getByRole("button", { name: /^add$/i }));
    expect(onAddCard).toHaveBeenCalledWith("col-1", "New Task", "New details");
  });

  it("calls onRenameColumn when header clicked and title saved", async () => {
    const onRenameColumn = vi.fn();
    const user = userEvent.setup();
    const { columnContainer } = renderColumn({ column: mockColumn, onRenameColumn });
    await user.click(within(columnContainer).getByText("To Do"));
    const input = within(columnContainer).getByDisplayValue("To Do");
    await user.clear(input);
    await user.type(input, "In Progress");
    await user.tab();
    expect(onRenameColumn).toHaveBeenCalledWith("col-1", "In Progress");
  });
});
