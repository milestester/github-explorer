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
  isLoadingResults: false,
  isShowingResults: false,
};

describe("SearchContainer", () => {
  it("renders children when not pending", () => {
    mockUseSearchNavigation.mockReturnValue(baseNav);
    render(
      <SearchContainer hasSearch={true} loadingFallback={<div>loading</div>}>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.getByText("results")).toBeInTheDocument();
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });

  it("renders loadingFallback when isPending and isLoadingResults", () => {
    mockUseSearchNavigation.mockReturnValue({
      ...baseNav,
      isPending: true,
      isLoadingResults: true,
    });
    render(
      <SearchContainer hasSearch={true} loadingFallback={<div>loading</div>}>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.getByText("loading")).toBeInTheDocument();
    expect(screen.queryByText("results")).not.toBeInTheDocument();
  });

  it("renders children when isPending but not isLoadingResults (clearing search)", () => {
    mockUseSearchNavigation.mockReturnValue({
      ...baseNav,
      isPending: true,
      isLoadingResults: false,
    });
    render(
      <SearchContainer hasSearch={false} loadingFallback={<div>loading</div>}>
        <div>results</div>
      </SearchContainer>
    );
    expect(screen.queryByText("loading")).not.toBeInTheDocument();
  });
});
