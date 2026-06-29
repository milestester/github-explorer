import { render, screen } from "@testing-library/react";
import { SearchContainer } from "../SearchContainer";
import { useSearchNavigation } from "../hooks/useSearchNavigation";

jest.mock("../hooks/useSearchNavigation");
jest.mock("../SearchInput", () => ({ SearchInput: () => null }));
jest.mock("../SearchHeader", () => ({ SearchHeader: () => null }));

const mockUseSearchNavigation = jest.mocked(useSearchNavigation);

const baseNav = {
  handleSearch: jest.fn(),
  isPending: false,
  query: "torvalds",
  isShowingResults: false,
};

describe("SearchContainer", () => {
  it("renders children when isShowingResults is true", () => {
    mockUseSearchNavigation.mockReturnValue({ ...baseNav, isShowingResults: true });
    render(
      <SearchContainer>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.getByText("results")).toBeInTheDocument();
  });

  it("does not render children when isShowingResults is false", () => {
    mockUseSearchNavigation.mockReturnValue(baseNav);
    render(
      <SearchContainer>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.queryByText("results")).not.toBeInTheDocument();
  });

  it("renders the query label and clear button when isShowingResults is true", () => {
    mockUseSearchNavigation.mockReturnValue({ ...baseNav, isShowingResults: true });
    render(
      <SearchContainer>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.getByText(/torvalds/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /clear search results/i })).toBeInTheDocument();
  });
});
