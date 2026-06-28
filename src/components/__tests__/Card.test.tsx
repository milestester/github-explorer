import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Card } from "../Card";

describe("Card", () => {
  describe("default variant", () => {
    it("renders children in a div", () => {
      const { container } = render(<Card>content</Card>);
      expect(container.firstChild!.nodeName).toBe("DIV");
      expect(screen.getByText("content")).toBeInTheDocument();
    });

    it("applies additional className", () => {
      const { container } = render(<Card className="w-64">content</Card>);
      expect(container.firstChild).toHaveClass("w-64");
    });
  });

  describe("clickable variant", () => {
    it("renders as a button", () => {
      render(<Card variant="clickable">content</Card>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("calls onClick when clicked", async () => {
      const onClick = jest.fn();
      render(
        <Card variant="clickable" onClick={onClick}>
          content
        </Card>
      );
      await userEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("renders icon slot", () => {
      render(
        <Card variant="clickable" icon={<span>icon</span>}>
          content
        </Card>
      );
      expect(screen.getByText("icon")).toBeInTheDocument();
    });

    it("applies selected styles when selected", () => {
      render(
        <Card variant="clickable" selected>
          content
        </Card>
      );
      expect(screen.getByRole("button")).toHaveClass("bg-brand-surface-low");
    });

    it("applies hover styles when not selected", () => {
      render(<Card variant="clickable">content</Card>);
      expect(screen.getByRole("button")).toHaveClass("hover:bg-brand-surface-low");
    });
  });
});
