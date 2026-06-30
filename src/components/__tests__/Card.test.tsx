import { render, screen } from "@testing-library/react";
import { Card } from "../Card";

describe("Card", () => {
  describe("default variant", () => {
    it("renders children in a div, with additional className", () => {
      const { container } = render(<Card className="w-64">content</Card>);
      expect(container.firstChild!.nodeName).toBe("DIV");
      expect(screen.getByText("content")).toBeInTheDocument();
      expect(container.firstChild).toHaveClass("w-64");
    });
  });

  describe("clickable variant", () => {
    it("renders as a button", () => {
      render(<Card variant="clickable">content</Card>);
      expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("renders icon", () => {
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
